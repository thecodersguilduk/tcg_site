const blocksToHtml = require('@sanity/block-content-to-html')
const h = blocksToHtml.h
const imageUrlBuilder = require('@sanity/image-url')
const sanityClient = require('@sanity/client')
const config = require('../globals/config');

const query = `*[_type == "course" && !(_id in path("drafts.**"))] {
    ...,
    courseType[]->{courseType},
    "featuredImage": featuredImage.asset->url,
    courseTopics[]->{name},
    duration[]->{name},
    project[]->{code},
    funder[]->{code},
    partner[]->{code},
    coursePortableText

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

  // Converts Portable Text to HTML
  data.body = blocksToHtml({
    blocks: data.coursePortableText,
    serializers: serializers
  })
  data.courseType = data.courseType[0].courseType
  data.courseItemImage = data.featuredImage ? urlFor(data.featuredImage).width(500).url() : 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  data.featuredImage = data.featuredImage ? urlFor(data.featuredImage).width(1200).height(600).url() : 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'

  data.start = data.start || 'TBC'

  if(data.duration){
    data.duration = data.duration.map(item => item.name)
  }

  if(data.location){
    data.location = data.location[0]
  }

  if (data.partner) {
    data.partner = data.partner[0].code
  }
  if (data.funder) {
    data.funder = data.funder[0].code
  }
  if (data.project) {
    data.project = data.project[0].code
  }

  //console.log(data.title, data.duration);
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
      h('pre', { className: node.node.language },
        h('code', node.node.code)
      )
    ),
    imageSection: ({ node: { asset, width } }) => h("img", {
      src: urlFor(asset).width().url(),
    }),
    applyBtn: ({ node: { btnText, btnLink, style } }) => {
      let classes;
      if(style === 'float-right') {
        classes = 'mt-auto block float-right py-2 px-4 bg-blue-200 text-md font-bold font-heading rounded text-white'
      } else {
        classes = 'mt-auto inline-block py-2 px-4 bg-blue-200 text-md font-bold font-heading rounded text-white'
      }
      const rightArrow = '<i class="align-middle ml-2 text-white fas fa-angle-right text-md leading-md" aria-hidden="true"></i>'
      return h("a", {
        href: btnLink ? btnLink : 'https:\/\/skills-bootcamp-ux.tcg.camp',
        className: classes,
        innerHTML: btnText + rightArrow,
        style: 'color: white;'
      })
    },
    break: (node) => {
      if(node.node.style === 'break') return h('hr', { style: 'border-color: #2574a9;'});
    }
  }
}

