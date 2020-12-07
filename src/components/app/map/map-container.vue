<template>
  <div id="map-container" class="map-container"></div>
</template>

<script>
import { onMounted } from 'vue'
import { } from 'vuex'
import { mapInit } from '../../../map/leaflet'
// import { WebMap } from '../../../map/openlayers'
import { useConfig } from '../../../hooks/useAppConf'
export default {
  name: 'MapContainer',
  setup() {
    const { mapConfig } = useConfig()
    onMounted(() => {
      mapInit('map-container', mapConfig)
    })
    return {

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
