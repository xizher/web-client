import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/blog-manager',
    name: 'BlogManager',
    component: () => import('../views/BlogManager')
  }
]

const router = new VueRouter({
  routes
})

export default router
