export default {
    name: 'policies',
    type: 'document',
    title: 'Policies',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Policy Name'
        },
        {
            name: 'version',
            type: 'string',
            title: 'Policy Version'
        },
        {
            name: 'person_responsible',
            title: 'Person Responsible',
            description: 'Please choose 1',
            type: 'array',
            of: [
              {
                type: 'reference',
                to: [{ type: 'team' }]
              }
            ]
        },
        {
            name: 'pdf_link',
            type: 'string',
            title: 'PDF Link'
        },
        {
            name: 'updated_date',
            type: 'date',
            title: 'Last Update Date'
        },
        {
            name: 'next_review',
            type: 'date',
            title: 'Next Review Date'
        }
    ]
}