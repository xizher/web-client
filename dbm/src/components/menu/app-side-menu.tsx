import { defineComponent, getCurrentInstance, reactive } from '@vue/composition-api';

export default defineComponent({
  name: 'AppSideMenu',
  props: {
    miniVariant: Boolean
  },
  setup (props) {
    const { $router } = getCurrentInstance() as any
    const menuList = reactive([
      { title: '仪表盘', url: '/', icon: 'mdi-view-dashboard' },
      { title: '文档管理器', url: '/blog-manager', icon: 'dns' },
      { title: '链接管理器', url: '/nav-manager', icon: 'dns' },
    ])
    const linkTo = (url: string) => $router.push(url)

    return () => <v-navigation-drawer  app clipped permanent mini-variant={ props.miniVariant }>
      <v-list dense>
        {
          menuList.map(item => <v-list-item onClick={ linkTo(item.url) }>
            <v-list-item-action>
              <v-icon>{ item.icon }</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{ item.title }</v-list-item-title>
            </v-list-item-content>
          </v-list-item>)
        }
      </v-list>
    </v-navigation-drawer>
  }
})