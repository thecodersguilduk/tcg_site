export default
  {
    name: 'vacancies',
    type: 'document',
    title: 'Vacancies',
    fieldsets: [
        {
            name: 'apprenticeAds',
            title: 'Apprenticeship Vacancies',
            options: {
                collapsible: true,
                collapsed: true
            },
            description: 'Fill these in if the position is an external apprenticeship job advert only - you will also need to fill in the job description below'
        },
        {
          name: 'socials',
          title: 'Social Handles',
          options: {
            collapsible: true,
            collapsed: true
          },
          description: 'Social Media Handles for the Company hiring'
        }
    ],
    fields: [
      {
        name: 'jobTitle',
        title: 'Job Title',
        type: 'string'
      },
      {
          name: 'isActive',
          title: 'Active',
          type: 'boolean',
          description: 'Click to put live or take down'
      },
      {
        name: 'isExternal',
        title: 'Is External',
        type: 'boolean',
        description: 'Click to confirm this is an external vacancy',
        fieldset: 'apprenticeAds'
      },
      {
        name: 'employerLogo',
        title: 'Employer Logo',
        type: 'image',
        fieldset: 'apprenticeAds'
      },
      {
        name: 'employerName',
        title: 'Employer Name',
        type: 'string',
        fieldset: 'apprenticeAds'
      },
      {
        name: 'disabilityConfident',
        title: 'Disabily Confident',
        type: 'boolean',
        fieldset: 'apprenticeAds'
      },
      {
        name: 'pdf',
        title: 'PDF Link to Job Description',
        description: 'If required',
        type: 'string'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'Click to auto generate',
        options: {
          source: doc => {
            return doc.employerName ? `${doc.jobTitle}-${doc.employerName}` : `${doc.title}`
          },
          maxLength: 96
        }
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string'
      },
      {
        name: 'closingDate',
        title: 'Closing Date',
        type: 'date',
      },
      {
        name: 'contract',
        title: 'Contract',
        type: 'string',
        description: 'eg full-time, part-time'
      },
      {
        name: 'briefOverview',
        title: 'Brief overview of the role',
        type: 'text'
      },
      {
        name: 'standard',
        title: 'Standard',
        type: 'string',
        description: 'eg. software developer level 4, data analyst level 4'
      },
      {
        name: 'salary',
        title: 'Salary',
        type: 'string'
      },
      {
        name: 'facebook',
        title: 'Facebook Url',
        type: 'string',
        description: 'Facebook URL',
        fieldset: 'socials'
      },
      {
        name: 'twitter',
        title: 'Twitter Url',
        type: 'string',
        description: 'Twitter URL',
        fieldset: 'socials'
      },
      {
        name: 'linkedin',
        title: 'LinkedIn Url',
        type: 'string',
        description: 'LinkedIn URL',
        fieldset: 'socials'
      },
      {
        name: 'instagram',
        title: 'Instagram Url',
        type: 'string',
        description: 'Instagram URL',
        fieldset: 'socials'
      },
      {
        name: 'jobDescription',
        title: 'Job Description',
        type: 'array',
        of: [
          { type: 'block' },
          { type: 'imageSection' },
          { type: 'applyBtn' },
          { type: 'callModal' },
          { type: 'leadSentence' },
          { type: 'supportingSentence' },
          { type: 'styledHeading' },
          { type: 'newsletter' },
          { type: 'form' }
        ]
      }
    ]
  }

