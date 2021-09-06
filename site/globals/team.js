const config = { 
    projectId: 'wd1bon7z',
    dataset: 'production',
    apiVersion: '2021-06-07', // use current UTC date - see "specifying API version"!
    token: 'skTnm7yIyLzamcagFnbDmSfkLSwsS4aIetPXInE0VY2pn0DzbZ2uYzixx3UrVAGrAX8Q16KNxF5cPq5kd', // or leave blank for unauthenticated usage
    useCdn: false // `false` if you want to ensure fresh data
}
const imageUrlBuilder = require('@sanity/image-url');
const sanityClient = require('@sanity/client');
const query = `*[_type == "team" && !(_id in path("drafts.**"))] {
    "image": image.asset->url,
    ...
} | order(order asc)`

module.exports = async function() {
    // Fetches data
    const client = sanityClient(config)
    const data = await client.fetch(query)

    // Modifies the data to fit our needs
    const preppedData = data.map(prepPost)
    console.log(data.image)
    // returns this to the 11ty data cascade
    return preppedData
}

function urlFor(source) {
    const imageBuilder = imageUrlBuilder(sanityClient(config));
    return imageBuilder.image(source);
  }

// This is mostly Sanity specific, but is a good function idea for preparing data
function prepPost(data) {
    // Returns back to our main function
    data.image = urlFor(data.image)
    data.github = data.github ? 'https://www.github.com/' + data.github : ''
    data.twitter = data.twitter ? 'https://www.twitter.com/' + data.twitter : ''
    data.linkedin = data.linkedin ? 'https://www.linkedin.com/in/' + data.linkedin : ''

    // console.log(data);

    return data
}