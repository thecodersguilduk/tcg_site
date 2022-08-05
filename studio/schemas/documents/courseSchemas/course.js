export default {
  name: 'course',
  type: 'document',
  title: 'Course Directory',
  initialValue: {
    attendance: 'Full Time'
  },
  fieldsets: [
    { name: 'cta',
      description: 'Activate the CTA here if required',
      title: 'Course CTA Field',
      options: {
        collapsible: true,
        collapsed: true,
      }
    },
    {
      name: 'content',
      description: 'Main Course Content',
      title: 'Main Course Content',
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
        name: 'start',
        type: 'date',
        title: 'Course Start Date'
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'tags',
        options: {
          //Locks menu from creating new tags (defaults to false)
          frozen: false,
          //Closes menu after tag selected (defaults to true)
          closeMenuOnSelect: true
        }
      },
      {
        name: 'courseType',
        title: 'Course Type',
        type: 'array',
        description: 'Please select one',
        of: [
          {
            type: 'reference',
            to: {
              type: 'courseTypes'
            }
          }
        ]
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
        name: 'featuredImage',
        type: 'image',
        title: 'Featured image'
      },
      {
        name: 'excerpt',
        type: 'array',
        title: 'Excerpt',
        fieldset: 'content',
        of: [
          { type: 'block'},
          { type: 'applyBtn' },
          { type: 'imageSection' },
          { type: 'break' },
          { type: 'newsletter' },
          { type: 'form' },
          { type: 'youtubeEmbed'}
        ]
      },
      {
        name: 'who_is_this_for',
        type: 'array',
        title: 'Who is this for?',
        fieldset: 'content',
        of: [
          { type: 'block'},
          { type: 'applyBtn' },
          { type: 'imageSection' },
          { type: 'break' },
          { type: 'newsletter' },
          { type: 'form' },
          { type: 'youtubeEmbed'}
        ]
      },
      {
        name: 'what_you_will_get',
        type: 'array',
        title: 'What you will get?',
        fieldset: 'content',
        of: [
          { type: 'block'},
          { type: 'applyBtn' },
          { type: 'imageSection' },
          { type: 'break' },
          { type: 'newsletter' },
          { type: 'form' },
          { type: 'youtubeEmbed'}
        ]
      },
      {
        name: 'bonus_takeaways',
        type: 'array',
        title: 'Bonus Takeaways',
        fieldset: 'content',
        of: [
          { type: 'block'},
          { type: 'applyBtn' },
          { type: 'imageSection' },
          { type: 'break' },
          { type: 'newsletter' },
          { type: 'form' },
          { type: 'youtubeEmbed'}
        ]
      },
            {
        name: 'course_outline',
        type: 'array',
        title: 'Course Outline',
        fieldset: 'content',
        of: [
          { type: 'block'},
          { type: 'applyBtn' },
          { type: 'imageSection' },
          { type: 'break' },
          { type: 'newsletter' },
          { type: 'form' },
          { type: 'youtubeEmbed'}
        ]
      },
            {
        name: 'course_breakdown',
        type: 'array',
        title: 'Course Breakdown',
        fieldset: 'content',
        of: [
          { type: 'block'},
          { type: 'applyBtn' },
          { type: 'imageSection' },
          { type: 'break' },
          { type: 'newsletter' },
          { type: 'form' },
          { type: 'youtubeEmbed'}
        ]
      },
            {
        name: 'delivery',
        type: 'array',
        title: 'Delivery',
        fieldset: 'content',
        of: [
          { type: 'block'},
          { type: 'applyBtn' },
          { type: 'imageSection' },
          { type: 'break' },
          { type: 'newsletter' },
          { type: 'form' },
          { type: 'youtubeEmbed'}
        ]
      },
      {
        name: 'pre_requisites',
        type: 'array',
        title: 'Pre-Requisites',
        fieldset: 'content',
        of: [
          { type: 'block'},
          { type: 'applyBtn' },
          { type: 'imageSection' },
          { type: 'break' },
          { type: 'newsletter' },
          { type: 'form' },
          { type: 'youtubeEmbed'}
        ]
      },
      {
        name: 'video_embed',
        title: 'Video Embed',
        type: 'string'
      },
      {
        name: 'trainers',
        type: 'array',
        title: 'Trainers',
        of: [
          {
            type: 'reference',
            to: { type: 'team' }
          }
        ]

      },
      {
        name: 'coursePortableText',
        type: 'array',
        title: 'Body',
        of: [
          { type: 'block'},
          { type: 'applyBtn' },
          { type: 'imageSection' },
          { type: 'break' },
          { type: 'newsletter' },
          { type: 'form' },
          { type: 'youtubeEmbed'}
        ]
      },
      {
        name: 'coursePortableText2',
        type: 'array',
        title: 'Second block of text (if applicable)',
        of: [
          { type: 'block'},
          { type: 'applyBtn' },
          { type: 'imageSection' },
          { type: 'break' },
          { type: 'newsletter' },
          { type: 'form' },
          { type: 'youtubeEmbed'}
        ]
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
      }
    ]
}
