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
    <div
      class="map-tools-item mark-btn map-icon-btn"
      @click="markBarVisible = !markBarVisible"
    />
    <div
      class="map-tools-item clear-btn map-icon-btn"
      @click="clear"
    />
  </div>
  <div
    v-if="markBarVisible"
    class="mark-bar"
  >
    <div
      v-for="(item, index) in markEnum"
      :key="index"
      :class="`map-tools-item map-icon-btn ${item}-btn ${activedMapToolKey === item ? `${item}-btn__selected` : ''}`"
      @click="drawMark(item)"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
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

    const clear = () => {
      activedMapToolKey.value = 'clear'
    }

    const setDefault = () => {
      activedMapToolKey.value = ''
    }

    const markEnum = [
      'draw-point', 'draw-polyline', 'draw-polygon'
    ]

    const drawMark = (type) => {
      activedMapToolKey.value = type
    }

    const markBarVisible = ref(false)

    return {
      activedMapToolKey,
      zoomInRect,
      zoomOutRect,
      setDefault,
      markBarVisible,
      drawMark,
      markEnum,
      clear,
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
  .mark-btn {
    background-image: url(./images/dark/mark.png);
  }
  .clear-btn {
    background-image: url(./images/dark/clear.png);
  }
}
.map-tools-item {
  width: 36px;
  height: 36px;
  &:not(:first-child) {
    margin-left: 8px;
  }
}
.mark-bar {
  position: absolute;
  top: -54px;
  left: 100px;
  display: flex;
  align-items: center;
  height: 42px;
  padding: 0 8px;
  background-color: #CB7954;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -14px;
    transform: translateX(-50%);
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 14px solid #CB7954;
  }

  .draw-point-btn {
    background-image: url(./images/dark/draw-point.png);
  }
  .draw-point-btn__selected {
    background-image: url(./images/light/draw-point.png);
  }
  .draw-polyline-btn {
    background-image: url(./images/dark/draw-polyline.png);
  }
  .draw-polyline-btn__selected {
    background-image: url(./images/light/draw-polyline.png);
  }
  .draw-polygon-btn {
    background-image: url(./images/dark/draw-polygon.png);
  }
  .draw-polygon-btn__selected {
    background-image: url(./images/light/draw-polygon.png);
  }
}
</style>
