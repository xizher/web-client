<template>
  <button type="button" class="btn" :class="btnClass" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BsButton',
  props: {
    // primary secondary success danger warning info light dark link
    kind: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'].indexOf(value) !== -1
      }
    },
    outline: Boolean,
    large: Boolean,
    small: Boolean,
    block: Boolean,
    disabled: Boolean,
  },
  setup(props) {
    const { kind, outline, large, small, block } = props
    const btnClass = []
    outline
      ? btnClass.push(`btn-outline-${kind}`)
      : btnClass.push(`btn-${kind}`)
    large && btnClass.push('btn-lg')
    small && btnClass.push('btn-sm')
    block && btnClass.push('btn-block')

    return {
      btnClass
    }
  }
})
</script>

<style lang="scss" scoped>
// .btn:focus {
//   box-shadow: none;
// }
</style>
