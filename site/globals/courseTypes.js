const sanityClient = require('@sanity/client')
const config = require('../globals/config');
const blocksToHtml = require('@sanity/block-content-to-html')
const h = blocksToHtml.h

const query = `*[_type == "courseTypes"] {
    ...
} | order(order asc)`

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
    data.tagline = blocksToHtml({
        blocks: data.tagline,
        serializers: serializers
      })

    return data
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
      youtubeEmbed: (node) => h("iframe", {
        src: node.node.src,
        width: node.node.width || '100%',
        height: node.node.height || '500px'
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
      },
      callModal: ({ node: { title } }) => h('a', {
        href: "#",
        'data-modal': "book-a-call-calendly",
        className: "bookacall-c-btn inline-block py-2 px-6 font-bold bg-blue-200 text-white rounded font-heading hover:bg-blue-100",
        innerHTML: title,
        style: 'color: white;',
      }),
      newsletter: ({ node: { title }}) => y('section', {className: 'relative md:py-20 pt-14 pb-8 newsletter section-rounded-t z-10 not-on-print'},
       y('div', { className:'inner' },
        y('div', { className: 'md:flex flex-col'},
         y('div', { className: 'w-full'},
          y('h2', { className: 'text-white md:mb-0', innerHTML: title})
          ),
           y('div', { className: 'w-full'},
            y('form', {action: "https://formspree.io/mvovolen", method:'POST'},
             y('div', { className: 'rounded md:flex'},
              y('input', { type: "email", className: 'p-4 w-full text-md leading-sm h-14 text-black mb-4 md:mb-0', placeholder: "Enter your email", name: "_replyto"}, { attrs: {'aria-label': 'Email Address'} }),
               y('button', { className: 'block py-4 px-5 bg-blue-200 whitespace-no-wrap text-white font-heading font-bold text-lg leading-md w-full md:w-auto', type: 'submit', innerHTML: 'Sign me up' }))),
                y('span', { className: 'block text-sm leading-xs text-white mt-2', innerHTML: 'We care about the protection of your data. Read our'},
                 y('a', { className: 'font-bold text-white', href: 'https://codersguild.org.uk/pdf/tcg_privacy_policy.pdf', innerHTML: 'privacy policy' })))))),
      form: (({node: { title, action }}) => y('div', { className: 'overflow-hidden w-full md:mx-auto not-on-print'},
                y('div', { className: 'overflow-hidden w-full md:mx-auto not-on-print'},
                  y('div',
                    y('h2', { innerHTML: title })
                    ),
                    y('form', { method: 'POST', action: action, id: 'contact-form', className: 'relative' },
                      y('div', { innerHTML: 'Required', className: 'required-pop-up absolute text-red-100 w-full text-xs leading-xs text-right mb-2 hidden' }),
                      y('div',
                        y('div', { className: 'mb-4' },
                          y('label', { for: 'options', className: 'sr-only', innerHTML: 'Options' }),
                          y('div', { className: 'relative'},
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
                              y('input', { id: 'name', type: 'text', className: 'form-input-field rounded block w-full py-2 px-3 border-1 placeholder-black required', placeholder: 'Your Name*', maxlength: 50 }, { attrs: { 'required': '', 'data-regex': '^[a-zA-Z ]+$', 'data-valid': false }}),
                              y('span', { className: 'form-error text-xs leading-xs text-red-100'}, { attrs: { 'data-message': 'Only alphabetical values are allowed', 'aria-hidden': 'false', 'role': 'alert' }})
                            )
                          ),
                          y('div', { className: 'mb-4' },
                            y('label', { for: 'email', className: 'sr-only', innerHTML: 'Email'}),
                            y('div', { className: 'relative' },
                              y('input', { id: 'email', type: 'email', className: 'form-input-field rounded block w-full py-2 px-3 border-1 placeholder-black required', placeholder: 'Email*', maxlength: 50 }, { attrs: { 'required': '', 'data-regex': '\\S+@\\S+\\.\\S+', 'data-valid': false }}),
                              y('span', { className: 'form-error text-xs leading-xs text-red-100'}, { attrs: { 'data-message': 'Please check if provided email is correct', 'aria-hidden': 'false', 'role': 'alert' }})
                            )
                          ),
                          y('div', { className: 'mb-4' },
                            y('label', { for: 'phone', className: 'sr-only', innerHTML: 'Phone' }),
                            y('div', { className: 'relative' },
                              y('input', { id: 'phone', type: 'text', className: 'form-input-field rounded block w-full py-2 px-3 border-1 placeholder-black required', placeholder: 'Phone', maxlength: 14 }, { attrs: { 'data-regex': '^[+0-9]+$', 'data-valid': false }}),
                              y('span', { className: 'form-error text-xs leading-xs text-red-100'}, { attrs: { 'data-message': 'Only numeric values are allowed', 'aria-hidden': 'false', 'role': 'alert' }})
                            )
                          ),
                          y('div', { className: 'mb-4' },
                            y('label', { for: 'message', className: 'sr-only', innerHTML: 'Message' }),
                            y('div', { className: 'relative' },
                              y('textarea', { id: 'message', className: 'form-input-field rounded block w-full py-2 px-3 border-1 placeholder-black required', placeholder: 'Message*', rows: 4 }, { attrs: { 'required': ''}}),
                              y('span', { className: 'form-error text-xs leading-xs text-red-100'}, { attrs: { 'aria-hidden': 'false', 'role': 'alert' }})
                            )
                          )
                        ),
                        y('div',
                          y('button', { className: 'contact-btn rounded font-heading font-bold w-full block py-2 px-6 border border-transparent text-white bg-blue-200 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-100 transition duration-150 ease-in-out', id: 'submit', type: 'submit', disabled: 'disabled', innerHTML: 'Send Enquiry'})
                        )
                      )
                  )
              )
            )
  
    }
  }
