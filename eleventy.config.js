const htmlmin = require("html-minifier")
const Image = require('@11ty/eleventy-img');
const path = require('path');

async function imageShortcode(src, alt) {
    let sizes = "(min-width: 1024px) 100vw, 50vw"
    // let srcPrefix = `./src/img/`
    // src = srcPrefix + src
    //console.log(`Generating image(s) from:  ${src}`)
    if(alt === undefined) {
      // Throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`)
    }
    let metadata = await Image(src, {
      widths: [400, 600, 900, 1500],
      formats: ['webp', 'jpeg'],
      urlPath: "./img/",
      outputDir: "./dist/images/",
      /* =====
      Now we'll make sure each resulting file's name will
      make sense to you. **This** is why you need
      that `path` statement mentioned earlier.
      ===== */
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src)
        const name = path.basename(src, extension)
        return `${name}-${width}w.${format}`
      }
    })
    let lowsrc = metadata.jpeg[0]
    //console.log(lowsrc);
    let highsrc = metadata.jpeg[metadata.jpeg.length - 1]
    return `<picture>
      ${Object.values(metadata).map(imageFormat => {
        return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`
      }).join("\n")}
      <img
        src="${lowsrc.url}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`
  }

module.exports = eleventyConfig => {
  //add image shortcode
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

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
