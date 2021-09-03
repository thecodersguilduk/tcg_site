export default {
  name: 'ApprenticeJobAd',
  type: 'document',
  title: 'Apprentice Job Post',
  fields: [
    {
      name: 'employerLogo',
      title: 'Employer Logo',
      type: 'file'
    },
    {
      name: 'employerName',
      title: 'Employer Name',
      type: 'string'
    },
    {
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'jobDescription',
      title: 'Job Description',
      type: 'string'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string'
    },
    {
      name: 'qualification',
      title: 'Qualification',
      type: 'string'
    }
  ]
}