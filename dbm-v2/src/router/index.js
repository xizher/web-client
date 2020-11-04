import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/blog-manager',
    name: 'BlogManager',
    component: () => import('@/views/BlogManager')
  }, {
    path: '/nav-manager',
    name: 'NavManager',
    component: () => import('@/views/NavManager')
  }, {
    path: '/pwd-manager',
    name: 'PwdManager',
    component: () => import('@/views/PwdManager')
  }
]

const router = new VueRouter({
  routes
})

export default router
