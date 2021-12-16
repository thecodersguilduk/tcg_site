const sanityClient = require('@sanity/client')

const config = {
  projectId: 'wd1bon7z',
  dataset: 'production',
  apiVersion: '2021-06-07', // use current UTC date - see "specifying API version"!
  token: 'sk5wgUiW1yj5HqoLWUNWucS0DuWdacfPBw83aFoFaAGJFnQL6wDRlSCJ5Xg1Nua5EHPqZ0UjC5N6gMmzKrYyXE9DbEFzJWagHQ20oSYclK9AxsjcmwbkzzzEWpJrvSO10xEevDS0AULCa9lfz8u22NM18R3sh0R84aTWCNq36kq1f5Pt8jra', // or leave blank for unauthenticated usage
  useCdn: false // `false` if you want to ensure fresh data

}

const query = `*[_type == "course" && !(_id in path("drafts.**"))] {
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
    
    console.log(data.location);
    return data
  }