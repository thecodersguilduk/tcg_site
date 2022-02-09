require('dotenv').config();

const config = {
  projectId: process.env.PROJECTID,
  dataset: process.env.DATASET,
  apiVersion: process.env.API_VERSION,
  token: process.env.TOKEN, //'sk5wgUiW1yj5HqoLWUNWucS0DuWdacfPBw83aFoFaAGJFnQL6wDRlSCJ5Xg1Nua5EHPqZ0UjC5N6gMmzKrYyXE9DbEFzJWagHQ20oSYclK9AxsjcmwbkzzzEWpJrvSO10xEevDS0AULCa9lfz8u22NM18R3sh0R84aTWCNq36kq1f5Pt8jra',
  useCdn: false

};

module.exports = config