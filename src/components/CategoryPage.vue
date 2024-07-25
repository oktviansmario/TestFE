<template>
    <!-- Display for Category Page -->
    <div>
      <h1>{{ category?.name }}</h1>
      <h2>Subcategories</h2>
      <ul>
        <li v-for="subcategory in category?.subcategories" :key="subcategory.id">
          {{ subcategory.name }}
        </li>
      </ul>
      <h2>Products</h2>
      <ul>
        <li v-for="product in category?.products" :key="product.id">
          {{ product.name }} - {{ product.price }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useProductStore } from '../stores/productStore';
  import { onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const productStore = useProductStore();
      const route = useRoute();
      const categoryId = route.params.id;
  
      onMounted(() => {
        productStore.fetchCategories();
      });
  
      const category = computed(() =>
        productStore.categories.find(cat => cat.id === categoryId) // Search through categories array and return after the condition provided
      );
  
      return {
        category,
      };
    }
  };
  </script>
  