export default {
    name: 'blogPortableText',
    type: 'array',
    title: 'Blog Content',
    of: [
      {
        title: 'Block',
        type: 'block',
        styles: [],
        lists: [],
        marks: {
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
            {title: 'Code', value: 'code'}
          ]
        }
      }
    ]
  }