export default {
    name: 'testimonial',
    type: 'document',
    title: 'Testimonial',
    fields: [
        {
            name: 'client',
            type: 'string',
            title: 'Client Name'
        },
        {
            name: 'occupation',
            type: 'string',
            title: 'Client job title and company'
        },
        {
            name: 'testimonial',
            type: 'text',
            title: 'Testimonial body'
        },
        {
            name: 'avatar',
            type: 'image',
            title: 'Avatar'
        }
    ]
}