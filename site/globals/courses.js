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
const query = `*[_type == "course"] {
    ...,
    courseType[]->{courseType},
    "featuredImage": featuredImage.asset->url,

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

    // Converts Portable Text to HTML
    data.body = blocksToHtml({
        blocks: data.coursePortableText,
        serializers: serializers
    })
    data.courseType = data.courseType[0].courseType
    data.featuredImage = data.featuredImage? data.featuredImage : 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    console.log(data.featuredImage)
 
    return data
}

function urlFor(source) {
    const imageBuilder = imageUrlBuilder(sanityClient(config));
    return imageBuilder.image(source);
  }

// This is a way of converting our custom blocks from Portable Text to html
const serializers = {
    // Creates the code blocks how html and 11ty want them
    types: {
        code: node => (
            h('pre', {className: node.node.language},
                h('code', node.node.code)
            )
        ),
    }
}