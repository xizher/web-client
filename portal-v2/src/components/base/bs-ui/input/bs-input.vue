<template>
  <div>
    <label v-if="label !== ''" :for="id" class="form-label">{{ label }}</label>
    <input @input="changeHandler" :modelValue="value" :type="password ? 'password' : 'text'" class="form-control" :id="id" :placeholder="placeholder">
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { guid } from '@xizher/js-extension/utils'
export default defineComponent({
  name: 'BsInput',
  props: {
    label: { type: String, default: ''},
    placeholder: { type: String, default: ''},
    value: { type: String, default: '' },
    password: Boolean,
  },
  setup (props, { emit }) {
    const id = guid()
    const changeHandler = event => {
      emit('update:modelValue', event.target.value)
    }
    return {
      id,
      changeHandler,
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
