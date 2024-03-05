export default {
    name: 'hubPages',
    type: 'document',
    title: 'Hub Pages',
    fields: [
        {
            name: 'isActive',
            type:'boolean',
            description: 'Does this need to display on the website?',
            title: 'isActive',
        },
        {
            name: 'name',
            type:'string',
            description: 'Hub Location/Title',
            title: 'Name',
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            description: 'Auto generate this by clicking the button',
            options: {
                source: 'name',
            },
            maxLength: 96,
        },
        {
            name: 'funders',
            type: 'array',
            title: 'Funders or Partners',
            of: [{type: 'reference', to: {type: 'coursePartners'}}],
        },
        {
            name: 'Courses',
            type: 'array',
            title: 'Courses',
            of: [{type: 'reference', to: {type: 'course'}}],
        }
    ]
}