export default {
    name: 'funder',
    type: 'document',
    title: 'Course Funder',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title'
      },
      {
        name: 'code',
        type: 'string',
        title: 'Funder Code'
      },
      {
        name: 'logo',
        type: 'image',
        title: 'Logo'
      },
      {
        name: 'description',
        type: 'array',
        of: [ {type: 'block'} ],
        title: 'Description'
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'slug',
        options: {
          // auto generates a slug from the title field
          source: 'title',
          auto: true
        }
      }
    ]
  }