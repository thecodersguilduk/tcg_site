const htmlmin = require("html-minifier")
const Image = require('@11ty/eleventy-img');
const path = require('path');

async function imageShortcode(src, alt, classNames) {
  let sizes = "(min-width: 1024px) 100vw, 50vw"
  let classes = [classNames]
  //console.log(`Generating image(s) from:  ${src}`)
  if (alt === undefined) {
    // Throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`)
  }
  let metadata = await Image(src, {
    widths: [null],
    formats: ['webp'],
    urlPath: "./images/",
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
  let lowsrc = metadata.webp[0]
  //console.log(lowsrc);
  let highsrc = metadata.webp[metadata.webp.length - 1]
  return `<picture>
      ${Object.values(metadata).map(imageFormat => {
    return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`
  }).join("\n")}
      <img
        src="${lowsrc.url}"
        alt="${alt}"
        loading="lazy"
        decoding="async"
        class="${classes}">
    </picture>`
}

module.exports = eleventyConfig => {

  //add shortcode to change image formats to webp or jpeg
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  //
  eleventyConfig.addFilter("courseDisplay", require("./filters/courseNames.js"))

  eleventyConfig.addFilter("underscore", require("./filters/underscore.js"))

  // Add a readable date formatter filter to Nunjucks
  eleventyConfig.addFilter("dateDisplay", require("./filters/dates.js"))

  // Add a HTML timestamp formatter filter to Nunjucks
  eleventyConfig.addFilter("htmlDateDisplay", require("./filters/timestamp.js"))

  //add capitalize functtion to nunjucks
  eleventyConfig.addFilter('capitalize', function (string) {
    const wordsArray = string.split(" ");

    for (let i = 0; i < wordsArray.length; i++) {
      wordsArray[i] = wordsArray[i][0].toUpperCase() + wordsArray[i].substr(1);
    }

    return wordsArray.join(" ");
  });

  eleventyConfig.addFilter('join', function (string) {
    return string.replace(/\s+/g, '-').toLowerCase();
  });

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

  eleventyConfig.addFilter('log', function (value) {
    return console.log(value)
  })
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

  eleventyConfig.addCollection('courses', collection => {
    let courses = collection.getFilteredByTag('course');

    return courses
  })

  eleventyConfig.addCollection('apprentice-vacancies', collection => {
    let jobs = collection.getFilteredByTag('apprentice-vacancies');

    return jobs
  })

  // Layout aliases
  eleventyConfig.addLayoutAlias('default', 'layouts/default.njk')
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')
  eleventyConfig.addLayoutAlias('thank-you', 'layouts/thank-you.njk')
  eleventyConfig.addLayoutAlias('course', 'layouts/course.njk')
  eleventyConfig.addLayoutAlias('candidate', 'layouts/candidate.njk')
  eleventyConfig.addLayoutAlias('employer', 'layouts/employer.njk')
  eleventyConfig.addLayoutAlias('jobAdSingle', 'layouts/jobAdSingle.njk')
  eleventyConfig.addLayoutAlias('internalAd', 'layouts/internaljobapp.njk')
  eleventyConfig.addLayoutAlias('hub', 'layouts/hub.njk')


  // Include our static assets
  eleventyConfig.addPassthroughCopy("css")
  eleventyConfig.addPassthroughCopy("js")
  eleventyConfig.addPassthroughCopy("images")
  eleventyConfig.addPassthroughCopy("pdf")
  eleventyConfig.addPassthroughCopy("admin")
  eleventyConfig.addPassthroughCopy("robots.txt")
  eleventyConfig.addPassthroughCopy("_redirects")

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

