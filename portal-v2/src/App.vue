<template>
  <!-- <bs-navbar
    :title="title"
  ></bs-navbar> -->

  <bs-input v-model="text"></bs-input>
  {{text}}
</template>

<script>
import BsButton2 from './components/base/bs-ui/button/bs-button.vue'
import { BsButton, BsInput, BsNavbar } from './components/base/bs-ui'
export default {
  name: 'App',
  components: {
    'bs-button2': BsButton2,
    'bs-button': BsButton,
    'bs-input': BsInput,
    'bs-navbar': BsNavbar,
  },
  data () {
    return {
      title: 'Ngheizit',
      text: ''
    }
  },
  mounted () {
    // console.log(getRootPath())
  }
}
</script>
