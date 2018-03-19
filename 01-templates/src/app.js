import $ from 'jquery'
const handlebars = require('handlebars')
import contact from './partials/contact.hbs'
import index from './partials/index.hbs'
import players from './partials/players.hbs'
import player from './partials/player.hbs'
import notfound from './partials/404.hbs'

$( document ).ready(() => {
  $('a').click(function(ev) {
    ev.preventDefault()
    let curPath = ev.currentTarget.pathname
    router(curPath)
    history.pushState(curPath, curPath, curPath)
  })

  const routes = [
    {
      route: '/players/:player',
      fn: function(name) {
        console.info('player: ' + name)

        // TODO: dynamische Übergabe des Playernamens an das Template
        $('#app').html(player(name))
      }
    },
    {
      route: '/contact',
      fn: function() {
        $('#app').html(contact)
      }
    },
    {
      route: '/players',
      fn: function() {
        $('#app').html(players)
      }
    },
    /*{
      // TODO: kaputt - seite zeigt immer / route an
      route: '/',
      fn: function() {
        console.info('ROOT!')
      }
    },*/
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
        console.info(res)
        const par = res[1]
        route.route.fn(par)
        return
      }
    }
  }

  let currentPath = document.location.pathname
  router(currentPath)
})
