<template>
  <div class="map-tools">
    <a-button-group>
      <a-button
        v-for="(item, index) in items"
        :key="index"
        @click="selectItemByName(item.name)"
        :type="activedName === item.name ? 'primary' : null"
      >
        {{ item.alias }}
      </a-button>
    </a-button-group>
  </div>
</template>

<script>
import { toRefs } from 'vue'
export default {
  name: 'MapTools',
  setup() {

    const { mapTools } = webMap.useHooks()

    return {
      ...toRefs(mapTools)
    }
  }
}
</script>

<style lang="scss" scoped>
.map-tools {
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 999;
}
</style>
