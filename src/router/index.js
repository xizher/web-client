import { createRouter, createWebHistory } from 'vue-router'

/** @type {import('vue-router').RouteRecordRaw[]} */
const routes = [
  {
    path: '/ComprehensiveDevelopmentAndUtilizationOfRegionalNaturalEnvironment',
    name: 'ComprehensiveDevelopmentAndUtilizationOfRegionalNaturalEnvironment',
    component: import('../views/comprehensive-development-and-utilization-of-regional-natural-environment/ComprehensiveDevelopmentAndUtilizationOfRegionalNaturalEnvironment.vue')
  }, {
    path: '/CitiesAndUrbanization',
    name: 'CitiesAndUrbanization',
    component: import('../views/cities-and-urbanization/CitiesAndUrbanization.vue')
  }, {
    path: '/ZonalDifferentiationOfLongitude',
    name: 'ZonalDifferentiationOfLongitude',
    component: import('../views/zonal-differentiation-of-longitude/ZonalDifferentiationOfLongitude.vue')
  }, {
    path: '/VerticalZoningDifferentiation',
    name: 'VerticalZoningDifferentiation',
    component: import('../views/vertical-zoning-differentiation/VerticalZoningDifferentiation.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
