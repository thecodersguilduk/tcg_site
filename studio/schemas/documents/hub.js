export default {
  name: 'hub',
  title: 'Hub',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type:'string',
    },
    {
      name: 'featuredImage',
      title: 'featuredImage',
      type:'image',
      fields: [
        {
          name: 'alt',
          title: 'alt',
          type:'string',
        },
      ]
    },
    
  ],
};