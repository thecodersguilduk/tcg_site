export default {
    name: 'coursePartners',
    type: 'document',
    title: 'Course Partners',
    fields: [
      {
        title: 'Partner',
        name: 'partnerName',
        type: 'string'
      },
      {
          title: 'Partner Code',
          name: 'code',
          type: 'string'
      },
      {
        title: 'Logo',
        name: 'logo',
        type: 'image'
      }
    ]
  }