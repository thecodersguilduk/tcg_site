export default {
    name: 'team',
    type: 'document',
    title: 'Team',
    fieldsets: [
      {name: 'social', title: 'Social media handles'},
      {name: 'staffType', title: 'Staff Type'}
    ],
    fields: [
      {
        name: 'order',
        type: 'number',
        title: 'Order'
      },
      {
        name: 'name',
        type: 'string',
        title: 'Name'
      },
      {
        name: 'core',
        type: 'boolean',
        title: 'Core Team',
        fieldset: 'staffType'
      },
      {
        name: 'trainer',
        type: 'boolean',
        title: 'Trainer',
        fieldset: 'staffType'
      },
      {
        name: 'governor',
        type: 'boolean',
        title: 'Governor',
        fieldset: 'staffType'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'Some frontends will require a slug to be set to be able to show the person',
        options: {
          source: 'name',
          maxLength: 96
        }
      },
      {
        name: 'occupation',
        type: 'string',
        title: 'Job Title'
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image'
      },
      {
        name: 'bio',
        type: 'text',
        title: 'Biography'
      },
      {
        title: 'Twitter',
        name: 'twitter',
        type: 'string',
        fieldset: 'social'
      },
      {
        title: 'LinkedIn',
        name: 'linkedin',
        type: 'string',
        fieldset: 'social'
      },
      {
        title: 'Github',
        name: 'github',
        type: 'string',
        fieldset: 'social'
      }
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'slug.current',
        media: 'image'
      }
    }
  }