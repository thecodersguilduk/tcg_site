export default {
    name: 'calendlyEmbed',
    type: 'object',
    title: 'Calendly Embed',
    fields: [
      {
        name: 'calendlyLink',
        type: 'string',
        title: 'Calendly Link',
        description: 'Enter the calendly Link required for the embed',
        options: {
          isHighlighted: true
        },
        initialValue: 'https://calendly.com/tcg-skills/enquiry'
      }
    ]
  }
  