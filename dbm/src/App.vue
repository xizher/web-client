<template>
  <div id="app" class="app-container">
    <v-app id="inspire">
      <v-app-bar class="app-bar" app clipped-left>
        <v-app-bar-nav-icon @click="miniVariant = !miniVariant"></v-app-bar-nav-icon>
        <v-toolbar-title>Ngheizit's DBM Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch v-model="isThemeDark" hide-details></v-switch>
      </v-app-bar>
      <!-- <side-menu :mini-variant="miniVariant"></side-menu> -->
      <!-- <app-side-menu></app-side-menu> -->
      <app-side-menu2 :miniVariant="miniVariant"></app-side-menu2>
      <v-main>
        <router-view />
      </v-main>
      <v-footer class="footer" app>
        <span>&copy; Ngheizit</span>
        <span class="time">{{ nowTimeFormat }}</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, getCurrentInstance, onUnmounted, reactive, toRefs, watchEffect } from '@vue/composition-api';
import AppSideMenu from './components/menu/app-side-menu'
import AppSideMenu2 from './components/menu/app-side-menu2.vue'
interface IAppState {
  miniVariant: boolean // 侧边栏开关
  nowTime: Date // 当前时间
  nowTimeFormat: string // 当前时间格式化
  isThemeDark: boolean // 主题是否为暗风格
}
export default defineComponent({
  name: 'App',
  components: {
    'app-side-menu': AppSideMenu,
    'app-side-menu2': AppSideMenu2,
  },
  setup () {
    const { $vuetify } = getCurrentInstance() as any
    const appState: IAppState = reactive({
      miniVariant: false,
      nowTime: new Date(),
      nowTimeFormat: computed(() => appState.nowTime.format('MM/DD hh:mm:ss')),
      isThemeDark: $vuetify.theme.dark
    })
    watchEffect(() => $vuetify.theme.dark = appState.isThemeDark)
    const eventNum = setInterval(() => appState.nowTime = new Date())
    onUnmounted(() => clearInterval(eventNum))
    
    return {
      ...toRefs(appState as any),
    }
  }
})
</script>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
}
.app-bar {
  cursor: default;
}
.footer {
  .time {
    position: absolute;
    right: 16px;
  }
}
</style>
