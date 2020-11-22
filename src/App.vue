<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="miniVariant = !miniVariant"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ appConf.appInfo.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="number-beauty">{{ weatherInfo }}</span>
    </v-app-bar>
    <v-navigation-drawer app clipped permanent :mini-variant="miniVariant">
      <v-list dense>
        <v-list-item link v-for="(item, index) in appConf.menuItems" :key="index" @click="linkTo(item.url)">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
    <v-footer class="footer-container" app>
      <span>{{ appConf.appInfo.copyright }}</span>
      <span class="number-beauty">{{ dateFormat }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import appConf from '@/config/app.conf.js'
import { useNow } from '@/hooks/useDate'
import { useWeather } from '@/hooks/useApi'
export default {
  name: 'App',
  setup () {
    const { dateFormat } = useNow('MM/dd hh:mm')

    const { weatherInfo } = useWeather()

    return {
      dateFormat,
      weatherInfo,
    }
  },
  data() {
    return {
      appConf,
      miniVariant: false
    }
  },
  methods: {
    linkTo (url) {
      this.$router.push(url)
    }
  },
  mounted () {
    // console.log(appConf)
  }
}
</script>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  > *:last-child {
    margin-left: auto;
  }
}
</style>
