<template>
  <div class="application-container">
    <div class="header" />
    <div
      id="map-view-container"
      class="map-view-container"
    />
    <div class="mouse-location-info">
      lon: {{ lon }}, lat: {{ lat }} | x: {{ x }}, y: {{ y }}
    </div>
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

