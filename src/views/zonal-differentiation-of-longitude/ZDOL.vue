<template>
  <div>
    <!-- 经度地带性分异规律 -->
    <!-- <div>{{ pixelData }}</div> -->
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { useMap } from '../../hooks/useMap'
import { useZdol } from '../../hooks/useProject'
export default {
  name: 'ZonalDifferentiationOfLongitude',
  setup() {
    const { view, layerOperation } = useMap().getWebMap()
    const { setPixelData, loaded } = useZdol() // const pixelValue = pixels[reqY * width + reqX]
    const layer = layerOperation.findLayerByName('中国东北、华北及蒙古的部分地区')
    let removeStopPanEvent, removeStopZoomEvent, removeWatchEvent

    // 获取栅格像元矩阵
    view.whenLayerView(layer).then(layerView => {
      removeWatchEvent = layerView.watch('updating', updating => {
        if (updating) {
          loaded.value = false
        } else {
          setPixelData(layerView.pixelData)
        }
      })
    })

    onMounted(() => {
      removeStopPanEvent = view.on('drag', event => event.stopPropagation())
      removeStopZoomEvent = view.on('mouse-wheel', event => event.stopPropagation())
    })

    // 清理监听事件
    onUnmounted(() => {
      removeStopPanEvent && removeStopPanEvent.remove()
      removeStopZoomEvent && removeStopZoomEvent.remove()
      removeWatchEvent && removeWatchEvent.remove()
    })

    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
