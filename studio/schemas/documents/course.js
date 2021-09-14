export default {
    name: 'course',
    type: 'document',
    title: 'Courses',
    fieldsets: [
        {name: 'courseType', title: 'Course Type'}
      ],
    fields: [
      {
        name: 'isActive',
        type: 'boolean',
        title: 'Active'
      },
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        description: 'Titles should be catchy, descriptive, and not too long'
      },
      {
        title: 'Course Type',
        name: 'courseType',
        type: 'array',
        description: 'Please select one',
        of: [
          {
            type: 'reference',
            to: {
              type: 'courseTypes'
            }
        }
        ],
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'Some frontends will require a slug to be set to be able to show the post',
        options: {
          source: 'title'    
          },
          maxLength: 96
      },
      {
        name: 'qualification',
        type: 'string',
        title: 'Qualification',
        description:
          'If applicable.'
      },
      {
        name: 'level',
        type: 'string',
        title: 'Level'
      },
      {
        name: 'duration',
        type: 'string',
        title: 'Duration'
      },
      {
        name: 'featuredImage',
        type: 'image',
        title: 'Featured image'
      },
      {
        name: 'excerpt',
        type: 'text',
        title: 'Excerpt',
        description:
          'This ends up on summary pages, on Google, when people share your post in social media.'
      },
      {
        name: 'coursePortableText',
        type: 'array',
        title: 'Body',
        of: [
          { type: 'block'},
        ] 
      }
    ]
  }
