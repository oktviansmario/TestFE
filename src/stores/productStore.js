import { defineStore } from 'pinia';
import apolloClient from '../apollo';
import { GET_CATEGORIES } from '../graphql/queries';
import { ADD_CATEGORY, DELETE_CATEGORY, UPDATE_PRODUCT, DELETE_PRODUCT } from '../graphql/mutations';

export const useProductStore = defineStore('productStore', {
  // State initialization functions
  state: () => ({
    categories: [],
    products: [],
    loading: false,
    error: null,
  }),
  
  // CRUD operations for categories and products
  actions: {
    async fetchCategories() {
      this.loading = true; 
      this.error = null; // this line for error messages so we can display them when the user clicks
      try {
        const { data, errors } = await apolloClient.query({ query: GET_CATEGORIES });
        if (errors) {
          console.error('GraphQL Errors:', errors);
          this.error = errors[0];
        } else {
          this.categories = data.categories;
        }
      } catch (error) {
        console.error('Apollo Client Error:', error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async addCategory(name) {
      try {
        const { data, errors } = await apolloClient.mutate({
          mutation: ADD_CATEGORY,
          variables: { name }
        });
        if (errors) {
          console.error('GraphQL Errors:', errors);
          this.error = errors[0];
        } else {
          this.categories.push(data.insert_categories.returning[0]);
        }
      } catch (error) {
        console.error('Apollo Client Error:', error);
        this.error = error;
      }
    },
    async deleteCategory(id) {
      try {
        const { data, errors } = await apolloClient.mutate({
          mutation: DELETE_CATEGORY,
          variables: { id }
        });
        if (errors) {
          console.error('GraphQL Errors:', errors);
          this.error = errors[0];
        } else {
          this.categories = this.categories.filter(cat => cat.id !== id);
        }
      } catch (error) {
        console.error('Apollo Client Error:', error);
        this.error = error;
      }
    },
    async updateProduct(id, { name, price }) {
      try {
        const { data, errors } = await apolloClient.mutate({
          mutation: UPDATE_PRODUCT,
          variables: { id, name, price }
        });
        if (errors) {
          console.error('GraphQL Errors:', errors);
          this.error = errors[0];
        } else {
          this.products = this.products.map(product =>
            product.id === id ? { ...product, name, price } : product
          );
        }
      } catch (error) {
        console.error('Apollo Client Error:', error);
        this.error = error;
      }
    },
    async deleteProduct(id) {
      try {
        const { data, errors } = await apolloClient.mutate({
          mutation: DELETE_PRODUCT,
          variables: { id }
        });
        if (errors) {
          console.error('GraphQL Errors:', errors);
          this.error = errors[0];
        } else {
          this.products = this.products.filter(product => product.id !== id);
        }
      } catch (error) {
        console.error('Apollo Client Error:', error);
        this.error = error;
      }
    },
    calculateTotalPrice(category) {
      let totalPrice = 0;
      const calculate = (cat) => {
        cat.products.forEach(product => {
          totalPrice += product.price;
        });
        cat.subcategories.forEach(subcat => {
          calculate(subcat);
        });
      };
      calculate(category);
      return totalPrice;
    },
  }
});
