<template>
  <div class="application-container">
    <div class="header">
      <div class="header-left-bar header-bar" />
      <div class="header-right-bar header-bar">
        <div class="vertical-bar" />
      </div>
    </div>
    <div class="content">
      <div
        v-if="sideVisible"
        class="side"
      >
        <div class="side-title" />
        <div class="side-content">
          <a-select
            style="width: 80%;"
          >
            <a-select-option value="jack">
              自然地理环境的地域差异
            </a-select-option>
            <a-select-option value="lucy">
              城市与城市化
            </a-select-option>
            <a-select-option value="Yiminghe">
              区域生态环境建设
            </a-select-option>
            <a-select-option value="Yiminghe2">
              区域自然资源的综合开发与利用
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="main">
        <div class="map-panel">
          <div id="map-view-container" />
          <div class="map-top-left-bar map-bar" />
          <div class="map-top-right-bar map-bar">
            <!-- <button>
          test
        </button> -->
          </div>
          <div class="map-bottom-left-bar map-bar" />
          <div class="map-bottom-right-bar map-bar" />
          <div
            class="side-panel-switch"
            :class="sideVisible ? 'side-panel-switch__opend' : 'side-panel-switch__closed'"
            @click="sideVisible = !sideVisible"
          />
        </div>
      </div>
    </div>
    <!-- <div class="mouse-location-info">
      lon: {{ lon }}, lat: {{ lat }} | x: {{ x }}, y: {{ y }}
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref, toRefs } from 'vue'
import { WebMap } from './map/mapinit/mapinit'
import { webMapOptions } from './config/app.conf'
export default {
  name: 'App',
  setup() {

    const webMap = new WebMap('map-view-container', webMapOptions)
    const { mouseLocation } = webMap.useHooks()

    const sideVisible = ref(false)

    onMounted(() => {
      webMap.init()
    })

    return {
      ...toRefs(mouseLocation),
      sideVisible
    }
  }
}
</script>

<style scoped>

</style>

