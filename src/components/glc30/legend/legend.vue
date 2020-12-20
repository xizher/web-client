<template>
  <div class="legend-container">
    <div
      v-for="(item, index) in globeLand30Colormap"
      :key="index"
      class="legend-item"
    >
      <span class="legend-item-field">{{ item.name }}：</span>
      <span
        class="legend-item-image"
        :style="{ backgroundColor: item.color }"
      />
    </div>
  </div>
</template>

<script>
import { } from 'vue'
import { webMapOptions } from '../../../config/app.conf'
export default {
  name: 'Legend',
  setup() {
    const { globeLand30Colormap } = webMapOptions

    return {
      globeLand30Colormap
    }
  }
}
</script>

<style lang="scss" scoped>
.legend-container {
  position: absolute;
  left: 50%;
  bottom: 64px;
  z-index: 3;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 250px;
  color: #F9F8E4;
  background-color: #6B5B42;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  opacity: .8;
  &:hover {
    opacity: .95;
  }
  transition: .3s;
  &::after {
    content: '';
    position: absolute;
    bottom: -14px;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 14px solid #6B5B42;
  }
}
.legend-item {
  display: flex;
  margin: 5px;
  cursor: pointer;
}
.legend-item-image {
  width: 36px;
  height: 24px;
  border: 1px solid white;
  border-radius: 4px;
}
.legend-item-field {
  height: 24px;
  line-height: 24px;
}
</style>
