<template>
  <div>
    Statistics
  </div>
</template>

<script>
import { watch } from 'vue'
import { useCAU } from '../../../hooks/useProject'
export default {
  name: 'Statistics',
  setup() {
    const { loaded, getPixelData } = useCAU()

    watch(loaded, val => {
      if (val) {

      } else {

      }
    }, { immediate: true })

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
