export default {
  name: 'blog',
  type: 'document',
  title: 'Blog Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long',
      validation: rule => rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      validation: rule => rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'Please ensure this is set (and not a placeholder!)',
      validation: rule => rule.required()
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main image',
      validation: rule => rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'alt',
          type:'string',
        },
        {
          name: 'license',
          title: 'Creative Commons License',
          description: 'If you are unsure, please leave blank',
          type: 'string',
          options: {
            list: [
              { title: 'CC BY (Attribution)', value: 'CC BY' },
              { title: 'CC BY-SA (Attribution-ShareAlike)', value: 'CC BY-SA' },
              { title: 'CC BY-ND (Attribution-NoDerivs)', value: 'CC BY-ND' },
              { title: 'CC BY-NC (Attribution-NonCommercial)', value: 'CC BY-NC' },
              { title: 'CC BY-NC-SA (Attribution-NonCommercial-ShareAlike)', value: 'CC BY-NC-SA' },
              { title: 'CC BY-NC-ND (Attribution-NonCommercial-NoDerivs)', value: 'CC BY-NC-ND' }
            ],
            layout: 'dropdown' // Optional: shows as a dropdown
          }
        },
        {
					name: 'licenseSite',
					title: 'Which website did you get the image from?',
					type: 'string',
				},
        {
					name: 'licenseUrl',
					title: 'License URL',
					description: 'Where you got the image from',
					type: 'string',
				}
      ]
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      validation: rule => rule.required(),
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.'
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      validation: rule => rule.required(),
      of: [
        {
          type: 'reference',
          to: [{ type: 'team' }]
        }
      ]
    },
    {
      name: 'time',
      title: 'Time to Read',
      type: 'string',
      description: 'Just enter a whole number of minutes here!',
      validation: rule => rule.required(),
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      validation: rule => rule.required(),
      of: [
        {
          type: 'reference',
          to: {
            type: 'categories'
          }
        }
      ]
    },
    {
      name: 'blogPortableText',
      type: 'array',
      title: 'Body',
      of: [
        { 
          type: 'block' ,
 
        },
        { type: 'imageSection' },
        { type: 'applyBtn' },
        { type: 'callModal' },
        { type: 'newsletter' },
        { type: 'form' },
        { type: 'youtubeEmbed' },
        { type: 'calendlyEmbed' },
        { type: 'leadGenFormEmbed' },
      ]
    },
    {
      name: 'tags',
      type: 'tags',
      title: 'Tags',
    }
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    }
  ],
}