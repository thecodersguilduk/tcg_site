export default {
  name: 'imageSection',
  title: 'Image',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type:'string',
      title: 'Alt text',
      description: 'This text will be read by screen readers and should describe the image'
    },
    {
      name: 'license',
      type:'string',
      title: 'License link',
      description: 'This text will the link for the CC license'
    }
  ]
}