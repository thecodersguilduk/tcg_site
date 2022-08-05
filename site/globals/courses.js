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
    trainers[]->{...},
    coursePortableText,
    "testimonials": *[_type=='testimonial' && references(^._id)]{
      _id,
      client,
      occupation,
      testimonial,
      avatar
   }

} | order(start asc)`

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

  if(data.trainers){
    data.trainers.forEach(trainer => {
      trainer.image = urlFor(trainer.image).width(350).url();
    })
  }

  if(data.excerpt){
    data.excerpt = blocksToHtml({
      blocks: data.excerpt,
      serializers: serializers
    })
  }

  if(data.who_is_this_for){
    data.who_is_this_for = blocksToHtml({
      blocks: data.who_is_this_for,
      serializers: serializers
    })
  }

   if(data.what_you_will_get){
    data.what_you_will_get = blocksToHtml({
      blocks: data.what_you_will_get,
      serializers: serializers
    })
  }

  if(data.course_outline){
    data.course_outline = blocksToHtml({
      blocks: data.course_outline,
      serializers: serializers
    })
  }

  if(data.course_breakdown){
    data.course_breakdown = blocksToHtml({
      blocks: data.course_breakdown,
      serializers: serializers
    })
  }

  if(data.delivery){
    data.delivery = blocksToHtml({
      blocks: data.delivery,
      serializers: serializers
    })
  }

  if(data.pre_requisites){
    data.pre_requisites = blocksToHtml({
      blocks: data.pre_requisites,
      serializers: serializers
    })
  }

  if(data.bonus_takeaways){
    data.bonus_takeaways = blocksToHtml({
      blocks: data.bonus_takeaways,
      serializers: serializers
    })
  }

  // Converts Portable Text to HTML
  if(data.coursePortableText){
    data.body = blocksToHtml({
      blocks: data.coursePortableText,
      serializers: serializers
    })
  }

  if(data.coursePortableText2){
    data.additionalText = blocksToHtml({
      blocks: data.coursePortableText2,
      serializers: serializers
    })
  }

  data.courseType = 'Fix this'

  data.courseItemImage = data.featuredImage ? urlFor(data.featuredImage).width(500).url() : 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'

  data.featuredImage = data.featuredImage ? urlFor(data.featuredImage).width(1200).height(600).url() : 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'

  data.start = data.start || 'TBC'

  if(data.duration){
    data.duration = data.duration.map(item => item.name)
  } else {
    data.duration = 'Ongoing'
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

  if(data.testimonials){
    data.testimonials.forEach(testimonial => {
      testimonial.avatar = urlFor(testimonial.avatar).url();
    })
    //data.testimonials.avatar = urlFor(data.testimonials.avatar).url();
  }

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
    applyBtn: ({ node: { btnText, btnLink, style, isModal, modalName } }) => {
      function modalNameGenerator(str){
        if (!str) return '';

        return str.replace(/\s+/g, '-').toLowerCase()
      }

      let classes;
      if(style === 'float-right') {
        classes = 'mt-auto block float-right py-2 px-4 bg-blue-200 text-md font-bold font-heading rounded text-white'
      } else {
        classes = 'mt-auto inline-block py-2 px-4 bg-blue-200 text-md font-bold font-heading rounded text-white'
      }

      if(isModal) classes += `${modalName}-c-btn`

      const rightArrow = '<i class="align-middle ml-2 text-white fas fa-angle-right text-md leading-md" aria-hidden="true"></i>'
      if(isModal){
      return h("a", {
        href: '',
        className: classes,
        innerHTML: btnText + rightArrow,
        style: 'color: white',
        'data-modal': modalNameGenerator(modalName)
      })
    } else {
      return h("a", {
        href: btnLink ? btnLink : '',
        className: classes,
        innerHTML: btnText + rightArrow,
        style: 'color: white;'
      })
    }
    },
    break: (node) => {
      if(node.node.style === 'break') return h('hr', { style: 'border-color: #2574a9;'});
    },
    youtubeEmbed: (node) => h("iframe", {
      src: node.node.src,
      width: node.node.width || '100%',
      height: node.node.height || '500px'
    })
  }
}

