import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    vue(),
  ],
  site: 'https://vtaiwan.org', // 替換為您的實際域名
  output: 'static',
  content: {
    collections: ['meetups', 'blog'],
  },
});
