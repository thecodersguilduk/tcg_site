const blocksToHtml = require('@sanity/block-content-to-html')
const h = blocksToHtml.h
const imageUrlBuilder = require('@sanity/image-url')
const sanityClient = require('@sanity/client')
const config = require('../globals/config');

const query = `*[_type == "vacancies" && isActive && !(_id in path("drafts.**"))] {
    ...,
    location[]->{name},
    questions[]->{...}
} | order(_createdAt desc)`

module.exports = async function () {
    // Fetches data
    const client = sanityClient(config)
    const data = await client.fetch(query)

    // Modifies the data to fit our needs
    const preppedData = data.map(prepPost)

    // returns this to the 11ty data cascade
    return preppedData
}

// This is mostly Sanity specific, but is a good function idea for preparing data
function prepPost(data) {

    data.closingDate = dateDisplay(data.closingDate) || 'Ongoing'

    return data
}

function urlFor(source) {
const imageBuilder = imageUrlBuilder(sanityClient(config));
return imageBuilder.image(source);
}

function dateDisplay(date, part) {
    if(!date) return
    var d = new Date(date);
    if(part == 'year') {
      return d.getUTCFullYear();
    }
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var ordinal = {
      1 : "st",
      2 : "nd",
      3 : "rd",
      21 : "st",
      22 : "nd",
      23 : "rd",
      31 : "st"
    };
    return d.getDate() + (ordinal[d.getDate()] || "th") + " " + month[d.getMonth()] + ", " + d.getUTCFullYear();
  }
