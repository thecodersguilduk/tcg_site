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
        name: 'linkedIn',
        title: 'linkedIn url',
        type: 'string'
      },
      {
        name: 'instagram',
        title: 'Instagram url',
        type: 'string'
      },
      {
        name: 'facebook',
        title: 'FaceBook url',
        type: 'string'
      },
      {
        name: 'twitter',
        title: 'Twitter url',
        type: 'string'
      },
      {
        name: 'location',
        title: 'Location',
        type: 'array',
        description: 'Please select one',
        of: [
          {
            type: 'reference',
            to: {
              type: 'location'
            }
          }
        ],
      },
      {
        name: 'closingDate',
        title: 'Closing Date',
        type: 'date'
      },
      {
        name: 'contract',
        title: 'Contract',
        type: 'array',
        description: 'Please select one',
        of: [
          {
            type: 'reference',
            to: {
              type: 'contractType'
            }
          }
        ],
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
        title: 'Apprenticeship Standard',
        type: 'array',
        description: 'Please select one',
        of: [
          {
            type: 'reference',
            to: {
              type: 'standard'
            }
          }
        ],
      },
      {
        name: 'apprenticeApplyUrl',
        title: 'Apprentice Application Form Link',
        type: 'array',
        description: 'Please select one',
        of: [
          {
            type: 'reference',
            to: {
              type: 'apprenticeApplyUrl'
            }
          }
        ],
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
        name: 'requiredQualifications',
        title: 'Required Qualifications',
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
      },
      {
        name: 'duties',
        title: 'list of duties',
        type: 'string'
      },
      {
        name: 'futureProspects',
        title: 'Future Prospects',
        type: 'string'
      },
      {
        name: 'thingsToConsider',
        title: 'This to consider',
        type: 'string'
      },
      {
        name: 'blogPortableText',
        type: 'array',
        title: 'body',
        of: [
          { type: 'block' },
          { type: 'imageSection' },
          { type: 'applyBtn' },
          { type: 'callModal' },
          { type: 'leadSentence' },
          { type: 'supportingSentence' },
          { type: 'styledHeading' }

        ]
      }
    ]
  }

