<template>
  <div class="application-container">
    <div class="header">
      <div class="header-left-bar header-bar" />
      <div class="header-right-bar header-bar">
        <div class="vertical-bar" />
      </div>
    </div>
    <div

      class="map-view-container"
    >
      <div id="map-view-container" />
      <div class="map-top-left-bar map-bar" />
      <div class="map-top-right-bar map-bar">
        <!-- <button>
          test
        </button> -->
      </div>
      <div class="map-bottom-left-bar map-bar" />
      <div class="map-bottom-right-bar map-bar" />
    </div>
    <!-- <div class="mouse-location-info">
      lon: {{ lon }}, lat: {{ lat }} | x: {{ x }}, y: {{ y }}
    </div> -->
  </div>
</template>

<script>
import { onMounted, toRefs } from 'vue'
import { WebMap } from './map/mapinit/mapinit'
import { webMapOptions } from './config/app.conf'
export default {
  name: 'App',
  setup() {

    const webMap = new WebMap('map-view-container', webMapOptions)
    const { mouseLocation } = webMap.useHooks()

    onMounted(() => {
      webMap.init()
    })

    return {
      ...toRefs(mouseLocation)
    }
  }
}
</script>

<style scoped>

</style>

