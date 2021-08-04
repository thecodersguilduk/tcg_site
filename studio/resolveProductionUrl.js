export default function resolveProductionUrl(document) {
    console.log(document)
    return `https://thecodersguild.org.uk/blog/${document.slug.current}`
  }