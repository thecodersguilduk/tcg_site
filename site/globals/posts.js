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
        data.body = blocksToHtml({
        blocks: data.blogPortableText,
        serializers: serializers
    })
    // Adjusts where our date lives (for convenience)
    data.date = data.publishedAt.split('T')[0];
    // Returns back to our main function
    // console.log(data.body);
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
        imageSection: ({ node: { asset, width } }) => h("img", {
            src: urlFor(asset),
            }),
        applyBtn: ({ node: { btnText, btnLink } }) => {
            const rightArrow = '<i class="align-middle ml-2 text-white fas fa-angle-right text-md leading-md" aria-hidden="true"></i>'
            return h("a", {
                href: btnLink ? btnLink : 'https:\/\/skills-bootcamp-ux.tcg.camp',
                className: 'mt-auto inline-block py-2 px-4 bg-blue-200 text-md font-bold font-heading rounded text-white',
                innerHTML: btnText + rightArrow,
                style: 'color: white;'
                })
            },
        callModal: ({ node: { title, modalType }}) => h('a', {
           href: "",
           className:"bookacall-c-btn inline-block py-2 px-6 font-bold bg-blue-200 text-white rounded font-heading hover:bg-blue-100",
           innerHTML: title,
           style: 'color: white;',
           marks: {
            accent: (node) => h('span', { 'data-modal': 'book-a-call' }),
          }
        })
        // code: props => '```' + props.node.language + '\n' + props.node.code + '\n```'
    }
}