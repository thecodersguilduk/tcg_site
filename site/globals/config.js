require('dotenv').config();

const config = {
    projectId: process.env.PROJECTID,
    dataset: process.env.DATASET,
    apiVersion: process.env.API_VERSION, // use current UTC date - see "specifying API version"!
    token: process.env.TOKEN,
    useCdn: process.env.USE_CDN
      
};

module.exports = config