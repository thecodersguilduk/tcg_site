const blocksToMd = require('@sanity/block-content-to-markdown')
const sanityClient = require('@sanity/client')
const query = `*[_type == "blog"] {
    title,
    slug,
    publishedAt,
    "mainImage": mainImage.asset->url,
    excerpt,
    time,
    authors[]->{name},
    "avatar": authors[]->image.asset->url,
    categories[]->{name},
    blogPortableText,
} | order(_createdAt desc)`

module.exports = async function() {
    // Fetches data
    const client = sanityClient({
        projectId: 'wd1bon7z',
        dataset: 'production',
        apiVersion: '2021-06-07', // use current UTC date - see "specifying API version"!
        token: 'skTnm7yIyLzamcagFnbDmSfkLSwsS4aIetPXInE0VY2pn0DzbZ2uYzixx3UrVAGrAX8Q16KNxF5cPq5kd', // or leave blank for unauthenticated usage
        useCdn: false, // `false` if you want to ensure fresh data
    })
    const data = await client.fetch(query)

    // Modifies the data to fit our needs
    const preppedData = data.map(prepPost)

    // returns this to the 11ty data cascade
    return preppedData
}


// This is mostly Sanity specific, but is a good function idea for preparing data
function prepPost(data) {
    // Converts Portable Text to markdown
    data.body = blocksToMd(data.body,{serializers})
    // Adjusts where our date lives (for convenience)
    data.date = data.publishDate
    // Returns back to our main function
    console.log(data)
    return data
}

// This is a way of converting our custom blocks from Portable Text to Markdown
const serializers = {
    // Creates the code blocks how markdown and 11ty want them
    types: {
        code: props => '```' + props.node.language + '\n' + props.node.code + '\n```'
    }
}