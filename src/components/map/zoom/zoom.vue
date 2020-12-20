<template>
  <div
    class="zoom-in-btn triangle-top-left map-icon-btn map-icon-btn__triangle"
    @click="zoomIn"
  />
  <div
    class="zoom-home-btn triangle-bottom-right map-icon-btn map-icon-btn__triangle"
    @click="zoomHome"
  />
  <div
    class="zoom-out-btn triangle-top-left map-icon-btn map-icon-btn__triangle"
    @click="zoomOut"
  />
</template>

<script>
import { } from 'vue'
import { useMap } from '../../../hooks/useMap'
export default {
  name: 'Zoom',
  setup() {
    const webMap = useMap().getWebMap()
    const { activedMapToolKey } = webMap.useHooks()
    const zoomIn = () => {
      activedMapToolKey.value = 'zoom-in'
    }
    const zoomOut = () => {
      activedMapToolKey.value = 'zoom-out'
    }
    const zoomHome = () => {
      activedMapToolKey.value = 'zoom-home'
    }

    return {
      zoomIn,
      zoomOut,
      zoomHome,
    }
  }
}
</script>

<style lang="scss" scoped>
.zoom-in-btn {
  position: absolute;
  top: 10px;
  left: 82px;
  background: {
    image: url(./images/dark/zoom-in.png);
    size: 50% 50%;
  }
}
.zoom-home-btn {
  position: absolute;
  top: 16px;
  left: 14px;
  background: {
    image: url(./images/dark/zoom-home.png);
    size: 50% 50%;
    position: bottom right;
  }
}
.zoom-out-btn {
  position: absolute;
  top: 84px;
  left: 10px;
  background: {
    image: url(./images/dark/zoom-out.png);
    size: 50% 50%;
  }
}
</style>
