export default {
  name: 'applyBtn',
  title: 'Apply Now Button',
  type: 'object',
  initialValue: {
    btnText: 'Apply Now',
    btnLink: 'https://skills-bootcamp-ux.tcg.camp'
  },
  fieldsets: [
    {name: 'modal', title: 'Modal Details', options: {
      collapsible: true,
      collapsed: false,
    }},
  ],
  fields: [
    {
      name: 'btnText',
      type: 'string',
      title: 'Button Text',
      initialValue: 'Apply Now',
      description: 'Will say Apply now if left blank'
    },
    {
      name: 'btnLink',
      type: 'string',
      title: 'Button Link',
      description: 'Where the button will link to - if you want a modal - leave this blank and fill in the modal section'
    },
    {
      type: 'boolean',
      name: 'isModal',
      description: 'Just confirm this is a modal',
      title: 'Is this button linking to a pop up modal?',
      fieldset: 'modal'
    },
    {
      type: 'string',
      name: 'modalName',
      title: 'Modal Name',
      fieldset: 'modal'
    },
    {
      name: 'style',
      type: 'string',
      options: {
        list: ['inline', 'float-right']
      }
    }
  ]
}