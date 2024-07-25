import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import CategoryPage from "../components/CategoryPage.vue";
import ProductPage from "../components/ProductPage.vue";

// Create routes for all components
const routes = [
  { path: "/", component: HomePage },
  { path: "/category/:id", component: CategoryPage },
  { path: "/product/:id", component: ProductPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
