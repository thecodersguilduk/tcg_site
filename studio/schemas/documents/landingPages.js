import { type } from "jquery";
import faqsItem from "./faqsItem";

export default {
    name: 'landingPages',
    title: 'Landing Pages',
    type: 'document',
    fields: [
        {
            name: 'meta_title',
            title: 'Meta Title', 
            type: 'string'
        },
        {
            name: 'meta_description',
            title: 'Meta Description',
            type: 'string'
        },
        {
            name: 'h1',
            title: 'Page Title',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'h1',
                maxLength: 96
            }
        },
        {
            name: 'hero_copy',
            title: 'Hero Copy',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ]
        },
        {
            name: 'intro_copy',
            title: 'Intro Copy',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ]
        },
        {
            name: 'featured_image',
            title: 'Featured Image',
            type: 'image',
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string'
                }
            ]
        },
        {
            name: 'main_copy',
            title: 'Main Copy',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ]
        },
        {
            name: 'blogPosts',
            title: 'Blogs',
            type: 'array',
            of: [
                { type: 'reference',
                    to: [{ type: 'blog' }]
                 }
            ]
        },
        {
            name: 'courses',
            title: 'Courses',
            type: 'array',
            of: [
                { type: 'reference', to: [{ type: 'course'}]}
            ]
        },
        {
            name: 'trainers',
            title: 'Trainers',
            type: 'array',
            of: [
                { type: 'reference', to: [{ type: 'team' }]}
            ]
        },
        {
            name: 'testimonials',
            title: 'Testimonials',
            type: 'array',
            of: [
                {type: 'reference', to: [{ type: 'testimonial'}]}
            ]
        },
        {
            name: 'faqs',
            title: 'FAQ\'s',
            type: 'array',
            of: [
                { type: 'faqItem' }
            ]
        }
    ]
}