import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
  ],
  site: 'https://vtaiwan.org', // 替換為您的實際域名
  output: 'static',
});
