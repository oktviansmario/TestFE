<template>
    <!-- Display for Product Page -->
    <div>
      <h1>Product: {{ product.name }}</h1>
      <p>Price: {{ product.price }}</p>
      <button @click="editProduct">Edit Product</button>
      <button @click="deleteProduct">Delete Product</button>
  
      <div v-if="isEditing">
        <h2>Edit Product</h2>
        <form @submit.prevent="updateProduct">
          <label for="name">Name:</label>
          <input v-model="productForm.name" type="text" id="name" />
  
          <label for="price">Price:</label>
          <input v-model="productForm.price" type="number" id="price" />
  
          <button type="submit">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProductStore } from '../stores/productStore';
  
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
      const productStore = useProductStore();
      const productId = route.params.id;
      const isEditing = ref(false);
      const productForm = ref({
        name: '',
        price: 0,
      });
  
      onMounted(() => {
        productStore.fetchCategories(); // Ensure categories and products are fetched
      });
  
      const product = computed(() =>
        productStore.categories.flatMap(cat => cat.products).find(prod => prod.id === productId) // Mapping products array from each category, and also combine products array into a single array of products
      );
  
      const editProduct = () => {
        isEditing.value = true;
        productForm.value = { ...product.value };
      };
  
      const updateProduct = async () => {
        await productStore.updateProduct(productId, productForm.value);
        isEditing.value = false;
      };
  
      const deleteProduct = async () => {
        await productStore.deleteProduct(productId);
        router.push('/');
      };
  
      const cancelEdit = () => {
        isEditing.value = false; // Cancel editing 
      };
  
      return {
        product,
        isEditing,
        productForm,
        editProduct,
        updateProduct,
        deleteProduct,
        cancelEdit,
      };
    },
  };
  </script>
  