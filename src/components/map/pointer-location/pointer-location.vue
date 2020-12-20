<template>
  <div class="pointer-location-container">
    <div
      v-show="!lonlatVisible"
      class="pointer-location-item"
    >
      {{ xInfo }} 米
    </div>
    <div
      v-show="!lonlatVisible"
      class="pointer-location-item"
    >
      {{ yInfo }} 米
    </div>
    <div
      v-show="lonlatVisible"
      class="pointer-location-item"
    >
      {{ lonInfo }} °
    </div>
    <div
      v-show="lonlatVisible"
      class="pointer-location-item"
    >
      {{ latInfo }} °
    </div>
  </div>
  <div
    class="pointer-location-changer"
    @click="lonlatVisible = !lonlatVisible"
  >
    {{ lonlatVisible ? '◐' : '◑' }}
  </div>
</template>

<script>
import { ref, toRefs } from 'vue'
import { useMap } from '../../../hooks/useMap'
export default {
  name: 'PointerLocation',
  setup() {
    const webMap = useMap().getWebMap()
    const { pointerLocation } = webMap.useHooks()
    const lonlatVisible = ref(false)

    return {
      ...toRefs(pointerLocation),
      lonlatVisible,
    }
  }
}
</script>

<style lang="scss" scoped>
.pointer-location-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: calc(100% - 60px);
  padding-left: 32px;
  padding-right: 56px;
}
.pointer-location-item {
  text-align: right;
  font-size: 16px;
  color: #F9F8E4;
}
.pointer-location-changer {
  position: absolute;
  right: 10px;
  font-size: 28px;
  cursor: pointer;
}
</style>
