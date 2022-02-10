export default {
    name: 'youtubeEmbed',
    title: 'Youtube Embed',
    type: 'object',
    fields: [
        {
            name: 'src',
            type: 'string',
            title: 'Video Source',
            description: 'Enter the url for the video embed'
        },
        {
            name: 'width',
            type: 'string',
            title: 'Video Width',
            description: 'Set at 100% of the container width as default - only set this if you want something other than this. Can use any valid measurement: eg. px, %, em, rem'
        },
        {
            name: 'height',
            type: 'string',
            title: 'Video Height',
            description: 'Set as 500px as default - only change if required. Can use any valid measurement: eg. px, %, em, rem'
        }
    ]


  }