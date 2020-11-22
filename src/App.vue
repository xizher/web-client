<template>
  <bs-navbar
    :title="title"
    :navItems="navItems"
  />
  <router-view />
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
  setup () {

    return {
      title: 'Ngheizit',
      navItems: [
        { name: '作品集', to: '/' },
        { name: '文章', to: '/blog' },
        { name: '关于', to: '/about' },
      ]
    }
  },
}
</script>
