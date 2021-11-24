export default {
  name: 'callModal',
  title: 'Modal - Book a call',
  type: 'object',
  initialValue: {
    title: 'Book a Call',
  },
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Default value is Book a call'
    }
  ]
}