import { defineCollection, z } from 'astro:content';

// 專案集合
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    fullDescription: z.string(),
    status: z.enum(['active', 'completed']),
    startDate: z.string(),
    icon: z.string(),
    color: z.enum(['primary', 'teal', 'amber']),
    category: z.string(),
    participantsCount: z.number().default(0),
    stages: z.array(
      z.object({
        name: z.string(),
        status: z.enum(['completed', 'active', 'upcoming']),
        date: z.string(),
        description: z.string(),
      })
    ),
    team: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        organization: z.string(),
        avatar: z.string(),
      })
    ),
    resources: z.array(
      z.object({
        title: z.string(),
        type: z.enum(['pdf', 'doc', 'link']),
        url: z.string(),
      })
    ),
  }),
});

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

// 常見問題集合
const faqCollection = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string(),
    order: z.number().default(0),
  }),
});

// 頁面集合
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),
  }),
});

// 導出所有集合
export const collections = {
  'projects': projectsCollection,
  'meetups': meetupsCollection,
  'blog': blogCollection,
  'faq': faqCollection,
  'pages': pagesCollection,
};
