import { defineConfig } from "sanity";
import {deskTool} from 'sanity/desk';
import schemas from './schemas/schema';
import deskStructure from "./deskStructure";
import { visionTool } from "@sanity/vision";
import { tags } from 'sanity-plugin-tags';

export default defineConfig({
  title: "production",
  projectId: "wd1bon7z",
  dataset: "production",
  plugins: [
    deskTool({
    structure: deskStructure
    }),
    visionTool(),
    tags({})
  ],
  schema: {
    types: schemas,
  },
});