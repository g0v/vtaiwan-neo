<template>
  <div>
    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">載入中...</p>
    </div>
    <div v-else-if="!blog" class="text-center py-8">
      <p class="text-gray-600">找不到這篇文章</p>
      <p class="text-sm text-gray-500 mt-2">當前 slug: {{ currentSlug }}</p>
      <p class="text-sm text-gray-500">可用文章:</p>
      <ul class="text-sm text-gray-500 mt-2">
        <li v-for="availableBlog in availableBlogs" :key="availableBlog.id">
          {{ availableBlog.title }} -> {{ availableBlog.slug }}
        </li>
      </ul>
      <a href="/blogs" class="text-blue-600 hover:underline">返回部落格列表</a>
    </div>
    <article v-else class="bg-white rounded-lg shadow-md p-8">
      <header class="mb-8">
        <h1 class="text-4xl font-bold mb-4">{{ blog.title }}</h1>
        <div class="flex items-center space-x-3 mb-4">
          <img 
            v-if="blog.authorPhotoURL" 
            :src="blog.authorPhotoURL" 
            :alt="blog.author"
            class="w-10 h-10 rounded-full"
          />
          <div class="text-gray-600">
            <span class="mr-4">作者：{{ blog.author }}</span>
            <span>發布日期：{{ blog.date }}</span>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mb-6">
          <span 
            v-for="tag in blog.tags" 
            :key="tag"
            class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {{ tag }}
          </span>
        </div>
      </header>
      
      <div class="prose prose-lg max-w-none">
        <p class="text-xl text-gray-700 mb-8">{{ blog.summary }}</p>
        <div class="whitespace-pre-line">{{ blog.content }}</div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { database, blogsRef } from '../lib/firebase';
import { onValue } from 'firebase/database';

const blog = ref(null);
const loading = ref(true);
const currentSlug = ref('');
const availableBlogs = ref([]);

// 改進的 slug 生成函數
const generateSlug = (title) => {
  return encodeURIComponent(title);
};

// 獲取當前 URL 的 slug
const getSlug = () => {
  const path = window.location.pathname;
  const slug = decodeURIComponent(path.split('/').pop());
  console.log('Current slug:', slug);
  currentSlug.value = slug;
  return slug;
};

// 根據 slug 找到對應的文章
const findBlogBySlug = (blogs, slug) => {
  console.log('Looking for slug:', slug);
  console.log('Available blogs:', blogs);
  
  const blogEntries = Object.entries(blogs);
  availableBlogs.value = blogEntries.map(([id, blog]) => ({
    id,
    title: blog.title,
    slug: generateSlug(blog.title)
  }));
  
  console.log('Available blog slugs:', availableBlogs.value);
  
  return blogEntries.find(([id, blog]) => {
    const blogSlug = generateSlug(blog.title);
    const encodedSlug = encodeURIComponent(slug);
    console.log(`Comparing "${blogSlug}" with "${encodedSlug}"`);
    return blogSlug === encodedSlug;
  });
};

onMounted(() => {
  console.log('BlogDetail component mounted');
  const slug = getSlug();
  
  onValue(blogsRef, (snapshot) => {
    const blogs = snapshot.val();
    console.log('Received blogs data:', blogs);
    
    if (blogs) {
      const found = findBlogBySlug(blogs, slug);
      if (found) {
        const [id, blogData] = found;
        blog.value = { id, ...blogData };
        console.log('Found blog:', blog.value);
      } else {
        console.log('Blog not found for slug:', slug);
        blog.value = null;
      }
    } else {
      console.log('No blogs found');
      blog.value = null;
    }
    loading.value = false;
  });
});
</script> 