const sanityClient = require('@sanity/client')
const config = require('../globals/config');
const client = sanityClient(config)

module.exports = client

