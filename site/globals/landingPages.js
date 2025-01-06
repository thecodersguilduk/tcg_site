const blocksToHtml = require('@sanity/block-content-to-html');
const h = blocksToHtml.h;
const imageUrlBuilder = require('@sanity/image-url');
const sanityClient = require('@sanity/client');
const config = require('../globals/config');

const query = `*[_type == "landingPages" && !(_id in path("drafts.**"))] {
    ...,
    "featuredImage": {
        "src": featured_image.asset->url,
        "alt": featured_image.alt
    },
    trainers[]->{
        name, 
        occupation, 
        "image": image.asset->url, 
        github, 
        linkedin
    },
    courses[]->{
        title, 
        "featuredImage": { 
            "src": featuredImage.asset->url, 
            "alt": featuredImage.alt 
        }, 
        "slug": slug.current, 
        "nextStart": instances[0].date,
		courseType[]->{courseType},
    },
    testimonials[]->{
        "avatar": avatar.asset->url,
        client,
        testimonial,
        occupation
    },
	blogPosts[]->{
		title,
		slug,
		"mainImage": mainImage.asset->url,
		authors[]->{name},
		excerpt,
		"avatar": authors[]->image.asset->url,
		publishedAt,
		"tags": categories[]->{name},
		time
	},

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

	

    data.hero_copy = blocksToHtml({
        blocks: data.hero_copy,
        serializers: serializers
    })

    data.intro_copy = blocksToHtml({
        blocks: data.intro_copy,
        serializers: serializers
    })

    data.main_copy = blocksToHtml({
        blocks: data.main_copy,
        serializers: serializers
    })

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
