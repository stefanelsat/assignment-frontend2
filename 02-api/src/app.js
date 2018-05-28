import $ from 'jquery'
import Handlebars from 'hbsfy/runtime'
import 'babel-polyfill'
import index from './partials/index.hbs'
import driversTpl from './partials/drivers.hbs'
import driver from './partials/driver.hbs'
import notfound from './partials/404.hbs'
import renderDrivers from './renderDrivers'
import renderConstructors from './renderConstructors'
import renderConstructor from './renderConstructor'
import renderDriver from './renderDriver'
import fetchConstructors from './fetchConstructors'

$( document ).ready(() => {
  $('a').click(function(ev) {
    ev.preventDefault()
    let curPath = ev.currentTarget.pathname
    router(curPath)
    history.pushState(curPath, curPath, curPath)
  })

const driverJSON = []

  const routes = [
    {
      route: '/driver/:driver',
      fn: function(name) {
        renderDriver(name)
      }
    },
    {
      route: '/drivers',
      fn: function() {
        renderDrivers()
      }
    },
    {
      route: '/constructors',
      fn: function() {
        renderConstructors()
      }
    },
    {
      route: '/constructor/:constructor',
      fn: function(name) {
        renderConstructor(name)
      }
    },
    {
      route: '/',
      fn: function() {
        $('#app').html(index)
      }
    },
    {
      route: '*',
      fn: function() {
        $('#app').html(notfound)
      }
    }
  ]

  const dynamicRoutes = routes.map(createRegExRoute)

  function createRegExRoute(route) {
    const regEx = route
      .route.split('/').map((pt) => {
        if(pt[0] === ':') {
          return '([a-z]+)'
        }
        if(pt === '*') {
          return '.*'
        }
        return pt
      })
      .join('/')
    return {
      regEx,
      route
    }
  }

  function router(path) {
    for(let route of dynamicRoutes) {
      const res = path.match(route.regEx)
      if(res) {
        const par = res[1]
        route.route.fn(par)
        return
      }
    }
  }

  let currentPath = document.location.pathname
  router(currentPath)
})
