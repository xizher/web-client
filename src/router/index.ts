import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Feature from '../views/feature.vue'
import Blog from '../views/blog.vue'
import About from '../views/about.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Feature',
    component: () => import('../views/feature.vue')
  }, {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/blog.vue')
  }, {
    path: '/about',
    name: 'About',
    component: () => import('../views/about.vue')
  }, {
    path: '/blog-viewer/:id',
    name: 'BlogViewer',
    component: () => import('../views/blog-viewer.vue')
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
