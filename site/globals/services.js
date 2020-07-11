require('dotenv').config();
const axios = require('axios');

module.exports = async function() {
  try {
    const {data} = await axios.get(`${process.env.STRAPI_API}/services`, {
      headers: {
        Authorization:
          `Bearer ${process.env.TOKEN}`,
      },
    });
    console.log(data);
  } catch (err) {
    console.error(err)
  }
};