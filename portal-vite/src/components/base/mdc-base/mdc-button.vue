<template>
  <button class="mdc-button mdc-button--raised">
    <div class="mdc-button__ripple"></div>
    <i v-if="icon" class="material-icons mdc-button__icon" aria-hidden="true">{{ icon }}</i>
    <span class="mdc-button__label">{{ label }}</span>
  </button>
</template>

<script land="ts">
import { ref, reactive, defineComponent } from 'vue'
export default defineComponent({
  name: 'MdcButton',
  props: {
    label: { type: String, default: '' },
    icon: { type: String, default: '' },

  },
  setup(prop, { attrs, slots, emit }) {
    return {
      
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
