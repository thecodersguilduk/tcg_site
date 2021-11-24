export default {
    name: 'applyBtn',
    title: 'Apply Now Button',
    type: 'object',
    initialValue: {
        btnText: 'Apply Now',
        btnLink: 'https://skills-bootcamp-ux.tcg.camp'
    },
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
            description: 'Will link to application form if left blank'
        }
    ]
}