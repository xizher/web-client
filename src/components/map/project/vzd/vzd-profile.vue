<template>
  <div>
    VzdProfile3
  </div>
</template>

<script>
import { watch } from 'vue'
import { useVzd } from '../../../../hooks/useProject'
import { useMap } from '../../../../hooks/useMap'
import { VzdTool } from './vzd-tool'
export default {
  name: 'VzdProfile',
  setup() {
    const webMap = useMap().getWebMap()
    webMap.mapTools.createCustomTool('vzd-tool', new VzdTool(webMap.map, webMap.view))
    const { activedMapToolKey } = webMap.useHooks()
    activedMapToolKey.value = 'vzd-tool'

    const { loaded, getPixelData } = useVzd()
    watch(loaded, val => {
      if (val) {

      }
    })

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
