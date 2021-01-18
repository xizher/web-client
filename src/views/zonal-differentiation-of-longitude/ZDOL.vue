<template>
  <div>
    <!-- 经度地带性分异规律 -->
    <!-- <div>{{ pixelData }}</div> -->
  </div>
</template>

<script>
import { watch } from 'vue'
import { useMap } from '../../hooks/useMap'
import { useZdol } from '../../hooks/useProject'
import { usePixelData, useViewOn } from '../../hooks/useEsri'
export default {
  name: 'ZonalDifferentiationOfLongitude',
  setup() {
    const { layerOperation } = useMap().getWebMap()
    const { setPixelData, loaded } = useZdol() // const pixelValue = pixels[reqY * width + reqX]
    const layer = layerOperation.findLayerByName('中国东北、华北及蒙古的部分地区')

    // 获取栅格像元矩阵
    const { updating, getPixelData } = usePixelData(layer)
    watch(updating, val => {
      if (val) {
        loaded.value = false
      } else {
        setPixelData(getPixelData())
      }
    })

    useViewOn('drag', e => e.stopPropagation())
    useViewOn('mouse-wheel', e => e.stopPropagation())

    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
