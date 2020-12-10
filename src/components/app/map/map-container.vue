<template>
  <div class="map-container">
    <div id="map-container" class="map-container"></div>
    <div v-if="loaded">
      <MapBasemap />
      <MapTools />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { } from 'vuex'
import { WebMap } from '../../../map/leaflet'
// import { WebMap } from '../../../map/openlayers'
import { useConfig } from '../../../hooks/useAppConf'
import MapBasemap from './map-basemap'
import MapTools from './map-tools'
export default {
  name: 'MapContainer',
  components: {
    MapBasemap,
    MapTools
  },
  setup() {
    const { mapConfig } = useConfig()
    const webMap = new WebMap('map-container', mapConfig)
    window.webMap = webMap
    const { loaded } = webMap.useHooks()
    onMounted(() => {
      webMap.initMap()
    })
    return {
      loaded,
    }
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
