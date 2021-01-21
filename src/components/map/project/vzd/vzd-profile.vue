<template>
  <div
    id="echarts-vzd-profile"
    style="height: 50%;"
  />
</template>

<script>
import { onUnmounted, watch } from 'vue'
import { useVzd } from '../../../../hooks/useProject'
import { useMap } from '../../../../hooks/useMap'
import { VzdTool } from './vzd-tool'
export default {
  name: 'VzdProfile',
  setup() {
    const webMap = useMap().getWebMap()
    const { mapTools, map, view } = webMap
    mapTools.createCustomTool('vzd-tool', new VzdTool(map, view))
    const { activedMapToolKey } = webMap.useHooks()
    activedMapToolKey.value = 'vzd-tool'
    onUnmounted(() => {
      activedMapToolKey.value = ''
    })

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
