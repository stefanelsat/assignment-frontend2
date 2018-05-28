export default function(id) {
  let res = fetch('http://ergast.com/api/f1/drivers/' + id + '/results.json?limit=500')
    .then(data => {
      return data.json()
    })
    .then(data => {
      return data.MRData.RaceTable.Races
    })
  return res
}
