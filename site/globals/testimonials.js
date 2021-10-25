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




// [
//     {
//       "author" : "Mark Hope",
//       "img_url": "../images/testimonials/mark.jpg",
//       "occupation": "Digital Director at Access",
//       "text": "The scheme is one of the very best. The assessment process, pre-start bootcamp and knowledgeable trainers mean we get engaged, motivated apprentices contributing to our business from day one."
//     },
//     {
//       "author" : "Jon Stutfield",
//       "img_url": "../images/testimonials/jon.jpg",
//       "occupation": "CEO at Bliss",
//       "text": "Taking on an apprentice has been a fantastic experience. We have an excellent new team member, and have been really well supported all the way."
//     },
//     {
//       "author" : "Ben Colchester",
//       "img_url": "../images/testimonials/ben.jpg",
//       "occupation": "Managing Director at Bonsai Tiger",
//       "text": "Made the process of taking on an apprentice a joy. We were very impressed by the pre-apprentice training they provided and the calibre of the candidates themselves. We would not hesitate to recommend them."
//     }
  
//   ]