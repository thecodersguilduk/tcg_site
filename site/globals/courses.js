const blocksToHtml = require('@sanity/block-content-to-html');
const h = blocksToHtml.h;
const imageUrlBuilder = require('@sanity/image-url');
const sanityClient = require('@sanity/client');
const config = require('../globals/config');

const query = `*[_type == "course" && !(_id in path("drafts.**"))] {
    ...,
    courseType[]->{courseType},
    "featuredImage": featuredImage.asset->url,
    courseTopics[]->{name},
    duration[]->{name},
    trainers[]->{...},
    logos[]->{logo, partnerName},
    instances[] {
      date,
      description
    },
    coursePortableText,
    "testimonials": testimonials[]{
		"client": item->client,
		"testimonial": item->testimonial,
		"featured": featured,
		"avatar": item->avatar.asset->url,
		"occupation": item->occupation
	   },
	"featuredTestimonial": {
		"occupation": featuredTestimonial->.occupation,
		"_id": featuredTestimonial->_id,
	  "client": featuredTestimonial->client,
		"testimonial": featuredTestimonial->.testimonial,
		"avatar": featuredTestimonial->avatar.asset->url
	  }
} | order(start asc)`;

module.exports = async function () {
	// Fetches data
	const client = sanityClient(config);
	const data = await client.fetch(query);

	// Modifies the data to fit our needs
	const preppedData = data.map(prepPost);

	// returns this to the 11ty data cascade
	return preppedData;
};

// This is mostly Sanity specific, but is a good function idea for preparing data
function prepPost(data) {
	if (data.trainers) {
		data.trainers.forEach((trainer) => {
			trainer.image = urlFor(trainer.image).width(350).url();
		});
	}

	if (data.excerpt) {
		data.excerpt = blocksToHtml({
			blocks: data.excerpt,
			serializers: serializers,
		});
	}

	if (data.who_is_this_for) {
		data.who_is_this_for = blocksToHtml({
			blocks: data.who_is_this_for,
			serializers: serializers,
		});
	}

	if (data.what_you_will_get) {
		data.what_you_will_get = blocksToHtml({
			blocks: data.what_you_will_get,
			serializers: serializers,
		});
	}

	if (data.course_outline) {
		data.course_outline = blocksToHtml({
			blocks: data.course_outline,
			serializers: serializers,
		});
	}

	if (data.course_breakdown) {
		data.course_breakdown = blocksToHtml({
			blocks: data.course_breakdown,
			serializers: serializers,
		});
	}

	if (data.delivery) {
		data.delivery = blocksToHtml({
			blocks: data.delivery,
			serializers: serializers,
		});
	}

	if (data.pre_requisites) {
		data.pre_requisites = blocksToHtml({
			blocks: data.pre_requisites,
			serializers: serializers,
		});
	}

	if (data.bonus_takeaways) {
		data.bonus_takeaways = blocksToHtml({
			blocks: data.bonus_takeaways,
			serializers: serializers,
		});
	}

	if (data.instances) {
		data.instances = data.instances.map((instance) => {
			if (instance.description) {
				instance.description = blocksToHtml({
					blocks: instance.description,
					serializers: serializers,
				});
			}
			return instance;
		});
	}

	data.courseType = data.courseType
		? data.courseType[0].courseType
		: 'Get Ahead';

	data.courseItemImage = data.featuredImage
		? urlFor(data.featuredImage).width(500).url()
		: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

	data.featuredImage = data.featuredImage
		? urlFor(data.featuredImage).width(530).height(353).url()
		: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

	data.start = data.instances ? data.instances[0].date : 'TBC';

	if (data.duration) {
		data.duration = data.duration.map((item) => item.name);
	} else {
		data.duration = 'Ongoing';
	}

	if (data.location) {
		data.location = data.location[0];
	}

	if (data.testimonials) {
		data.testimonials.forEach((testimonial) => {
			testimonial.avatar = urlFor(testimonial.avatar).url();
		});
	}

	data.partners = data.logos ? data.logos.map((logo) => logo.partnerName) : [];

	data.logos = data.logos
		? data.logos.map((logo) => urlFor(logo.logo).width(200).url())
		: [];

	data.isFunded = data.logos.length > 0;

	return data;
}

function urlFor(source) {
	const imageBuilder = imageUrlBuilder(sanityClient(config));
	return imageBuilder.image(source);
}

// This is a way of converting our custom blocks from Portable Text to html
const serializers = {
	// Creates the code blocks how html and 11ty want them
	types: {
		code: (node) =>
			h('pre', { className: node.node.language }, h('code', node.node.code)),
		imageSection: ({ node: { asset, width } }) =>
			h('img', {
				src: urlFor(asset).width().url(),
				className: 'inline',
			}),
		applyBtn: ({ node: { btnText, btnLink, style, isModal, modalName } }) => {
			function modalNameGenerator(str) {
				if (!str) return '';

				return str.replace(/\s+/g, '-').toLowerCase();
			}

			let classes;
			if (style === 'float-right') {
				classes =
					'inline bg-gradient-to-r from-blue-200 to-blue-100 px-6 py-4 text-white rounded my-6 w-6/12 font-bold float-right';
			} else {
				classes =
					'inline bg-gradient-to-r from-blue-200 to-blue-100 px-6 py-4 text-white rounded my-6 w-6/12 font-bold';
			}

			if (isModal) classes += `${modalName}-c-btn`;

			const rightArrow =
				'<i class="align-middle ml-2 text-white fas fa-angle-right text-md leading-md" aria-hidden="true"></i>';
			if (isModal) {
				return h('a', {
					href: '',
					className: classes,
					innerHTML: btnText + rightArrow,
					style: 'color: white',
					'data-modal': modalNameGenerator(modalName),
				});
			} else {
				return h('a', {
					href: btnLink ? btnLink : '',
					className: classes,
					innerHTML: btnText + rightArrow,
					style: 'color: white;',
				});
			}
		},
		break: (node) => {
			if (node.node.style === 'break')
				return h('hr', { style: 'border-color: #2574a9;' });
		},
		youtubeEmbed: (node) =>
			h('iframe', {
				src: node.node.src,
				width: node.node.width || '100%',
				height: node.node.height || '500px',
			}),
	},
};
