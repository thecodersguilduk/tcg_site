---js

{
pagination:
{ data: 'posts', size: 1, alias: 'post', addAllPagesToCollections: true },
tags: ['blog'],
layout: 'post',
eleventyComputed: {
title: data => data.post.title,
body: data => data.post.blogPortableText,
featuredImage: data => `data.post.mainImage.asset.\_ref`,
author: data => data.post.authors['name'],
excerpt: data => data.post.excerpt,
date: data => data.post.date,
avatar: data => data.post.authors.image,
permalink: data => `/blog/${data.post.slug.current}/index.html`

},
}

---{{ post.body }}
