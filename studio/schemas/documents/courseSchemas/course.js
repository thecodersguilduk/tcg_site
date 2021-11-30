export default {
  name: 'course',
  type: 'document',
  title: 'Course Directory',
  initialValue: {
    attendance: 'Full Time'
  },
  fieldsets: [
    { name: 'courseMeta',
      description: 'Collapse menu to fill in funder details',
      title: 'Course Meta Data',
      options: {
        collapsible: true,
        collapsed: true,
      }
    },
    { name: 'apprenticeshipOnly',
      title: 'Apprenticeship Info Only',
      description: 'Click to input data for apprenticeships only',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2
      }
    }
  ],
    fields: [
      {
        name: 'isActive',
        type: 'boolean',
        title: 'Active',
        description: 'Switch on when course is available'
      },
      {
        name: 'title',
        type: 'string',
        title: 'Course Name'
      },
      {
        name: 'isGMCA',
        type: 'boolean',
        title: 'Is GMCA?',
        fieldset: 'courseMeta'
      },
      {
        name: 'code',
        type: 'string',
        title: 'Course Code',
        description: 'eg. 2dw-? 5di-? upsk-? rsk-? appr-?',
        fieldset: 'courseMeta'
      },
      {
        title: 'Course Partner',
        name: 'partner',
        fieldset: 'courseMeta',
        type: 'array',
        description: 'Please select one',
        of: [
          {
            type: 'reference',
            to: {
              type: 'coursePartners'
            }
        }
        ],
      },
      {
        title: 'Course Funder',
        name: 'funder',
        fieldset: 'courseMeta',
        type: 'array',
        description: 'Please select one',
        of: [
          {
            type: 'reference',
            to: {
              type: 'courseFunder'
            }
        }
        ],
      },
      {
        title: 'Course Project',
        name: 'project',
        fieldset: 'courseMeta',
        type: 'array',
        description: 'Please select one',
        of: [
          {
            type: 'reference',
            to: {
              type: 'courseProject'
            }
        }
        ],
      },
      {
        name: 'courseType',
        title: 'Course Type',
        fieldset: 'courseMeta',
        type: 'array',
        description: 'Please select one',
        of: [
          {
            type: 'reference',
            to: {
              type: 'courseTypes'
            }
          }
        ],
      },
      {
        name: 'courseTopics',
        type: 'array',
        description: 'Select as many as you like - what is the course relevant to?',
        title: 'Course Topic(s)',
        of: [
          {
            type: 'reference',
            to: {
              type: 'courseTopics'
            }
          }
        ]
      },
      {
        name: 'duration',
        description: 'Non-apprenticeship courses only',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: {
              type: 'courseDuration'
            }
          }
        ]
      },
      {
        title: 'Attendance',
        description: 'Non-apprenticeship courses only - only one can be selected - please contact the administrator for more details',
        name: 'attendance',
        type: 'string',
        options: {
          list: [
            { title: 'Full Time', value: 'Full Time' },
            { title: 'Part Time', value: 'Part Time' },
            { title: 'On Demand', value: 'On Demand' },
          ],
        },
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'Some frontends will require a slug to be set to be able to show the post',
        options: {
          source: 'title'    
          },
          maxLength: 96
      },
      {
        name: 'qualification',
        type: 'string',
        fieldset: 'apprenticeshipOnly',
        title: 'Qualification',
        description:
          'If applicable.'
      },
      {
        name: 'level',
        description: 'If applicable',
        fieldset: 'apprenticeshipOnly',
        type: 'string',
        title: 'Level'
      },
      {
        name: 'featuredImage',
        type: 'image',
        title: 'Featured image'
      },
      {
        name: 'excerpt',
        type: 'text',
        title: 'Excerpt',
      },
      {
        name: 'coursePortableText',
        type: 'array',
        title: 'Body',
        of: [
          { type: 'block'},
        ] 
      }
    ]
}
