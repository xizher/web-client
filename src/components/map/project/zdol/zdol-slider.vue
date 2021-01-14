<template>
  <div
    class="zdol-slider"
    @mousewheel="mouseWheelEvent"
  >
    <a-slider
      v-model:value="latitude"
      vertical
      :min="minLatitude"
      :max="maxLatitude"
      :step="0.01"
      :included="false"
      :marks="marks"
      :tip-formatter="null"
    />
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue'
import { useMap } from '../../../../hooks/useMap'
import { esri } from '../../../../map/esri'
import { useZdol } from '../../../../hooks/useProject'
export default {
  name: 'ZdolSlider',
  setup() {
    const { view, mapElementDisplay, layerOperation } = useMap().getWebMap()
    const layer = layerOperation.findLayerByName('中国东北、华北及蒙古的部分地区')
    const { ymin, ymax, xmin, xmax } = layer.fullExtent
    const [pointMin, pointMax] = [
      new esri.geometry.Point({ x: xmin, y: ymin, spatialReference: view.spatialReference }),
      new esri.geometry.Point({ x: xmax, y: ymax, spatialReference: view.spatialReference })
    ]
    const [minLatitude, maxLatitude] = [
      pointMin.latitude, pointMax.latitude
    ]
    const latitude = ref((minLatitude + maxLatitude) / 2)

    // 滑动条标记
    const marks = {}
    for (let i = 40; i <= 45; i++) {
      marks[i] = `${i}°N`
    }

    // 通过鼠标滚动修改滑动值
    const mouseWheelEvent = event => {
      const step = 0.1
      if (event.deltaY > 0) {
        latitude.value -= step
      } else if (event.deltaY < 0) {
        latitude.value += step
      }
      if (latitude.value > maxLatitude) {
        latitude.value = maxLatitude
      }
      if (latitude.value < minLatitude) {
        latitude.value = minLatitude
      }
    }

    // 监听滑动值，并绘制值所指的经线
    watch(latitude, val => {
      const line = new esri.geometry.Polyline({
        paths: [[pointMin.longitude, val], [pointMax.longitude, val]]
      })
      const graphic = mapElementDisplay.parseGraphics(line, {
        color: [0, 0, 0, .65],
        width: '8px'
      })
      mapElementDisplay.setGraphics(graphic)
      const { setLonlat } = useZdol()
      setLonlat({
        minLon: pointMin.longitude,
        maxLon: pointMax.longitude,
        lat: latitude.value,
      })
    }, { immediate: true })

    onUnmounted(() => {
      mapElementDisplay.clearGraphics()
    })

    return {
      latitude,
      minLatitude,
      maxLatitude,
      marks,
      mouseWheelEvent,
    }
  }
}
</script>

<style lang="scss" scoped>
.zdol-slider {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  height: 300px;
  padding-bottom: 20px;
  padding-top: 10px;
  padding-right: 30px;
  border-radius: 6px;
  background-color: white;
}
</style>
