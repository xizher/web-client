<template>
  <div id="map-container" :style="{ height }">

  </div>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api'
import { createMap, createMarker, createTileLayer } from '../../utils'
import appConf from '../../config/app.conf'
export default {
  name: 'MapLocator',
  props: {
    height: { type: String, default: '400px' },
    lonlat: { type: String, default: '' }
  },
  setup (props, { emit }) {
    const map = ref()
    const marker = ref()
    const { basemapUrl, center, zoom } = appConf.mapConf
    onMounted(() => {
      map.value = createMap('map-container')
      createTileLayer(map.value, basemapUrl)
      map.value.setView(center, zoom)
      map.value.on('move', () => {
        const { lng: lon, lat } = map.value.getCenter()
        marker.value && map.value.removeLayer(marker.value)
        marker.value = createMarker(map.value, [lon, lat])
        emit('update:lonlat', `${lon},${lat}`)
      })
    })
    return {

    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
