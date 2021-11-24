export default {
    name: 'project',
    type: 'document',
    title: 'Course Project',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title'
      },
      {
        name: 'code',
        type: 'string',
        title: 'Code'
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