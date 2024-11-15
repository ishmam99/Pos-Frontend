import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "/src/stores/auth.js";

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('/src/pages/Login.vue'),
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('/src/pages/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/date-sales-report',
    name: 'Date Wise Sales Report',
    component: () => import('/src/pages/DateSalesReport.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/product-sales-report',
    name: 'Product Wise Sales Report',
    component: () => import('/src/pages/ProductSalesReport.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/product-stock-report',
    name: 'Product Stock Report',
    component: () => import('/src/pages/ProductStockReport.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
    history: createWebHistory("/"),
    routes,
    scrollBehavior() {
        document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
    }
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'Login' });
    } else {
      next();
    }
});

export default router;