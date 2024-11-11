// schemas/faqItem.js
export default {
    name: 'faqItem',
    title: 'FAQ Item',
    type: 'object',
    fields: [
      {
        name: 'question',
        title: 'Question',
        type: 'string',
        validation: Rule => Rule.required().min(10).warning('The question should be clear!')
      },
      {
        name: 'answer',
        title: 'Answer',
        type: 'text',
        validation: Rule => Rule.required().min(20).warning('The answer should be informative!')
      }
    ]
  }
  