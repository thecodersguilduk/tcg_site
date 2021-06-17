---

{
pagination:
{ data: 'posts', size: 1, alias: 'post', addAllPagesToCollections: true },
tags: ['blog'],
layout: 'post',
eleventyComputed: {
author: post.data.authors,
excerpt: data => data.post.excerpt,
date: '2021-05-02',

# permalink: data => `/blog/${data.post.slug.current}/index.html`

},
}

---{{ post.body }}
