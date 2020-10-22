<template>
  <div id="app" class="app-container">
    <top-app-bar></top-app-bar>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from 'vue'
import TopAppBar from './components/top-app-bar'
export default defineComponent({
  name: 'App',
  components: {
    'top-app-bar': TopAppBar,
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
}
.main-container {
  position: absolute;
  // left: 255px;
  top: 56px;
  padding-top: 8px;
  height: calc(100vh - 64px);
  width: 100vw;

  background-color: #1E1E1E;
  color: #ffffff;

  overflow: auto;

  > * {
    margin: 5px;
  }
}
</style>

