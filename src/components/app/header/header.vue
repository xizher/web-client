<template>
  <div class="header">
    <div class="header-left-bar header-bar">
      <div
        class="theme-item"
        @click="setTheme(0)"
      >
        区域自然环境的综合开发与利用
      </div>
      <div
        class="theme-item"
        @click="setTheme(1)"
      >
        城市与城市化
      </div>
    </div>
    <div class="header-right-bar header-bar">
      <div
        class="theme-item"
        @click="setTheme(2)"
      >
        经度地带性分异规律
      </div>
      <div
        class="theme-item"
        @click="setTheme(3)"
      >
        垂直地带性分异规律
      </div>
    </div>
  </div>
</template>

<script>
import { } from 'vue'
// import { webMapOptions } from '../../../config/app.conf'
import { useMap } from '../../../hooks/useMap'
import { useRouter } from 'vue-router'
export default {
  name: 'AppHeader',
  setup() {
    const { getWebMap } = useMap()
    const webMap = getWebMap()
    const router = useRouter()
    const setTheme = uid => {
      const { selectedThemeUid } = webMap.useHooks()
      selectedThemeUid.value = uid
      if (uid === 0) {
        router.push('/ComprehensiveDevelopmentAndUtilizationOfRegionalNaturalEnvironment')
      } else if (uid === 1) {
        router.push('/CitiesAndUrbanization')
      } else if (uid === 2) {
        router.push('/ZonalDifferentiationOfLongitude')
      } else if (uid === 3) {
        router.push('/VerticalZoningDifferentiation')
      }
    }

    return {
      setTheme
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
