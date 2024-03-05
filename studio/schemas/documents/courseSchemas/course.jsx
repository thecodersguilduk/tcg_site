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
	return (
		<div>
			<h3>Client: {value}</h3>
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
			description: 'Per Person',
			fieldset: 'metaHero'
		},
		{
			name: 'h1',
			type: 'string',
			title: 'H1',
			description: 'H1 Text',
			fieldset: 'metaHero'
		},
		{
			name: 'title',
			type: 'string',
			title: 'Course Title',
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
			name: 'excerpt',
			type: 'array',
			title: 'Excerpt/Meta Description',
			fieldset: 'metaHero',
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
			description: 'The benefits of this course',
			type: 'object',
			fields: [
						{
							name: 'part_time_learning',
							title: 'Part Time Learning',
							type: 'boolean',
						},
						{
							name: 'one_or_two_sessions_per_week',
							title: 'One or Two Sessions per Week',
							type: 'boolean',
						},
						{
							name: 'evenings_available',
							title: 'Evenings Available',
							type: 'boolean',
						},
						{
							name: 'one_session_per_week',
							title: 'One Session per Week',
							type: 'boolean',
						},
						{
							name: 'two_day_workshop',
							title: 'Two Day Workshop',
							type: 'boolean',
						},
						{
							name: 'group_and_one_on_one_learning',
							title: 'Group and One on One learning',
							type: 'boolean',
						},
						{
							name: 'super_fast_roi',
							title: 'Super Fast ROI',
							type: 'boolean',
						},
						{
							name: 'three_half_days',
							title: 'Three Half Days',
							type: 'boolean',
						},
						{
							name: 'expert_professionals',
							title: 'Expert Professionals',
							type: 'boolean',
						},
					],
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
					type: 'object',
					fields: [
						{
							name: 'item',
							type: 'reference',
							title: 'Testimonial',
							to: [{ type: 'testimonial' }],
						}
					],
				},
			],
			preview: {
				select: {
					client: 'client',
					testimonial: 'testimonial',
				},
				component: TestimonialPreview,
			},
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
