    export default {
	name: 'caseStudies',
	label: 'Case Studies',
    type: 'document',
	fields: [
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'This helps sort it in the blog feed - Please ensure this is set (and not a placeholder!)'
    },
    {
      name: 'time',
      type: 'string',
      title: 'Time to read',
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      description: 'Again - helps with blog formatting',
      of: [
        {
          type: 'reference',
          to: [{ type: 'team' }]
        }
      ]
    },
		{
			name: 'title',
			label: 'Title',
			type: 'string',
			required: true
		},
		{
			name: 'slug',
            type: 'slug',
            title: 'Slug',
            description: 'Some frontends will require a slug to be set to be able to show the post',
            required: true,
            options: {
                source: 'title',
                maxLength: 96
            }
		},
    {
			name: 'featuredImage',
			label: 'Image',
			type: 'image',
			required: true,
            fields: [
                {
                    name: 'alt',
                    title: 'alt',
                    type:'string',
                },
                {
                    name: 'license',
                    title: 'Creative Commons License',
                    description: 'If you are unsure, please leave blank',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'CC BY (Attribution)', value: 'CC BY' },
                            { title: 'CC BY-SA (Attribution-ShareAlike)', value: 'CC BY-SA' },
                            { title: 'CC BY-ND (Attribution-NoDerivs)', value: 'CC BY-ND' },
                            { title: 'CC BY-NC (Attribution-NonCommercial)', value: 'CC BY-NC' },
                            { title: 'CC BY-NC-SA (Attribution-NonCommercial-ShareAlike)', value: 'CC BY-NC-SA' },
                            { title: 'CC BY-NC-ND (Attribution-NonCommercial-NoDerivs)', value: 'CC BY-NC-ND' }
                        ],
                    }
                }
            ]
		},
		{
			name: 'excerpt',
			label: 'Description',
			type: 'text',
			required: true
		},
    {
			name: 'quote',
			label: 'Quote for the intro section under the video',
			type: 'text',
			required: true
		},
    {
      name: 'metrics',
      title: 'Metrics',
      description: '3 things we can measure to show the impact we had!',
      type: 'array',
      of: [
        { 
          type: 'object', 
          fields: [
            {
              name: 'description',
              title: 'Description of the metric - eg. 20% Increase in sales',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }
          ] 
        }
      ]
    },
    {
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Around 3 short paragraphs to introduce the case study'
    },
    {
        name: 'situation',
        title: 'Situation/Problem',
        type: 'object',
        fields: [
          {
            name: 'text',
            title: 'Text',
            type: 'array',
            of: [{ type: 'block' }],
          },
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
    },
    {
      name: 'task',
      title: 'Task',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'result',
      title: 'Result',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'testimonial',
      title: 'Testimonial',
      description: 'Just one!',
      type: 'reference',
      to: { type: 'testimonial'},
    },
    {
      name: 'pdfLink',
      title: 'PDF Document',
      type: 'file',
      options: {
        accept: '.pdf', // Restrict uploads to only PDFs
      },
      validation: (Rule) =>
        Rule.required().error('A PDF file is required.'), // Optional: Require a PDF
    },
    {
      name: 'videoId',
      title: 'Video Embed Id',
      type: 'string',
      description: 'Get this from the embed code from the youtube video embed'
    }
	]
};