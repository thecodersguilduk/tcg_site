const sanityClient = require('@sanity/client')
const imageUrlBuilder = require('@sanity/image-url');
const query = `*[_type == "testimonial"] {
   "avatar": avatar.asset->url, 
    ...
    
  } | order(order asc)`
const config = require('../globals/config');

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

