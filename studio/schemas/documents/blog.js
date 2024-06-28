export default {
  name: 'blog',
  type: 'document',
  title: 'Blog Post',
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
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'Please ensure this is set (and not a placeholder!)'
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main image'
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.'
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
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
      description: 'Just enter the number of minutes here!'
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
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