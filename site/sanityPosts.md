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
meta_title: data => data.post.title,
title: data => data.post.title,
featured_image: data => data.post.mainImage,
author: data => data.post.authors[0].name,
excerpt: data => data.post.excerpt,
date: data => data.post.date, 
avatar: data => data.post.avatar[0],
time: data => data.post.time + ' mins ',
permalink: data => `/blog/${data.post.slug.current}/index.html`,
body: data => data.post.body

},
}

---

{{ post.body }}
