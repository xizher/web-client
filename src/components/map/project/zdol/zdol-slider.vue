<template>
  <div
    class="zdol-slider"
    @mousewheel="mouseWheelEvent"
  >
    <!-- <div style="display: inline-block;height: 300px;marginLeft: 70px"> -->
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
    <!-- </div> -->
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useMap } from '../../../../hooks/useMap'
import { esri } from '../../../../map/esri'
import { useZdol } from '../../../../hooks/useProject'
export default {
  name: 'ZdolSlider',
  setup() {
    const webMap = useMap().getWebMap()
    const { view, mapElementDisplay } = webMap
    const layer = webMap.layerOperation.findLayerByName('中国东北、华北及蒙古的部分地区')
    const extent = layer.fullExtent
    const { ymin, ymax, xmin, xmax } = extent
    const pointMin = new esri.geometry.Point({ x: xmin, y: ymin, spatialReference: view.spatialReference })
    const minLatitude = pointMin.latitude
    const pointMax = new esri.geometry.Point({ x: xmax, y: ymax, spatialReference: view.spatialReference })
    const maxLatitude = pointMax.latitude
    const latitude = ref((minLatitude + maxLatitude) / 2)
    const marks = {}
    for (let i = 40; i <= 45; i++) {
      marks[i] = `${i}°N`
    }
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
  // opacity: .9;
}
</style>
