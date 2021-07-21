const blocksToMd = require('@sanity/block-content-to-markdown')
const blocksToHtml = require('@sanity/block-content-to-html')
const h = blocksToHtml.h
const imageUrlBuilder = require('@sanity/image-url');
const { getImageUrl } = blocksToMd;
const config = { 
    projectId: 'wd1bon7z',
    dataset: 'production',
    apiVersion: '2021-06-07', // use current UTC date - see "specifying API version"!
    token: 'skTnm7yIyLzamcagFnbDmSfkLSwsS4aIetPXInE0VY2pn0DzbZ2uYzixx3UrVAGrAX8Q16KNxF5cPq5kd', // or leave blank for unauthenticated usage
    useCdn: false // `false` if you want to ensure fresh data
}
const sanityClient = require('@sanity/client');
const toMarkdown = require('@sanity/block-content-to-markdown');
const query = `*[_type == "blog" && !(_id in path("drafts.**"))] {
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
    data.body = blocksToMd(data.blogPortableText,{serializers})
    // Adjusts where our date lives (for convenience)
    data.date = data.publishedAt.split('T')[0];
    // Returns back to our main function

    return data
}

function urlFor(source) {
    const imageBuilder = imageUrlBuilder(sanityClient(config));
    return imageBuilder.image(source);
  }

// This is a way of converting our custom blocks from Portable Text to Markdown
const serializers = {
    // Creates the code blocks how markdown and 11ty want them
    types: {
        // undefined: ({ node }) => `<br>`,
        imageSection: ({ node: { asset, width } }) =>  '![](' + urlFor(asset).width(width).fit('max').url() + ')',
        applyBtn: ({ node: { btnText, btnLink } }) => {
            const rightArrow = '<i class="align-middle ml-2 text-white fas fa-angle-right text-md leading-md" aria-hidden="true"></i>'
            return h("a", {
                href: btnLink ? btnLink : 'https:\/\/skills-bootcamp-ux.tcg.camp',
                class: "mt-auto inline-block py-2 px-4 bg-blue-200 text-white text-md font-bold font-heading rounded text-white",
                style: "color: white",
                innerText: btnText + rightArrow ? btnText : 'Apply Now' + rightArrow
            })
        }
        // code: props => '```' + props.node.language + '\n' + props.node.code + '\n```'
    }
}