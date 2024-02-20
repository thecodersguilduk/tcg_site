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
			name: 'courseName',
			description: 'Titles of the course',
			title: 'Course Name(s)',
			options: {
				collapsible: true,
				collapsed: true
			}
		},
		{
			name: 'Benefits',
			description: 'Renders the icons under the 10s pitch',
			title: 'Benefits',
			options: {
				collapsible: true,
				collapsed: true,
			},
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
		{
			name: 'apprenticeshipOnly',
			title: 'Apprenticeship Info Only',
			description: 'Click to input data for apprenticeships only',
			options: {
				collapsible: true,
				collapsed: true,
				columns: 2,
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
			name: 'title',
			type: 'string',
			title: 'Course Name',
			fieldset: 'courseName'
		},
		{
			name: 'subtitle',
			type: 'string',
			title: 'Course SubTitle',
			fieldset: 'courseName',
			description:
				'The contracted course title as stipulated by the course funders',
		},
		{
			name: 'featuredImage',
			description:
				'Please ensure you edit the image to have an aspect ratio of 16/9 BEFORE you upload it - for consistency on the regional hub pages',
			type: 'image',
			title: 'Featured image',
			fields: [
				{
					title: 'Alt Text',
					name: 'alt',
					type: 'text',
					description: 'Make sure you put something in here - this will display to the user if the image fails to loads, and will be used by screen readers to those with low vision'
				},
			],
		},
		{
			name: 'logos',
			type: 'array',
			title: 'Course Partners/Funders',
			of: [
				{
					type: 'reference',
					to: [{ type: 'coursePartners' }],
				},
			],
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
			title: 'Attendance',
			description:
				'Non-apprenticeship courses only - only one can be selected - please contact the administrator for more details',
			name: 'attendance',
			type: 'string',
			options: {
				list: [
					{ title: 'Full Time', value: 'Full Time' },
					{ title: 'Part Time', value: 'Part Time' },
					{ title: 'Remote', value: 'Remote' },
					{ title: 'Classroom Based', value: 'Classroom Based' },
					{ title: 'On Demand', value: 'On Demand' },
				],
			},
		},
		{
			name: 'slug',
			type: 'slug',
			title: 'Slug',
			description:
				'Some frontends will require a slug to be set to be able to show the post',
			options: {
				source: 'title',
			},
			maxLength: 96,
		},
		{
			name: 'excerpt',
			type: 'array',
			title: 'Excerpt',
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
			name: 'instances',
			title: 'Instances',
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
			name: 'part_time_learning',
			title: 'Part Time Learning',
			type: 'boolean',
			fieldset: 'Benefits',
		},
		{
			name: 'one_or_two_sessions_per_week',
			title: 'One or Two Sessions per Week',
			type: 'boolean',
			fieldset: 'Benefits',
		},
		{
			name: 'evenings_available',
			title: 'Evenings Available',
			type: 'boolean',
			fieldset: 'Benefits',
		},
		{
			name: 'one_session_per_week',
			title: 'One Session per Week',
			type: 'boolean',
			fieldset: 'Benefits',
		},
		{
			name: 'two_day_workshop',
			title: 'Two Day Workshop',
			type: 'boolean',
			fieldset: 'Benefits',
		},
		{
			name: 'group_and_one_on_one_learning',
			title: 'Group and One on One learning',
			type: 'boolean',
			fieldset: 'Benefits',
		},
		{
			name: 'super_fast_roi',
			title: 'Super Fast ROI',
			type: 'boolean',
			fieldset: 'Benefits',
		},
		{
			name: 'three_half_days',
			title: 'Three Half Days',
			type: 'boolean',
			fieldset: 'Benefits',
		},
		{
			name: 'expert_professionals',
			title: 'Expert Professionals',
			type: 'boolean',
			fieldset: 'Benefits',
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
			name: 'bonus_takeaways',
			type: 'array',
			title: 'Bonus Takeaways',
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
			name: 'video_embed',
			title: 'Video Embed',
			type: 'string',
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
						},
						{
							name: 'featured',
							type: 'boolean',
							title: 'Featured Testimonial',
							description: 'Check this box if this testimonial should be featured.',
						},
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
			name: 'qualification',
			type: 'string',
			fieldset: 'apprenticeshipOnly',
			title: 'Qualification',
			description: 'If applicable.',
		},
		{
			name: 'level',
			description: 'If applicable',
			fieldset: 'apprenticeshipOnly',
			type: 'string',
			title: 'Level',
		},
	],
};
