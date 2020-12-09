<template>
  <div class="appview-map">
    <MapContainer />
    <div class="footer-container">

    </div>
  </div>
</template>

<script>
import { } from 'vue'
import MapContainer from '../../components/app/map/map-container'
export default {
  name: 'MapView',
  components: {
    MapContainer
  },
  setup() {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.appview-map {
  height: 100vh;
}
</style>
