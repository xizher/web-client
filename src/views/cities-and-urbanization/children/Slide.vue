<template>
  <div>
    <a-radio-group v-model:value="leftSelectedKey">
      <a-radio
        v-for="item in layerList"
        :key="item.key"
        class="radio-item"
        :value="item.key"
        :disabled="item.key === rightSelectedKey"
      >
        {{ item.alias }}
      </a-radio>
    </a-radio-group>
    <a-radio-group v-model:value="rightSelectedKey">
      <a-radio
        v-for="item in layerList"
        :key="item.key"
        class="radio-item"
        :value="item.key"
        :disabled="item.key === leftSelectedKey"
      >
        {{ item.alias }}
      </a-radio>
    </a-radio-group>
  </div>
</template>

<script>
import { onUnmounted, reactive, toRefs, watchEffect } from 'vue'
import { useMap } from '../../../hooks/useMap'
import { esri } from '../../../map/esri'
export default {
  name: 'Slide',
  setup() {

    const layerList = [
      { key: 0, name: '长三角2000年地表覆盖png', alias: '2000年' },
      { key: 1, name: '长三角2010年地表覆盖png', alias: '2010年' },
      { key: 2, name: '长三角2020年地表覆盖png', alias: '2020年' },
    ]

    const state = reactive({
      leftSelectedKey: 0,
      rightSelectedKey: 1
    })

    const { layerOperation, view } = useMap().getWebMap()
    const swipe = new esri.widgets.Swipe({
      position: 50,
      view,
    })
    view.ui.add(swipe)
    watchEffect(() => {
      layerOperation.layers.forEach(item => item.targetLayer.visible = false)
      const leftLayer = layerOperation.findLayerByName(layerList.$findItem('key', state.leftSelectedKey).name)
      const rightLayer = layerOperation.findLayerByName(layerList.$findItem('key', state.rightSelectedKey).name)
      leftLayer.visible = true
      rightLayer.visible = true
      swipe.leadingLayers.removeAll()
      swipe.leadingLayers.add(leftLayer)
      swipe.trailingLayers.removeAll()
      swipe.trailingLayers.add(rightLayer)
    })

    onUnmounted(() => {
      view.ui.remove(swipe)
      swipe.destroy()
    })

    return {
      layerList,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-item {
  display: block;
  height: 30px;
  line-height: 30px;
}
</style>
