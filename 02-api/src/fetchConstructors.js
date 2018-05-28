export default function(id) {
  let res = fetch('http://ergast.com/api/f1/drivers/' + id + '/constructors.json')
    .then(data => {
      return data.json()
    })
    .then(data => {
      return data.MRData.ConstructorTable.Constructors
    })
  return res
}
