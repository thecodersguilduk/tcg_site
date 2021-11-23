export default
  {
    name: 'ApprenticeJobAds',
    type: 'document',
    title: 'Apprentice Job Post',
    fields: [
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
        type: 'string',
        description: 'eg. Yes'
      },
      {
        name: 'jobTitle',
        title: 'Job Title',
        type: 'string'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'Some frontends will require a slug to be set to be able to show the post',
        options: {
          source: slug => `${slug.jobTitle}-${slug.employerName}`,
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
        type: 'string',
        description: 'eg 01/01/2021'
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
        type: 'string'
      },
      {
        name: 'briefOverview',
        title: 'Brief overview of the role',
        type: 'string'
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'string',
        description:
          'This ends up on summary pages, on Google, when people share your post in social media.'
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
        type: 'string'
      },
      {
        name: 'personalQualities',
        title: 'Personal Qualities',
        type: 'string'
      },
      {
        name: 'trainingProvided',
        title: 'Training to be Provided',
        type: 'string'
      },
      {
        name: 'support',
        title: 'How we will support you as an apprentice',
        type: 'string'
      }
    ]
  }

