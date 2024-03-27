const sanityClient = require('@sanity/client')
const blocksToHtml = require('@sanity/block-content-to-html')
const h = blocksToHtml.h
const y = require('hyperscript')
const blocksToHyperScript = require('@sanity/block-content-to-hyperscript')
const imageUrlBuilder = require('@sanity/image-url')
const config = require('./config');

// query the data from sanity using sanity's own language - GROQ *[_type == 'name-of-schema-file] with the field names we want - title etc.

//spread operator {...} to get all data key values.
//query path can be found in sanity via inspect.
// you can then test the path in sanity via vision
//employerLogo is a object key set in the schema, we include this to access the url path of the image
const query = ` *[ _type == "apprenticeshipVacancies" && isActive && !(_id in path("drafts.**"))]{
  ...,
  location[]->{name},
"employerLogo": employerLogo.asset->url
}`
module.exports = async function () {
  // Fetches data
  const client = sanityClient(config)
  //data fetched using query, which is the path from sanity
  const data = await client.fetch(query)
  // Modifies the data to fit our needs
  const preppedData = data.map(prepPost)
  // returns this to the 11ty data cascade
  return preppedData
}

// prepPost function is passed as an argument into preppedData
function prepPost(data) {
  // data.employerLogo = urlFor(data.employerLogo)

  if (data.jobDescription) {
    data.jobDescription = blocksToHtml({
      blocks: data.jobDescription,
      serializers: serializers

    })
  }

  if (data.companyIntro) {
    data.companyIntro = blocksToHtml({
      blocks: data.companyIntro,
      serializers: serializers

    })
  }

  if (data.trainingProvided) {
    data.trainingProvided = blocksToHtml({
      blocks: data.trainingProvided,
      serializers: serializers

    })
  }

  if (data.benefits) {
    data.benefits = blocksToHtml({
      blocks: data.benefits,
      serializers: serializers

    })
  }

  if (data.support) {
    data.support = blocksToHtml({
      blocks: data.support,
      serializers: serializers

    })
  }

  if (data.desiredSkills) {
    data.desiredSkills = blocksToHtml({
      blocks: data.desiredSkills,
      serializers: serializers

    })
  }

  if (data.jobDuties) {
    data.jobDuties = blocksToHtml({
      blocks: data.jobDuties,
      serializers: serializers

    })
  }

  if (data.personalQualities) {
    data.personalQualities = blocksToHtml({
      blocks: data.personalQualities,
      serializers: serializers

    })
  }

  if (data.qualifications) {
    data.qualifications = blocksToHtml({
      blocks: data.qualifications,
      serializers: serializers

    })
  }

  if (data.excerpt) {
    data.excerpt = blocksToHtml({
      blocks: data.excerpt,
      serializers: serializers

    })
  }

  if (data.prospects) {
    data.prospects = blocksToHtml({
      blocks: data.prospects,
      serializers: serializers

    })
  }

  if (data.thingstoConsider) {
    data.thingstoConsider = blocksToHtml({
      blocks: data.thingstoConsider,
      serializers: serializers

    })
  }

  return data
}


//urlFor is a function used to create a url from sanity.
function urlFor(source) {
  const imageBuilder = imageUrlBuilder(sanityClient(config));
  return imageBuilder.image(source);
}

const serializers = {
  // Creates the code blocks how html and 11ty want them
  types: {
    code: node => (
      h('pre', { className: node.node.language },
        h('code', node.node.code)
      )
    ),
    imageSection: ({ node: { asset, width } }) => h("img", {
      src: urlFor(asset).url(),
    }),
    applyBtn: ({ node: { btnText, btnLink } }) => {
      const rightArrow = '<i class="align-middle ml-2 text-green-100 fas fa-angle-right text-md leading-md" aria-hidden="true"></i>'
      return y("div", { className: 'rounded block w-full bg-green-100 flex justify-between px-6 py-6'},
                y('div', { className: 'flex w-8/12 md:w-4/12 items-center justify-start md:justify-between'},
                  y('img', { src: '../../images/logo/TGC_Square_Logo_White.svg', className: 'h-12 mr-2 md:mr-2'}),
                  y('p', { className: 'text-white font-bold', innerHTML: 'Apply for this role' })),
                y('a', { href: '#', className: 'flex items-center py-0 px-4 md:px-6 text-sm font-bold rounded font-heading bg-white', style: 'color: #86ba90', innerHTML: btnText + rightArrow })
        // href: btnLink ? btnLink : 'https:\/\/skills-bootcamp-ux.tcg.camp',
        // className: classes,
        // innerHTML: btnText + rightArrow,
        // style: 'color: white;'
      )
    },
    break: (node) => {
      if (node.node.style === 'break') return h('hr', { style: 'border-color: #2574a9;' });
    },
    callModal: ({ node: { title } }) => h('a', {
      href: "#",
      'data-modal': "book-a-call",
      className: "bookacall-c-btn inline-block py-2 px-6 font-bold bg-blue-200 text-white rounded font-heading hover:bg-blue-100",
      innerHTML: title,
      style: 'color: white;',
    }),
    newsletter: ({ node: { title } }) => y('section', { className: 'relative md:py-20 pt-14 pb-8 newsletter section-rounded-t z-10 not-on-print' },
      y('div', { className: 'inner' },
        y('div', { className: 'md:flex flex-col' },
          y('div', { className: 'w-full' },
            y('h2', { className: 'text-white md:mb-0', innerHTML: title })
          ),
          y('div', { className: 'w-full' },
            y('form', { action: "https://formspree.io/mvovolen", method: 'POST' },
              y('div', { className: 'rounded md:flex' },
                y('input', { type: "email", className: 'p-4 w-full text-md leading-sm h-14 text-black mb-4 md:mb-0', placeholder: "Enter your email", name: "_replyto" }, { attrs: { 'aria-label': 'Email Address' } }),
                y('button', { className: 'block py-4 px-5 bg-blue-200 whitespace-no-wrap text-white font-heading font-bold text-lg leading-md w-full md:w-auto', type: 'submit', innerHTML: 'Sign me up' }))),
            y('span', { className: 'block text-sm leading-xs text-white mt-2', innerHTML: 'We care about the protection of your data. Read our' },
              y('a', { className: 'font-bold text-white', href: 'https://codersguild.org.uk/pdf/tcg_privacy_policy.pdf', innerHTML: 'privacy policy' })))))),
    form: (({ node: { title, action } }) => y('div', { className: 'overflow-hidden w-full md:mx-auto not-on-print' },
      y('div', { className: 'overflow-hidden w-full md:mx-auto not-on-print' },
        y('div',
          y('h2', { innerHTML: title })
        ),
        y('form', { method: 'POST', action: action, id: 'contact-form', className: 'relative' },
          y('div', { innerHTML: 'Required', className: 'required-pop-up absolute text-red-100 w-full text-xs leading-xs text-right mb-2 hidden' }),
          y('div',
            y('div', { className: 'mb-4' },
              y('label', { for: 'options', className: 'sr-only', innerHTML: 'Options' }),
              y('div', { className: 'relative' },
                y('select', { id: 'options', type: 'select', placeholder: 'What does your enquiry relate to?', maxlength: 50, className: 'form-input-field rounded block w-full py-2 px-3 border-1 placeholder-black required' },
                  y('option', { innerHTML: 'Please select an option' }),
                  y('option', { innerHTML: 'I\'m looking to hire an apprentice' }),
                  y('option', { innerHTML: 'I\'m applying for a course' }),
                  y('option', { innerHTML: 'I\'m currently a learner on a Coders Guild Programme' }),
                  y('option', { innerHTML: 'I\'m from the media' }),
                  y('option', { innerHTML: 'Something else' })
                )
              ),
            ),
            y('div', { className: 'mb-4' },
              y('label', { for: 'full_name', className: 'sr-only', innerHTML: 'Name' }),
              y('div', { className: 'relative' },
                y('input', { id: 'name', type: 'text', className: 'form-input-field rounded block w-full py-2 px-3 border-1 placeholder-black required', placeholder: 'Your Name*', maxlength: 50 }, { attrs: { 'required': '', 'data-regex': '^[a-zA-Z ]+$', 'data-valid': false } }),
                y('span', { className: 'form-error text-xs leading-xs text-red-100' }, { attrs: { 'data-message': 'Only alphabetical values are allowed', 'aria-hidden': 'false', 'role': 'alert' } })
              )
            ),
            y('div', { className: 'mb-4' },
              y('label', { for: 'email', className: 'sr-only', innerHTML: 'Email' }),
              y('div', { className: 'relative' },
                y('input', { id: 'email', type: 'email', className: 'form-input-field rounded block w-full py-2 px-3 border-1 placeholder-black required', placeholder: 'Email*', maxlength: 50 }, { attrs: { 'required': '', 'data-regex': '\\S+@\\S+\\.\\S+', 'data-valid': false } }),
                y('span', { className: 'form-error text-xs leading-xs text-red-100' }, { attrs: { 'data-message': 'Please check if provided email is correct', 'aria-hidden': 'false', 'role': 'alert' } })
              )
            ),
            y('div', { className: 'mb-4' },
              y('label', { for: 'phone', className: 'sr-only', innerHTML: 'Phone' }),
              y('div', { className: 'relative' },
                y('input', { id: 'phone', type: 'text', className: 'form-input-field rounded block w-full py-2 px-3 border-1 placeholder-black required', placeholder: 'Phone', maxlength: 14 }, { attrs: { 'data-regex': '^[+0-9]+$', 'data-valid': false } }),
                y('span', { className: 'form-error text-xs leading-xs text-red-100' }, { attrs: { 'data-message': 'Only numeric values are allowed', 'aria-hidden': 'false', 'role': 'alert' } })
              )
            ),
            y('div', { className: 'mb-4' },
              y('label', { for: 'message', className: 'sr-only', innerHTML: 'Message' }),
              y('div', { className: 'relative' },
                y('textarea', { id: 'message', className: 'form-input-field rounded block w-full py-2 px-3 border-1 placeholder-black required', placeholder: 'Message*', rows: 4 }, { attrs: { 'required': '' } }),
                y('span', { className: 'form-error text-xs leading-xs text-red-100' }, { attrs: { 'aria-hidden': 'false', 'role': 'alert' } })
              )
            )
          ),
          y('div',
            y('button', { className: 'contact-btn rounded font-heading font-bold w-full block py-2 px-6 border border-transparent text-white bg-blue-200 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-100 transition duration-150 ease-in-out', id: 'submit', type: 'submit', disabled: 'disabled', innerHTML: 'Send Enquiry' })
          )
        )
      )
    )
    )

  }
}






