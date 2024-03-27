const config = require('../globals/config');
const imageUrlBuilder = require('@sanity/image-url');
const sanityClient = require('@sanity/client');
const query = `*[_type == "team" && governor && !(_id in path("drafts.**"))] {
    "image": image.asset->url,
    ...
} | order(order asc)`

module.exports = async function () {
  // Fetches data
  const client = sanityClient(config)
  const data = await client.fetch(query)

  // Modifies the data to fit our needs
  const preppedData = data.map(prepPost)
  // returns this to the 11ty data cascade
  return preppedData
}

function urlFor(source) {
  const imageBuilder = imageUrlBuilder(sanityClient(config));
  return imageBuilder.image(source);
}

// This is mostly Sanity specific, but is a good function idea for preparing data
function prepPost(data) {
  // Returns back to our main function
  data.image = urlFor(data.image).width(200).height(200).url();
  data.github = data.github ? 'https://www.github.com/' + data.github : ''
  data.twitter = data.twitter ? 'https://www.twitter.com/' + data.twitter : ''
  data.linkedin = data.linkedin ? 'https://www.linkedin.com/in/' + data.linkedin : ''

  return data
}