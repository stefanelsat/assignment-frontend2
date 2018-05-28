import $ from 'jquery'
import constsTpl from './partials/consts.hbs'


export default function() {
  fetch('http://ergast.com/api/f1/constructors.json?limit=500')
    .then(data => {
      return data.json()
    })
    .then(data => {
      $('#app').html(constsTpl({c: data.MRData.ConstructorTable.Constructors}))
    })
    .catch(error => console.error(error))
}
