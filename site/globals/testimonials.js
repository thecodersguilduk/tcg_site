const sanityClient = require('@sanity/client')
const imageUrlBuilder = require('@sanity/image-url');
const query = `*[_type == "testimonial"] {
   "avatar": avatar.asset->url, 
    ...
    
  } | order(order asc)`
const config = { 
    projectId: 'wd1bon7z',
    dataset: 'production',
    apiVersion: '2021-06-07', // use current UTC date - see "specifying API version"!
    token: 'sk5wgUiW1yj5HqoLWUNWucS0DuWdacfPBw83aFoFaAGJFnQL6wDRlSCJ5Xg1Nua5EHPqZ0UjC5N6gMmzKrYyXE9DbEFzJWagHQ20oSYclK9AxsjcmwbkzzzEWpJrvSO10xEevDS0AULCa9lfz8u22NM18R3sh0R84aTWCNq36kq1f5Pt8jra', // or leave blank for unauthenticated usage
    useCdn: false // `false` if you want to ensure fresh data
}

module.exports = async function() {
    // Fetches data
    const client = sanityClient(config)
    const data = await client.fetch(query)

    const preppedData = data.map(prepData)
    return preppedData
}

function prepData(data) {
    // Returns back to our main function
    data.avatar = urlFor(data.avatar)
   
    return data
}


function urlFor(source) {
    const imageBuilder = imageUrlBuilder(sanityClient(config));
    return imageBuilder.image(source);
  }

