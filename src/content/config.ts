import { defineCollection, z } from 'astro:content';

// 會議集合
const meetupsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    time: z.string(),
    location: z.string(),
    description: z.string(),
    project: z.string(),
    projectUrl: z.string(),
    registrationUrl: z.string().optional(),
    recordingUrl: z.string().optional(),
    summaryUrl: z.string().optional(),
    status: z.enum(['upcoming', 'past']),
  }),
});

// 部落格集合
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string(),
    authorTitle: z.string(),
    category: z.string(),
    excerpt: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
  }),
});

// 導出所有集合
export const collections = {
  'meetups': meetupsCollection,
  'blog': blogCollection,
};
