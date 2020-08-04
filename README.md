# tcg_site

Website for The coders guild built with 11ty SSG and Tailwind CSS

## Requirements

Node version >= 8.9.0

## Installation

```
npm install
```

To start local development server, run `npm run dev`. 
Eleventy has hot reloading baked in and will automatically watch your template files for changes. Mix will watch any changes to the JS and SCSS files.

To minify scripts and styles run `npm run production`.

## Structure

All templates, components, scripts and content are conatined in `site` folder. 
Uncompiled SCSS and JS lives in `resources`; parsed HTML can be found in `dist`.

## Configuration

This repo is using Tailwid CSS framework and Skeleventy boilerplate.
Configuration for both is found inside `site`:

Configuration for Skeleventy - `eleventy.config.js`;
Configuration for Tailwind - `tailwind.config.js`









