// profile Image
// job title
// description
// social media links
// internal/external


export default {
    name: 'team',
    type: 'document',
    title: 'Team',
    fieldsets: [
      {name: 'social', title: 'Social media handles'}
    ],
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name'
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