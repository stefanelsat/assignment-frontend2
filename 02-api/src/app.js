import $ from 'jquery'
import Handlebars from 'hbsfy/runtime'
import contact from './partials/contact.hbs'
import index from './partials/index.hbs'
import playersTpl from './partials/players.hbs'
import player from './partials/player.hbs'
import notfound from './partials/404.hbs'
import playerProfiles from './partials/players.json'
import ageHelper from 'ageHelper'

$( document ).ready(() => {
  $('a').click(function(ev) {
    ev.preventDefault()
    let curPath = ev.currentTarget.pathname
    router(curPath)
    history.pushState(curPath, curPath, curPath)
  })

  const players = []
  players.push(playerProfiles)

  const routes = [
    {
      route: '/players/:player',
      fn: function(name) {
        let curPlayer = players[0].players.find(function(el){
          if(el.slug === name) return el
        })
        $('#app').html(player({player: curPlayer}))
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
        $('#app').html(playersTpl({p: players[0].players}))
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
