<template>
  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    <article 
      v-for="blog in blogs" 
      :key="blog.id"
      class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-2">
          <a :href="`/blogs/${blog.slug}`" class="hover:text-blue-600">
            {{ blog.title }}
          </a>
        </h2>
        <div class="flex items-center space-x-3 mb-4">
          <img 
            v-if="blog.authorPhotoURL" 
            :src="blog.authorPhotoURL" 
            :alt="blog.author"
            class="w-8 h-8 rounded-full"
          />
          <div class="text-sm text-gray-600">
            <div>作者：{{ blog.author }}</div>
            <div>發布日期：{{ blog.date }}</div>
          </div>
        </div>
        <p class="text-gray-700 mb-4">{{ blog.summary }}</p>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in blog.tags" 
            :key="tag"
            class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { database, blogsRef } from '../lib/firebase';
import { onValue } from 'firebase/database';

const blogs = ref([]);

// 改進的 slug 生成函數
const generateSlug = (title) => {
  return encodeURIComponent(title);
};

onMounted(() => {
  console.log('Setting up blogs listener');
  onValue(blogsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // 將物件轉換為陣列，並加入 id 和 slug
      blogs.value = Object.entries(data).map(([id, blog]) => ({
        id,
        slug: generateSlug(blog.title),
        ...blog
      })).sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      blogs.value = [];
    }
    console.log('Blogs updated:', blogs.value);
  });
});
</script> 