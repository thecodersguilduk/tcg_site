const htmlmin = require("html-minifier")

module.exports = eleventyConfig => {

  // Add a readable date formatter filter to Nunjucks
  eleventyConfig.addFilter("dateDisplay", require("./filters/dates.js"))

  // Add a HTML timestamp formatter filter to Nunjucks
  eleventyConfig.addFilter("htmlDateDisplay", require("./filters/timestamp.js"))

  // Add a limit filter for collections to Nunjucks 
  eleventyConfig.addFilter('limit', function (array, limit) {
    return array.slice(0, limit);
  });

  // Skips first post with limit
  eleventyConfig.addFilter('skipFirst', function (array, limit) {
    return array.slice(1, limit);
  });

  // Minify our HTML
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
      return minified
    }
    return content
  })

  // Collections
  eleventyConfig.addCollection('blog', collection => {

    let blogs = collection.getFilteredByTag('blog')

    for (let i = 0; i < blogs.length; i++) {

      const prevPost = blogs[i - 1]
      const nextPost = blogs[i + 1]

      blogs[i].data["prevPost"] = prevPost
      blogs[i].data["nextPost"] = nextPost

    }

    const blogsWithUpdatedDates = blogs.map(blog => {
      // If the item has a data.post object (from external Data)
      // Then set a new date based on the date property
      // Else return the original date (takes care of the Markdown)
      blog.date = blog.data.post ? new Date(blog.data.post.date) : blog.date
      return blog
    })
    // Now we need to re-sort based on the date (since our posts keep their index in the array otherwise)
    blogs = blogsWithUpdatedDates.sort((a, b) => b.date - a.date)
    // Make sortedPosts the array for the collection

    return blogs;
  })

  // Layout aliases
  eleventyConfig.addLayoutAlias('default', 'layouts/default.njk')
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')
  eleventyConfig.addLayoutAlias('thank-you', 'layouts/thank-you.njk')
  eleventyConfig.addLayoutAlias('jobAdSingle', 'layouts/jobAdSingle.njk')


  // Include our static assets
  eleventyConfig.addPassthroughCopy("css")
  eleventyConfig.addPassthroughCopy("js")
  eleventyConfig.addPassthroughCopy("images")
  eleventyConfig.addPassthroughCopy("pdf")
  eleventyConfig.addPassthroughCopy("admin")
  eleventyConfig.addPassthroughCopy("robots.txt")

  return {
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,

    dir: {
      input: 'site',
      output: 'dist',
      includes: 'includes',
      data: 'globals'
    }
  }

}
