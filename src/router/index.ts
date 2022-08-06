import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('../pages/Welcome.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    name: 'NotFound'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router