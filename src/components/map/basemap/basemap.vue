<template>
  <div
    class="basemap-btn diamond map-icon-btn"
    @click="next"
  />
</template>

<script>
import { } from 'vue'
import { useMap } from '../../../hooks/useMap'
export default {
  name: 'Basemap',
  setup() {
    const webMap = useMap().getWebMap()
    const { basemapSelectedKey } = webMap.useHooks()
    const basemapItemCount = Object.keys(webMap.basemap.basemapItems).length

    const next = () => {
      basemapSelectedKey.value = (basemapSelectedKey.value + 1) % basemapItemCount
    }

    return {
      next
    }
  }
}
</script>

<style lang="scss" scoped>
.basemap-btn {
  position: absolute;
  top: 20px;
  left: 66px;
  background-image: url(./images/dark/basemap.png);
}
.basemap-select {
  position: absolute;
  top: 33px;
  left: -123px;
}
</style>
