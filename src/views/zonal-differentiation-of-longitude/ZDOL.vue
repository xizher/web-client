<template>
  <div>
    ZonalDifferentiationOfLongitude
    <!-- <div>{{ pixelData }}</div> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { useMap } from '../../hooks/useMap'
export default {
  name: 'ZonalDifferentiationOfLongitude',
  setup() {
    const webMap = useMap().getWebMap()
    const layer = webMap.layerOperation.findLayerByName('中国东北、华北及蒙古的部分地区')
    let pixelData = null
    let removeEvent = null
    webMap.view.whenLayerView(layer).then(layerView => {
      layerView.watch('updating', value => {
        if (!value) {
          // pixelData = layerView.pixelData.pixelBlock.mask.filter(item => item !== 255 && item !== 0).length
          // console.log(pixelData)
          pixelData = layerView.pixelData
          console.log(pixelData)
        }

        if (removeEvent) {
          removeEvent.remove()
        }

        removeEvent = webMap.view.on('click', event => {
          const currentExtent = pixelData.extent
          const pixelBlock = pixelData.pixelBlock
          const height = pixelBlock.height
          const width = pixelBlock.width

          const pixelSizeX = Math.abs(currentExtent.xmax - currentExtent.xmin) / width

          const point = webMap.view.toMap({
            x: event.x,
            y: event.y
          })

          const reqX = Math.ceil(event.x)
          const reqY = Math.ceil(event.y)

          const pixels = pixelBlock.pixels[0]
          const pixelValue = pixels[reqY * width + reqX]

          console.log(reqX, reqY, pixelValue, pixelSizeX)
        })
      })
    })
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
