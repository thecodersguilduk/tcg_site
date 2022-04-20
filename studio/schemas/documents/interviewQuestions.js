export default {
    name: 'interviewQuestions',
    type: 'document',
    title: 'Interview Questions',
    fields: [
      {
        name: 'questionName',
        type: 'string',
        title: 'Question Name',
        description: 'Pick out two keywords from the question - this is what will be used in the data store to head the column.'
      },
      {
        name: 'question',
        type: 'string',
        title: 'Question'
      },
      {
        name: 'help',
        type: 'string',
        title: 'Helpful hint',
        description: 'A common one is more than 50 words but less than 250 words please on answers that require more detail'
      },
      {
        name: 'inputType',
        type: 'string',
        title: 'Input Type',
        description: 'How would you like your answer? Text, email, A list of options, Multiple select checkboxes, Single select radio button or textarea',
        options: {
          list: [
            {title: 'Text', value: 'text'},
            {title: 'Email', value: 'email'},
            {title: 'Dropdown List of Options', value: 'select'},
            {title: 'Multiple Select Checkboxes', value: 'checkbox'},
            {title: 'Single Select Checkboxes', value: 'radio'},
            {title: 'Text Area (longer answers)', value: 'textarea'},
          ]
        }
      },
      {
        title: 'Options',
        name: 'options',
        type: 'array',
        of: [{type: 'string'}],
        description: 'Enter select/checkbox options here',
        hidden: ({document}) => document?.inputType !== 'select' && document?.inputType !== 'checkbox' && document?.inputType !== 'radio'
      }
    ]
  }
