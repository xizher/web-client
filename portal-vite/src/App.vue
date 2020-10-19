<template>
  <div id="app" class="app-container">
    <top-app-bar v-model:menuVisible="menuVisible"></top-app-bar>
    <navigation-drawers :dismissible="!menuVisible"></navigation-drawers>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from 'vue'
import TopAppBar from './components/mdc-base/top-app-bar'
import NavigationDrawers from './components/mdc-base/navigation-drawers'
export default defineComponent({
  name: 'App',
  components: {
    'top-app-bar': TopAppBar,
    'navigation-drawers': NavigationDrawers
  },
  setup () {
    const menuVisible = ref(true)
    onMounted(() => {
      
    })
    return {
      menuVisible,
    }
  },
})
</script>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
}
</style>

