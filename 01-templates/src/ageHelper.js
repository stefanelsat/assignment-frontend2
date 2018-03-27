export default function() {
  Handlebars.registerHelper("age", function(birthdate) {
    let today = new Date()
    let birthday = new Date(birthdate)
    let inYears = today.getFullYear() - birthday.getFullYear()
    return inYears.toString()
  })
}
