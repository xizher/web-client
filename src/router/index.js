import { createRouter, createMemoryHistory } from 'vue-router'

/** @type {import('vue-router').RouteRecordRaw[]} */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }, {
    path: '/ComprehensiveDevelopmentAndUtilizationOfRegionalNaturalEnvironment',
    name: 'ComprehensiveDevelopmentAndUtilizationOfRegionalNaturalEnvironment',
    component: () => import('../views/comprehensive-development-and-utilization-of-regional-natural-environment/CDAUORNE.vue')
  }, {
    path: '/CitiesAndUrbanization',
    name: 'CitiesAndUrbanization',
    component: () => import('../views/cities-and-urbanization/CAU.vue')
  }, {
    path: '/ZonalDifferentiationOfLongitude',
    name: 'ZonalDifferentiationOfLongitude',
    component: () => import('../views/zonal-differentiation-of-longitude/ZDOL.vue')
  }, {
    path: '/VerticalZoningDifferentiation',
    name: 'VerticalZoningDifferentiation',
    component: () => import('../views/vertical-zoning-differentiation/VZD.vue')
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
