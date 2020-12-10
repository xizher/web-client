<template>
  <div class="map-basemap">
    <a-button-group>
      <a-button @click="visible = !visible">空</a-button>
      <a-button
        v-for="(item, index) in basemapItems"
        :key="index"
        @click="selectedIndex = index"
      >
        {{ item.alias }}
      </a-button>
    </a-button-group>
  </div>
</template>

<script>
import { toRefs } from 'vue'
export default {
  name: 'MapBasemap',
  setup() {

    const { basemap } = webMap.useHooks()

    return {
      ...toRefs(basemap)
    }
  }
}
</script>

<style lang="scss" scoped>
.map-basemap {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 999;
}
</style>
