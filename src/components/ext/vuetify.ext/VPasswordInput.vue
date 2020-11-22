<template>
  <v-text-field
    :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="rules"
    :value="value"
    :label="label"
    :type="showPwd ? 'text' : 'password'"
    @click:append="clickAppendHandler"
    @change="changeHandler"
    outlined
  />
</template>

<script>
export default {
  name: 'VPasswordInput',
  props: {
    value: { type: String, default: '' },
    rules: { type: Array, default: () => [] },
    label: { type: String, default: '' },
    outlined: Boolean
  },
  data () {
    return {
      showPwd: false
    }
  },
  methods: {
    changeHandler (val) {
      this.$emit('update:value', val)
    },
    clickAppendHandler () {
      this.showPwd = true
      setTimeout(() => this.showPwd = false, 100)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
