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
    },
    {
      name: 'salary',
      title: 'Salary',
      type: 'string'
    },
    {
      name: 'desiredSkills',
      title: 'Desired Skills',
      type: 'string'
    },
    {
      name: 'personalQualities',
      title: 'Personal Qualities',
      type: 'string'
    },
    {
      name: 'trainingProvided',
      title: 'Training to be Provided',
      type: 'string'
    },
    {
      name: 'support',
      title: 'How we will support you as an apprentice',
      type: 'string'
    }
  ]
}