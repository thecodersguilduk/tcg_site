---js

{
pagination:
{ data: 'posts', size: 1, alias: 'post', addAllPagesToCollections: true },
layout: 'post',
eleventyComputed: {
tags: data => {
    const arr = ['blog'];
    const categories = data.post.categories;

    categories.forEach(cat => {
        arr.push(cat.name);
    })

    return arr;
},
title: data => data.post.title,
featured_image: data => data.post.mainImage,
author: data => data.post.authors[0].name,
excerpt: data => data.post.excerpt,
date: data => {
    const fullDate = data.post.publishedAt; <!-- YYYY-MM-DD format -->
    return fullDate.split('T')[0];
}, 
avatar: data => data.post.avatar[0],
time: data => data.post.time + ' mins ',
permalink: data => `/blog/${data.post.slug.current}/index.html`

},
}

---{{ date }}

