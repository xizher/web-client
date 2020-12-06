import { createRouter, createWebHashHistory } from 'vue-router'
import { useAxios } from '../hooks/useAjax'
import { getCookie, delCookie } from '../ext/js.utils'

const routes = [
  {
    path: '/',
    name: 'Map',
    component: () => import('../views/Map/Map.View.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.View.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { path } = to
  if (path !== '/login') {
    const { doAxios } = useAxios()
    const { taken, oid } = JSON.parse(getCookie('accountInfo') || '{}')
    doAxios({ url: '/account/check', data: { taken, oid } }).then(() => {
      next()
    }).catch(err => {
      console.warn(err)
      delCookie('accountInfo')
      next('/login')
    })
  } else {
    next()
  }
})

export default router
