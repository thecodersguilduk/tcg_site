export default {
  name: 'imageSection',
  title: 'Image',
  type: 'image',
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
}