const sanityClient = require('@sanity/client')
//block not required?
//image url not required

const config = {
  projectId: 'wd1bon7z',
  dataset: 'production',
  apiVersion: '2021-06-07', // use current UTC date - see "specifying API version"!
  token: 'skTnm7yIyLzamcagFnbDmSfkLSwsS4aIetPXInE0VY2pn0DzbZ2uYzixx3UrVAGrAX8Q16KNxF5cPq5kd', // or leave blank for unauthenticated usage
  useCdn: false // `false` if you want to ensure fresh data
}

// query the data from sanity using sanity's own language - GROQ *[_type == 'name-of-schema-file] with the field names we want - title etc. 

//spead operator {...} to get all data key values.
//query path can be found in sanity via inspect. 
// you can then test the path in sanity via vision
const query = ` *[ _type == "ApprenticeJobAds"]{
    ...
}`
module.exports = async function () {
  // Fetches data
  const client = sanityClient(config)
  //data fetched using query, which is the path from sanity
  const data = await client.fetch(query)
  // console.log(data)
  // Modifies the data to fit our needs
  const preppedData = data.map(prepPost)
  console.log(preppedData)

  // returns this to the 11ty data cascade
  return preppedData
}

// prepPost function is passed as an argument into preppedData 
function prepPost(data) {

  return data
}







