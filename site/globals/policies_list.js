const sanityClient = require('@sanity/client')
const config = require('../globals/config');

const query = `*[_type == "policies" && !(_id in path("drafts.**"))] {
    ...

}`

module.exports = async function () {
  // Fetches data
  const client = sanityClient(config)
  const data = await client.fetch(query)

  // Modifies the data to fit our needs
  const preppedData = data.map(prepPost)

  // returns this to the 11ty data cascade
  return preppedData
}


// This is mostly Sanity specific, but is a good function idea for preparing data
function prepPost(data) {

  return data
}

