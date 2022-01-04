const sanityClient = require('@sanity/client')
const imageUrlBuilder = require('@sanity/image-url')
const config = require('../globals/config');

// query the data from sanity using sanity's own language - GROQ *[_type == 'name-of-schema-file] with the field names we want - title etc. 

//spread operator {...} to get all data key values.
//query path can be found in sanity via inspect. 
// you can then test the path in sanity via vision
//employerLogo is a object key set in the schema, we include this to access the url path of the image
const query = ` *[ _type == "ApprenticeJobAds"]{
  ...,
"employerLogo": employerLogo.asset->url
}`
module.exports = async function () {
  // Fetches data
  const client = sanityClient(config)
  //data fetched using query, which is the path from sanity
  const data = await client.fetch(query)
  // console.log(data)
  // Modifies the data to fit our needs
  const preppedData = data.map(prepPost)



  // returns this to the 11ty data cascade
  return preppedData
}

// prepPost function is passed as an argument into preppedData 
function prepPost(data) {
  // data.employerLogo = urlFor(data.employerLogo)

  return data
}
//urlFor is a function used to create a url from sanity.
function urlFor(source) {
  const imageBuilder = imageUrlBuilder(sanityClient(config));
  return imageBuilder.image(source);
}






