<template>
  <v-navigation-drawer app clipped permanent :mini-variant="miniVariant">
    <v-list dense>
      <v-list-item link v-for="(item, index) in menuList" :key="index" @click="linkTo(item.url)">
        <v-list-item-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { reactive, getCurrentInstance, defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'AppSideMenu2',
  props: {
    miniVariant: Boolean
  },
  setup (props) {
    const { $router, $route } = getCurrentInstance() as any
    const menuList = reactive([
      { title: '仪表盘', url: '/', icon: 'mdi-view-dashboard' },
      { title: '文档管理器', url: '/blog-manager', icon: 'mdi-file-document-multiple' },
      { title: '链接管理器', url: '/nav-manager', icon: 'mdi-link-box-variant' },
      { title: '口令管理器', url: '/pwd-manager', icon: 'mdi-form-textbox-password' },
      { title: '财务管理器', url: '/money-manager', icon: 'mdi-cash-usd' },
      { title: '系统配置', url: '/web-config', icon: 'mdi-cog-box' },
      { title: '关于', url: '/about', icon: 'mdi-information' },
    ])
    const linkTo = (url: string) => $router.push(url)
    
    return {
      menuList, linkTo
    }
  }
})
</script>

<style lang="scss" scoped>

</style>