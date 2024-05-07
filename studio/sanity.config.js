import { defineConfig, ScheduleAction } from "sanity";
import {structureTool} from 'sanity/structure';
import {deskTool} from 'sanity/desk';
import schemas from './schemas/schema';
import deskStructure from "./deskStructure";
import { visionTool } from "@sanity/vision";

export default defineConfig({
  title: "production",
  projectId: "wd1bon7z",
  dataset: "production",
  plugins: [
    structureTool({
    structure: deskStructure
    }),
    visionTool(),
  ],
  scheduledPublishing: {
    enabled: true
  },
  schema: {
    types: schemas,
  },
  // document: {
    
 
  //   // prev is the result from previous plugins and thus can be composed
  //   productionUrl: async (prev, context) => {
  //     // context includes the client and other details
  //     const {getClient, dataset, document} = context
  //     const client = getClient({apiVersion: '2023-05-31'})

  //     if (document._type === 'blog') {
  //       const slug = await client.fetch(
  //         `*[_type == 'blog' && _id == $postId][0].slug.current`,
  //         {postId: document._id}
  //       )

  //       console.log(slug);

  //       const params = new URLSearchParams()
  //       params.set('preview', 'true')
  //       params.set('dataset', dataset)

  //       return `https://thecodersguild.org/blog/${slug}?${params}`
  //     }

  //     return prev
  //   }
  // }
});