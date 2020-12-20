<template>
  <div class="map-tools-container">
    <div
      class="map-tools-item default-btn map-icon-btn"
      :class="{ 'default-btn__selected': activedMapToolKey === '' }"
      @click="setDefault"
    />
    <div
      class="map-tools-item zoom-in-rect-btn map-icon-btn"
      :class="{ 'zoom-in-rect-btn__selected': activedMapToolKey === 'zoom-in-rect' }"
      @click="zoomInRect"
    />
    <div
      class="map-tools-item zoom-out-rect-btn map-icon-btn"
      :class="{ 'zoom-out-rect-btn__selected': activedMapToolKey === 'zoom-out-rect' }"
      @click="zoomOutRect"
    />
  </div>
</template>

<script>
import { } from 'vue'
import { useMap } from '../../../hooks/useMap'
export default {
  name: 'MapTools',
  setup() {
    const webMap = useMap().getWebMap()
    const { activedMapToolKey } = webMap.useHooks()

    const zoomInRect = () => {
      activedMapToolKey.value = 'zoom-in-rect'
    }

    const zoomOutRect = () => {
      activedMapToolKey.value = 'zoom-out-rect'
    }

    const setDefault = () => {
      activedMapToolKey.value = ''
    }

    return {
      activedMapToolKey,
      zoomInRect,
      zoomOutRect,
      setDefault,
    }
  }
}
</script>

<style lang="scss" scoped>
.map-tools-container {
  height: calc(100% - 9px);
  padding: 0 16px;
  display: flex;
  align-items: center;
}
.map-tools-item {
  width: 36px;
  height: 36px;
  &:not(:first-child) {
    margin-left: 8px;
  }
}
.zoom-in-rect-btn {
  background-image: url(./images/dark/zoom-in-rect.png);
}
.zoom-in-rect-btn__selected {
  background-image: url(./images/light/zoom-in-rect.png);
}
.zoom-out-rect-btn {
  background-image: url(./images/dark/zoom-out-rect.png);
}
.zoom-out-rect-btn__selected {
  background-image: url(./images/light/zoom-out-rect.png);
}
.default-btn {
  background-image: url(./images/dark/default.png);
}
.default-btn__selected {
  background-image: url(./images/light/default.png);
}
</style>
