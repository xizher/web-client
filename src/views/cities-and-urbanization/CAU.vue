<template>
  <div>
    <a-button-group>
      <a-button
        v-for="item in modules"
        :key="item.key"
        :type="item.key === activedKey ? 'primary': 'default'"
        @click="activedKey = item.key"
      >
        {{ item.name }}
      </a-button>
    </a-button-group>
    <router-view />
  </div>
</template>

<script>
import { ref, watch, watchEffect } from 'vue'
import { useMap } from '../../hooks/useMap'
import { usePixelData } from '../../hooks/useEsri'
import { useCAU } from '../../hooks/useProject'
import { useRouter } from 'vue-router'
export default {
  name: 'CitiesAndUrbanization',
  setup() {
    const { layerOperation } = useMap().getWebMap()
    const layer2000 = layerOperation.findLayerByName('长三角2000年地表覆盖')
    const layer2010 = layerOperation.findLayerByName('长三角2010年地表覆盖')
    const layer2020 = layerOperation.findLayerByName('长三角2020年地表覆盖')

    const { loaded, setPixelData } = useCAU()

    const { updating: updating2000, getPixelData: getPixelData2000 } = usePixelData(layer2000)
    const { updating: updating2010, getPixelData: getPixelData2010 } = usePixelData(layer2010)
    const { updating: updating2020, getPixelData: getPixelData2020 } = usePixelData(layer2020)

    watchEffect(() => {
      if (updating2000.value === false && updating2010.value === false && updating2020.value === false) {
        setPixelData({
          y2000: getPixelData2000(),
          y2010: getPixelData2010(),
          y2020: getPixelData2020()
        })
        console.log(getPixelData2000())
        console.log(getPixelData2010())
        console.log(getPixelData2020())
        loaded.value = true
      } else {
        loaded.value = false
      }
    })

    const activedKey = ref(0)
    const router = useRouter()
    const modules = [
      { name: '区域统计', key: 0, path: '/CitiesAndUrbanization/statistics' },
      { name: '地图分屏', key: 1, path: '/CitiesAndUrbanization/splitscreen' },
      { name: '滑动对比', key: 2, path: '/CitiesAndUrbanization/slide' },
    ]
    watch(activedKey, key => {
      router.push(modules.$findItem('key', key).path)
    }, { immediate: true })

    return {
      activedKey, modules
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
