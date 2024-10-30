const blocksToHtml = require('@sanity/block-content-to-html');
const h = blocksToHtml.h;
const imageUrlBuilder = require('@sanity/image-url');
const sanityClient = require('@sanity/client');
const config = require('../globals/config');

const query = `*[_type == "course" && isActive && !(_id in path("drafts.**"))] {
    ...,
    courseType[]->{courseType},
    "featuredImage": {
		"url": featuredImage.asset->url,
		"alt": featuredImage.alt,
		"license": featuredImage.license,
		"licenseUrl": featuredImage.licenseUrl,
		"licenseSite": featuredImage.licenseSite
	},
    courseTopics[]->{name},
    duration[]->{name},
    trainers[]->{...},
    logos[]->{logo, partnerName},
    instances[] {
      date,
      description
    },
	benefits[]->{
		'title': title,
		'image': image.asset->url
	},
    "testimonials": testimonials[]->{
		'testimonial': testimonial,
		'avatar': avatar.asset->url,
		'client': client,
		'occupation': occupation
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

	data.content = [];
	const dataContentFields = ['who_is_this_for', 'what_you_will_get', 'course_outline', 'course_breakdown', 'delivery', 'pre_requisites', 'bonus_takeaways'];

	dataContentFields.forEach(field => {
		if (data[field]) {
            data.content.push({
                [field]: blocksToHtml({
                    blocks: data[field],
                    serializers: serializers,
                })
            });
        }
	});
	

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

		data.featuredImage.url = data.featuredImage.url
		? {
			small: urlFor(data.featuredImage.url).width(500).url(), // Small image for smaller screens
			medium: urlFor(data.featuredImage.url).width(972).url(), // Medium image for medium screens
			large: urlFor(data.featuredImage.url).width(1500).url() // Large image for larger screens
		  }
		: {
			small: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', // Fallback small image
			medium: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=972&q=60', // Fallback medium image
			large: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60' // Fallback large image
		  };

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
			testimonial.avatar = urlFor(testimonial.avatar).width(350).height(420).url();
		});
	}

	data.tags = data.tags ? data.tags.map((tag) => tag.value) : [];

	data.partners = data.logos ? data.logos.map((logo) => logo.partnerName) : [];

	data.logos = data.logos
		? data.logos.map((logo) => urlFor(logo.logo).width(200).url())
		: [];

	data.isFunded = data.logos.length > 0;

	data.ctaText = data.ctaText ? data.ctaText : 'Apply Now';

	data.formLink = data.formLink ? data.formLink : '#contact';

	//console.log(data.featuredImage);

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
