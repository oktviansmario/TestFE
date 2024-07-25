<template>
    <div>
      <h1>Categories</h1>
      <ul v-if="!loading && !error">
        <li v-for="category in categories" :key="category.id">
          <router-link :to="`/category/${category.id}`">{{ category.name }}</router-link>
        </li>
      </ul>
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error.message }}</p>
    </div>
  </template>
  
  <script>
  import { useProductStore } from '../stores/productStore';
  import { onMounted } from 'vue';
  
  export default {
    setup() {
      const productStore = useProductStore();
  
      onMounted(() => {
        productStore.fetchCategories();
      });
  
      return {
        categories: productStore.categories,
        loading: productStore.loading, 
        error: productStore.error, 
      };
    }
  };
  </script>
  