const blocksToHtml = require('@sanity/block-content-to-html')
const h = blocksToHtml.h
const imageUrlBuilder = require('@sanity/image-url')
const sanityClient = require('@sanity/client')

const config = { 
    projectId: 'wd1bon7z',
    dataset: 'production',
    apiVersion: '2021-06-07', // use current UTC date - see "specifying API version"!
    token: 'skTnm7yIyLzamcagFnbDmSfkLSwsS4aIetPXInE0VY2pn0DzbZ2uYzixx3UrVAGrAX8Q16KNxF5cPq5kd', // or leave blank for unauthenticated usage
    useCdn: false // `false` if you want to ensure fresh data
}
const query = `*[_type == "courseTypes"] {
    'courseTypes': courseTypes

}`

module.exports = async function() {
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

    // Converts Portable Text to markdown
    //     data.body = blocksToHtml({
    //     blocks: data.coursePortableText,
    //     serializers: serializers
    // })
    
    console.log(data);
    return data
}

function urlFor(source) {
    const imageBuilder = imageUrlBuilder(sanityClient(config));
    return imageBuilder.image(source);
  }

// This is a way of converting our custom blocks from Portable Text to html
const serializers = {
    // Creates the code blocks how html and 11ty want them

}