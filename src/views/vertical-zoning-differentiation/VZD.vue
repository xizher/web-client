<template>
  <div style="height: 100%">
    <VzdSurface />
    <VzdProfile />
  </div>
</template>

<script>
import { watchEffect } from 'vue'
import { useMap } from '../../hooks/useMap'
import { usePixelData, useViewOn } from '../../hooks/useEsri'
import { useVzd } from '../../hooks/useProject'
import { VzdProfile, VzdSurface } from '../../components/map'
export default {
  name: 'VerticalZoningDifferentiation',
  components: {
    VzdProfile,
    VzdSurface,
  },
  setup() {
    const { layerOperation } = useMap().getWebMap()
    const layerDEM = layerOperation.findLayerByName('乞力马扎罗数字高程模型')
    const layerGLC = layerOperation.findLayerByName('乞力马扎罗地表覆盖')

    layerDEM.pixelFilter = pixelData => {
      if (pixelData === null || pixelData.pixelBlock === null || pixelData.pixelBlock.pixels === null) {
        return
      }
      pixelData.pixelBlock.mask = []
      const { pixels, height, width, mask } = pixelData.pixelBlock
      const pixelCount = height * width
      for (let i = 0; i < pixelCount; i++) {
        if (pixels[0][i] === 0) {
          mask[i] = 0
        } else {
          mask[i] = 1
        }
      }
    }

    const { updating: updatingDEM, getPixelData: getPixelDataDEM } = usePixelData(layerDEM)
    const { updating: updatingGLC, getPixelData: getPixelDataGLC } = usePixelData(layerGLC)
    const { loaded, setPixelData } = useVzd()
    watchEffect(() => {
      if (updatingDEM.value === false && updatingGLC.value === false) {
        loaded.value = true
        setPixelData({ glc: getPixelDataGLC(), dem: getPixelDataDEM() })
        console.log(getPixelDataDEM(), getPixelDataGLC())
      } else {
        loaded.value = false
      }
    })

    // useViewOn('drag', e => e.stopPropagation())
    useViewOn('mouse-wheel', e => e.stopPropagation())


    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
