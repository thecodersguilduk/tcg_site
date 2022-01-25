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
            description: 'Fill these in if the position is an external apprenticeship job advert only'
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
          source: 'jobTitle',
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
        name: 'jobDescription',
        title: 'Job Description',
        type: 'text'
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
        name: 'desiredSkills',
        title: 'Desired Skills',
        type: 'string',
        fieldset: 'apprenticeAds'
      },
      {
        name: 'personalQualities',
        title: 'Personal Qualities',
        type: 'string',
        fieldset: 'apprenticeAds'
      },
      {
        name: 'trainingProvided',
        title: 'Training to be Provided',
        type: 'string',
        fieldset: 'apprenticeAds'
      },
      {
        name: 'support',
        title: 'How we will support you as an apprentice',
        type: 'string',
        fieldset: 'apprenticeAds'
      }
    ]
  }

