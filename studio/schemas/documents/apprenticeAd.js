export default
  {
    name: 'apprenticeshipVacancies',
    type: 'document',
    title: 'Apprentice Vacancies',
    fields: [
      {
        name: 'isActive',
        title: 'Is Active',
        type: 'boolean'
      },
      {
        name: 'employerLogo',
        title: 'Employer Logo',
        type: 'image',
      },
      {
        name: 'employerName',
        title: 'Employer Name',
        type: 'string'
      },
      {
        name: 'disabilityConfident',
        title: 'Disabily Confident',
        type: 'boolean',
      },
      {
        name: 'jobTitle',
        title: 'Job Title',
        type: 'string'
      },
      {
        name: 'isDev',
        title: 'Select if this is a Software Development L4 Course',
        type: 'boolean'
      },
      {
        name: 'isTest',
        title: 'Select if this is a Software Testing Course',
        type: 'boolean'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: {
          source: slug => `${slug.jobTitle}-${slug.employerName}`,
          maxLength: 96
        }
      },
      {
        name: 'location',
        title: 'Location',
        type: 'array',
        of: [
          { type: 'reference',
          to: [
            { type: 'location' }
          ]
          }
        ]
      },
      {
        name: 'closingDate',
        title: 'Closing Date',
        type: 'date',
      },
      {
        name: 'jobDescription',
        title: 'Job Description',
        type: 'array',
        of: [
          { type: 'block'}
        ]
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
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
        name: 'companyIntro',
        title: 'Company Intro',
        type: 'array',
        of: [
          { type: 'block'}
        ]
      },
      {
        name: 'desiredSkills',
        title: 'Desired Skills',
        type: 'array',
        of: [
          { type: 'block'}
        ]
      },
      {
        name: 'yourDuties',
        title: 'Job Duties',
        type: 'array',
        of: [
          { type: 'block'}
        ]
      },
      {
        name: 'benefits',
        title: 'Job Benefits',
        type: 'array',
        of: [
          { type: 'block'}
        ]
      },
      {
        name: 'personalQualities',
        title: 'Personal Qualities',
        type: 'array',
        of: [
          { type: 'block'}
        ]
      },
      {
        name: 'thingstoConsider',
        title: 'Things to Consider',
        type: 'array',
        of: [
          { type: 'block'}
        ]
      },
      {
        name: 'prospects',
        title: 'Future Prospects',
        type: 'array',
        of: [
          { type: 'block'}
        ]
      },
      {
        name: 'qualifications',
        title: 'Qualifications Required',
        type: 'array',
        of: [
          { type: 'block'}
        ]
      },
      {
        name: 'trainingProvided',
        title: 'Training to be Provided',
        type: 'array',
        of: [
          { type: 'block'}
        ]
      },
      {
        name: 'support',
        title: 'How we will support you as an apprentice',
        type: 'array',
        of: [
          { type: 'block'}
        ]
      }
    ]
  }

