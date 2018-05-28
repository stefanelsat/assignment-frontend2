import $ from 'jquery'
import driversTpl from './partials/drivers.hbs'

export default function() {
  fetch('http://ergast.com/api/f1/drivers.json?limit=500')
    .then(data => {
      return data.json()
    })
    .then(data => {
      $('#app').html(driversTpl({d: data.MRData.DriverTable.Drivers}))
    })
    .catch(error => console.error(error))
}
