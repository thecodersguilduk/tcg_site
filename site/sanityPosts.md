---

{
pagination:
{ data: 'posts', size: 1, alias: 'post', addAllPagesToCollections: true },
tags: ['blog'],
layout: 'post',
eleventyComputed: {
title: data => data.post.title,
description: data => data.post.blogPortableText,

# permalink: data => `/blog/${data.post.slug.current}/index.html`

},
}

---{{ post.body }}
