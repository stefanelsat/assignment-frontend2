import $ from 'jquery'
import constTpl from './partials/const.hbs'

export default function(id) {
  let res = fetch('http://ergast.com/api/f1/constructors/' + id + '/drivers.json')
  .then(data => {
    return data.json()
  })
  .then(data => {
    $('#app').html(constTpl({constr: data.MRData.DriverTable}))
  })
}
