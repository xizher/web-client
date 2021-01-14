<template>
  <div
    v-if="loaded"
    class="zdol-viewer"
  >
    <div class="label-box">
      <div
        v-for="(item, index) in Array.from({length:6}, (n, i) => minLon + (maxLon - minLon) / 6 * i)"
        :key="index"
        class="label-item"
      >
        {{ item.toFixed(2) }}°E
      </div>
    </div>
    <!--
      glc30Colormap,
      resultData,
      totalLength,
     -->
    <a-tooltip
      v-for="(item, index) in parsedPixelsData"
      :key="index"
      placement="bottom"
    >
      <template #title>
        <span>{{ glc30Colormap[item[0]].name }}</span>
      </template>
      <div
        :style="{
          width: `${100 * item[1] / totalLength}%`,
          backgroundColor: glc30Colormap[item[0]].color,
          height: '100%'
        }"
      />
    </a-tooltip>
  </div>
  <div
    v-else
    class="zdol-viewer loading-box"
  >
    <a-spin size="large" />
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
    const pixelsData = reactive([])
    const { minLon, maxLon, lat, getPixelData, loaded } = useZdol()
    const { view } = useMap().getWebMap()

    // 解析，刨面图对接数据
    const parsedPixelsData = computed(() => {
      let temp = pixelsData[0]
      if (typeof temp === 'undefined') {
        return []
      }
      const tempArr = []
      let count = 0
      pixelsData.forEach((val, index) => {
        if (val === temp) {
          count++
          if (index === pixelsData.length - 1) {
            if (temp !== 0 && count >= 10) {
              tempArr.push([temp, count])
            }
          }
        } else {
          if (temp !== 0 && count >= 10) {
            tempArr.push([temp, count])
          }
          temp = val
          count = 1
        }
      })
      const result = []
      tempArr.forEach(val => {
        if (result.length > 0 && result[result.length - 1][0] === val[0]) {
          result[result.length - 1][1] += val[1]
        } else {
          result.push(val)
        }
      })
      return result
    })

    // 矩阵像元总量
    const totalLength = computed(() => {
      let len = 0
      parsedPixelsData.value.forEach(([_, l]) => len += l) // eslint-disable-line
      return len
    })

    // 监听纬度值变化以更新像元数据
    watch(lat, val => {
      const { pixelBlock } = getPixelData()
      const pixels = pixelBlock.pixels[0]
      const [minPoint, maxPoint] = [
        new esri.geometry.Point({
          latitude: val, longitude: minLon.value, spatialReference: view.spatialReference
        }),
        new esri.geometry.Point({
          latitude: val, longitude: maxLon.value, spatialReference: view.spatialReference
        })
      ]
      const [minScreenPoint, maxScreenPoint] = [
        view.toScreen(minPoint),
        view.toScreen(maxPoint)
      ]
      const reqX = Math.ceil(minScreenPoint.x)
      const reqY = Math.ceil(minScreenPoint.y)
      const startIndex = reqY * pixelBlock.width + reqX
      const endIndex = reqY * pixelBlock.width + Math.ceil(maxScreenPoint.x)
      const targetPixels = pixels.slice(startIndex, endIndex)
      pixelsData.$reset(...targetPixels)
    })

    // layerView绘制完成时触发 lat 的watch监听事件
    watch(loaded, val => {
      if (val) {
        lat.value += 0.01
      }
    })

    const { glc30Colormap } = webMapOptions

    return {
      glc30Colormap,
      parsedPixelsData,
      totalLength,
      minLon, maxLon,
      loaded,
    }
  }
}
</script>

<style lang="scss" scoped>
.zdol-viewer {
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  height: 80px;
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.label-box {
  position: absolute;
  bottom: -26px;
  left: -3px;
  width: calc(100% + 6px);
  display: flex;
  justify-content: space-between;
  border-top: 1px solid black;
  font-size: 16px;
  font-weight: bold;
}
.loading-box {
  position: absolute;
}
</style>
