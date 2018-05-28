import $ from 'jquery'
import driverTpl from './partials/driver.hbs'
import constructors from './fetchConstructors'
import fetchConstructors from './fetchConstructors';
import fetchResults from './fetchResults';

async function resolveConstructors(id) {
  let res = await fetchConstructors(id)
    .then(data => {return data})
  return res
}

async function resolveResults(id) {
  let res = await fetchResults(id)
    .then(data => {return data})
  return res
}

export default function(id) {
  let constructors = resolveConstructors(id)
  let results = resolveResults(id)

  fetch('http://ergast.com/api/f1/drivers/'+ id +'.json')
    .then(data => {
      return data.json()
    })
    .then(data => {
      constructors.then(consts => {
        results.then(res => {
          console.info(res)
          $('#app').html(driverTpl({r: res, c: consts, d: data.MRData.DriverTable.Drivers[0]}))
        })
      })
    })
    .catch(error => console.error(error))
}
