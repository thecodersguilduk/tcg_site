import { format } from 'date-fns';
import React from 'react';

const CourseInstancePreview = ({ value }) => {
	if (!value || !value.date) {
		return <div>No course instance date specified</div>;
	}

	const formattedDate = format(new Date(value.date), 'dd/MM/yyyy hh:mm a');

	return (
		<div>
			<div>{formattedDate}</div>
		</div>
	);
};

const TestimonialPreview = ({ value }) => {
	if (!value || !value.testimonial) {
	  return <div>No testimonial specified</div>;
	}
	return (
	  <div>
		<h3>Client: {value.client}</h3>
		{value.avatar && <img src={value.avatar} alt="Client Avatar" />}
		<p>Testimonial: {value.testimonial}</p>
	  </div>
	);
  };
export default {
	name: 'course',
	type: 'document',
	title: 'Course Directory',
	initialValue: {
		attendance: 'Full Time',
	},
	fieldsets: [
		{
			name: 'metaHero',
			description: 'Page Meta Data and Hero Section Content',
			title: 'Meta and Hero Section',
			options: {
				collapsible: true,
				collapsed: true
			}
		},
		{
			name: 'intro',
			description: 'Course Intro Content',
			title: 'Course Intro Content',
			options: {
				collapsible: true,
				collapsed: true
			}	
		},
		{
			name: 'content',
			description: 'Main Course Content',
			title: 'Main Course Content',
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
	],
	fields: [
		{
			name: 'isActive',
			type: 'boolean',
			title: 'Active',
			description: 'Switch on when course is available',
		},
		{
			name: 'price',
			type: 'string',
			title: 'Course Price',
			description: 'Per Person - please just use numbers - no £/$ signs required',
			fieldset: 'metaHero'
		},
		{
			name: 'title',
			type: 'string',
			title: 'H1',
			fieldset: 'metaHero'
		},
		{
			name: 'subtitle',
			type: 'string',
			title: 'Course SubTitle',
			fieldset: 'metaHero',
			description:
				'The contracted course title as stipulated by the course funders',
		},
		{
			name: 'ctaText',
			title: 'CTA Button Text',
			type: 'string',
			fieldset: 'metaHero',
			description: 'This controls the text that appears in the CTA buttons on the course page. Defaults to apply now.'
		},
		{
			name: 'formLink',
			title: 'Form Link',
			description: 'Link to the course application form',
			type: 'string',
			fieldset: 'metaHero',
		},
		{
			name: 'meta_description',
			title: 'Meta Description',
			description: 'For google and perhaps rendering on the page!',
			type: 'text',
			fieldset: 'metaHero',
		},
		{
			name: 'video_embed',
			title: 'Video Embed',
			type: 'string',
			fieldset: 'metaHero'
		},
		{
			name: 'featuredImage',
			description:
				'Please ensure you edit the image to have an aspect ratio of 16/9 BEFORE you upload it - for consistency on the regional hub pages',
			type: 'image',
			title: 'Featured image',
			fieldset: 'metaHero',
		},
		{
			name: 'logos',
			type: 'array',
			title: 'Course Partners/Funders',
			fieldset: 'metaHero',
			of: [
				{
					type: 'reference',
					to: [{ type: 'coursePartners' }],
				},
			],
		},
		{
			name: 'excerpt',
			type: 'array',
			title: 'Excerpt/Meta Description',
			fieldset: 'intro',
			of: [
				{ type: 'block' },
				{ type: 'applyBtn' },
				{ type: 'imageSection' },
				{ type: 'break' },
				{ type: 'newsletter' },
				{ type: 'form' },
			],
		},
		{
			name: 'instances',
			title: 'Instances',
			description: 'Add in each time a course is running in here',
			fieldset: 'intro',
			type: 'array',
			of: [
				{
					name: 'instance',
					title: 'Instance',
					type: 'object',
					fields: [
						{
							name: 'date',
							title: 'Date',
							type: 'datetime',
							description: 'The date of this course instance',
						},
						{
							name: 'description',
							title: 'Description',
							type: 'array',
							of: [
								{
									type: 'block',
								},
							],
							description: 'A description of this course instance',
						},
					],
					preview: {
						select: {
							date: 'date',
							description: 'description',
						},
						component: CourseInstancePreview,
					},
				},
			],
		},
		{
			name: 'benefits',
			title: 'Benefits',
			description: 'The benefits of this course - MAXIMUM 3!!',
			type: 'array',
            of: [{ type: 'reference', to: [{ type: 'courseBenefits' }]}],
			validation: Rule => Rule.unique(),
			fieldset: 'intro'
		},
		{
			name: 'who_is_this_for',
			type: 'array',
			title: 'Who is this for?',
			fieldset: 'content',
			of: [
				{ type: 'block' },
				{ type: 'applyBtn' },
				{ type: 'imageSection' },
				{ type: 'break' },
				{ type: 'newsletter' },
				{ type: 'form' },
				{ type: 'youtubeEmbed' },
			],
		},
		{
			name: 'what_you_will_get',
			type: 'array',
			title: 'What you will get?',
			fieldset: 'content',
			of: [
				{ type: 'block' },
				{ type: 'applyBtn' },
				{ type: 'imageSection' },
				{ type: 'break' },
				{ type: 'newsletter' },
				{ type: 'form' },
				{ type: 'youtubeEmbed' },
			],
		},
		{
			name: 'course_outline',
			type: 'array',
			title: 'Course Outline',
			fieldset: 'content',
			of: [
				{ type: 'block' },
				{ type: 'applyBtn' },
				{ type: 'imageSection' },
				{ type: 'break' },
				{ type: 'newsletter' },
				{ type: 'form' },
				{ type: 'youtubeEmbed' },
			],
		},
		{
			name: 'course_breakdown',
			type: 'array',
			title: 'Course Breakdown',
			fieldset: 'content',
			of: [
				{ type: 'block' },
				{ type: 'applyBtn' },
				{ type: 'imageSection' },
				{ type: 'break' },
				{ type: 'newsletter' },
				{ type: 'form' },
				{ type: 'youtubeEmbed' },
			],
		},
		{
			name: 'delivery',
			type: 'array',
			title: 'Delivery',
			fieldset: 'content',
			of: [
				{ type: 'block' },
				{ type: 'applyBtn' },
				{ type: 'imageSection' },
				{ type: 'break' },
				{ type: 'newsletter' },
				{ type: 'form' },
				{ type: 'youtubeEmbed' },
			],
		},
		{
			name: 'pre_requisites',
			type: 'array',
			title: 'Pre-Requisites',
			fieldset: 'content',
			of: [
				{ type: 'block' },
				{ type: 'applyBtn' },
				{ type: 'imageSection' },
				{ type: 'break' },
				{ type: 'newsletter' },
				{ type: 'form' },
				{ type: 'youtubeEmbed' },
			],
		},
		{
			name: 'trainers',
			type: 'array',
			title: 'Trainers',
			of: [
				{
					type: 'reference',
					to: { type: 'team' },
				},
			],
		},
		{
			name: 'testimonials',
			type: 'array',
			title: 'Testimonials',
			of: [
				{
					type: 'reference',
					to: {type: 'testimonial'}
				
				}
			]
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
						type: 'courseTypes',
					},
				},
			],
		},
		{
			name: 'slug',
			type: 'slug',
			title: 'Slug',
			description:
				'Please click generate to create a unique slug based on the title',
			options: {
				source: 'title',
			},
			maxLength: 96,
		},
		{
			name: 'tags',
			title: 'Tags',
			type: 'tags',
			options: {
				//Locks menu from creating new tags (defaults to false)
				frozen: false,
				//Closes menu after tag selected (defaults to true)
				closeMenuOnSelect: true,
			},
		},
	],
};