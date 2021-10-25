const sanityClient = require('@sanity/client')
const imageUrlBuilder = require('@sanity/image-url')
//block not required?

const config = {
  projectId: 'wd1bon7z',
  dataset: 'production',
  apiVersion: '2021-06-07', // use current UTC date - see "specifying API version"!
  token: 'sk5wgUiW1yj5HqoLWUNWucS0DuWdacfPBw83aFoFaAGJFnQL6wDRlSCJ5Xg1Nua5EHPqZ0UjC5N6gMmzKrYyXE9DbEFzJWagHQ20oSYclK9AxsjcmwbkzzzEWpJrvSO10xEevDS0AULCa9lfz8u22NM18R3sh0R84aTWCNq36kq1f5Pt8jra', // or leave blank for unauthenticated usage
  // or leave blank for unauthenticated usage
  useCdn: false // `false` if you want to ensure fresh data
}

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
  console.log(data.employerLogo)
  return data
}
//urlFor is a function used to create a url from sanity.
function urlFor(source) {
  const imageBuilder = imageUrlBuilder(sanityClient(config));
  return imageBuilder.image(source);
}






