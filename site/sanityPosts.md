---js

{
pagination:
{ data: 'posts', size: 1, alias: 'post', addAllPagesToCollections: true },
tags: ['blog'],
layout: 'post',
eleventyComputed: {
title: data => data.post.title,
body: data => data.post.blogPortableText,
featured_image: data => data.post.mainImage,
author: data => data.post.authors[0].name,
excerpt: data => data.post.excerpt,
date: data => data.post.date,
avatar: data => data.post.avatar,
permalink: data => `/blog/${data.post.slug.current}/index.html`

},
}

---{{ post.body }}
