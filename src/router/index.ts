import { createRouter, createWebHistory } from 'vue-router'
import { authenticateUser } from '../helpers/navGuards'
import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/login',
    name: 'Welcome',
    component: () => import('../pages/Welcome.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    beforeEnter: authenticateUser
  },
  {
    path: '/:catchAll(.*)',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    beforeEnter: authenticateUser
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router