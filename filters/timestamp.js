/*
  A simple ISO timestamp for Nunjucks
*/
module.exports = function (date) {
  let timestamp = new Date(date) // use passed-in date if available
  let year = timestamp.getFullYear()
  let month = String(timestamp.getMonth() + 1).padStart(2, '0') // ensures 01-12
  let day = String(timestamp.getDate()).padStart(2, '0') // ensures 01-31
  return `${year}-${month}-${day}`
}
