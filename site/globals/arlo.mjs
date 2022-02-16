import fetch from 'node-fetch'

async function getData(){
    const base = 'http://tcg.arlo.co/api/auth/resources/eventtemplates/'
    const templates = 'http://tcg.arlo.co/api/2012-02-01/pub/resources/eventtemplatesearch/'
    try {
        const data = fetch(templates)
        .then(data => data.json())
        .then(data => console.log(data.Items))
    } catch (error) {
        console.log(error);
    }


}

getData()