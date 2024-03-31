export default {
    name: 'hub',
    type: 'document',
    title: 'Hub Pages',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        description: 'Titles should be catchy, descriptive, and not too long'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'Some frontends will require a slug to be set to be able to show the post',
        options: {
          source: 'title',
          maxLength: 96
        }
      },
      {
        name: 'featuredImage',
        type: 'image',
        title: 'Featured Image'
      },
      {
        name: 'video',
        type: 'string',
        title: 'Featured Video',
        description: 'Youtube embed link - if none given the featured image will be used.'
      },
      {
        name: 'excerpt',
        type: 'text',
        title: 'Excerpt',
        description:
          'This ends up on summary pages, on Google, when people share your post in social media.'
      },
      {
        name: 'courses',
        title: 'Courses',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'course' }]
          }
        ]
      },
      {
        name: 'partners',
        title: 'Partners',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'coursePartners' }]
          }
        ]
      },
      {
        name: 'testimonials',
        title: 'Testimonials',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'testimonial' }]
          }
        ]
      },
      {
        name: 'headerText',
        type: 'array',
        title: 'Content',
        description: 'Usually a sentence with 3 bullet point USPs',
        of: [
          { type: 'block' },
        ]
      },
      {
        name: 'ctaText',
        type: 'string',
        title: 'CTA Text',
        description: 'Text in the CTA button'
      },
      {
        name: 'content',
        title: 'Main Content',
        description: 'Main content for the hub page',
        type: 'array',
        of: [
            {type: 'block'}
        ]
      }
    ],
  }