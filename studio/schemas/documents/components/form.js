export default {
    type: 'object',
    name: 'form',
    title: 'Contact Form',
    initialValue: {
        title: 'Send us a message',
        action: 'https://formspree.io/f/mknqeplz'
    },
    fields: [
        {
            title: 'title',
            type: 'string',
            name: 'title'
        },
        {
            title: 'Form Action',
            type: 'string',
            name: 'action',
            description: 'Controls how the form data is handled - if unsure leave as default'
        }
    ],

}