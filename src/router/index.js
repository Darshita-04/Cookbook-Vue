import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recipe/:id', // dynamic id
      name: 'RecipeDetail',
      component: () => import('../views/RecipeDetail.vue')
    }
  ],
})

export default router
