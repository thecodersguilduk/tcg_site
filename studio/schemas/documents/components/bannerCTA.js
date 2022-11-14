export default {
    name: 'bannerCTA',
    title: 'Banner CTA',
    type: 'object',
    fields: [
      {
        name: 'img',
        type: 'image',
        title: 'Main Banner Image',
        description: 'Main banner image - upload as jpeg'
      },
      {
        name: 'title',
        type: 'string',
        title: 'Title',
      },
      {
        name: 'subTitle',
        type: 'string',
        title: 'Subtitle',
      },
      {
        name: 'bodyText',
        type: 'array',
        of: [
          { type: 'block' }
        ],
        title: 'Main Text'
      },
      {
        name: 'buttonText',
        type: 'string',
        title: 'CTA Button Text'
      },
      {
        name: 'buttonLink',
        type: 'string',
        title: 'buttonLink'
      }
    ]
  }