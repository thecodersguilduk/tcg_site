export default {
    name: 'callModal',
    title: 'Modal - Book a call',
    type: 'object',
    initialValue: {
        title: 'Book a Call',
        modalType: 'data-modal="book-a-call"'
    },
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
            description: 'Default value is Book a call'
        },
        {
            name: 'modalType',
            type: 'string',
            title: 'Modal Type',
            hidden: false
        }
    ]
}