<template>
  <div
    class="hawkeye-btn diamond map-icon-btn"
    @click="visible = !visible"
  />
  <div
    v-show="visible"
    id="hawkeye-map"
    class="hawkeye-map"
  />
</template>

<script>
import { onMounted, ref } from 'vue'
import { useMap } from '../../../hooks/useMap'
export default {
  name: 'Hawkeye',
  setup() {
    const webMap = useMap().getWebMap()
    const { hawkeye } = webMap
    onMounted(() => {
      hawkeye.load()
    })

    const visible = ref(false)

    return {
      visible
    }
  }
}
</script>

<style lang="scss" scoped>
.hawkeye-btn {
  position: absolute;
  top: 57px;
  left: 103px;
  background-image: url(./images/dark/hawkeye.png);
}
.hawkeye-map {
  position: absolute;
  top: 35px;
  left: -225px;
  width: 250px;
  height: 125px;
  background-color: #F9F8E4;
  opacity: .8;
  border: 2px solid #594D34;
  border-radius: 6px;
}
</style>
