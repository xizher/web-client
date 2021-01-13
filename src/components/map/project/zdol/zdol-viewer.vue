<template>
  <div class="zdol-viewer">
    <!--
      glc30Colormap,
      resultData,
      totalLength,
     -->
    <a-tooltip
      v-for="(item, index) in resultData"
      :key="index"
      placement="bottom"
    >
      <template #title>
        <span>{{ glc30Colormap[item[0]].name }}</span>
      </template>
      <div
        :style="{
          width: `${100 * item[1] / totalLength}%`,
          backgroundColor: glc30Colormap[item[0]].color
        }"
      />
    </a-tooltip>
  </div>
</template>

<script>
import { computed, reactive, watch } from 'vue'
import { useZdol } from '../../../../hooks/useProject'
import { esri } from '../../../../map/esri'
import { useMap } from '../../../../hooks/useMap'
import { webMapOptions } from '../../../../config/app.conf'
export default {
  name: 'ZdolViewer',
  setup() {
    const dataset = reactive([])
    const resultData = computed(() => {
      let temp = dataset[0]
      if (typeof temp === 'undefined') {
        return []
      }
      const tempArr = []
      let count = 0
      // console.log(dataset)
      dataset.forEach((val, index) => {
        if (val === temp) {
          count++
          if (index === dataset.length - 1) {
            if (temp !== 0 && count >= 10) {
              tempArr.push([temp, count])
            }
          }
        } else {
          if (temp !== 0 && count >= 10) {
            // if (result.length === 0 || result[result.length - 1][0] === val) {
            // result.push([temp, count])
            // } else {
            //   result[result.length - 1][1] += count
            // }
            tempArr.push([temp, count])
          }
          // result.push([temp, count])
          temp = val
          count = 1
        }
      })
      const result = []
      // console.log(tempArr)
      tempArr.forEach(val => {
        if (result.length > 0 && result[result.length - 1][0] === val[0]) {
          result[result.length - 1][1] += val[1]
        } else {
          result.push(val)
        }
      })
      return result
    })
    const totalLength = computed(() => {
      let len = 0
      resultData.value.forEach(([_, l]) => len += l) // eslint-disable-line
      return len
    })
    const { minLon, maxLon, lat, getPixelData } = useZdol()
    const { view } = useMap().getWebMap()
    watch(lat, val => {
      const { pixelBlock } = getPixelData()
      const minPoint = new esri.geometry.Point({
        latitude: val, longitude: minLon.value, spatialReference: view.spatialReference
      })
      const minScreenPoint = view.toScreen(minPoint)
      const maxPoint = new esri.geometry.Point({
        latitude: val, longitude: maxLon.value, spatialReference: view.spatialReference
      })
      const maxScreenPoint = view.toScreen(maxPoint)
      const pixels = pixelBlock.pixels[0]
      const reqX = Math.ceil(minScreenPoint.x)
      const reqY = Math.ceil(minScreenPoint.y)
      const startIndex = reqY * pixelBlock.width + reqX
      const endIndex = reqY * pixelBlock.width + Math.ceil(maxScreenPoint.x)
      const data = pixels.slice(startIndex, endIndex)
      dataset.$reset(...data)
      console.log(resultData, totalLength)
    })

    const { glc30Colormap } = webMapOptions

    return {
      glc30Colormap,
      resultData,
      totalLength,
    }
  }
}
</script>

<style lang="scss" scoped>
.zdol-viewer {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  height: 80px;
  width: 65%;
  display: flex;
}
</style>
