<template>
  <div class="system-config-container">
    <water-full>
      <div>
        <v-card>
          <v-card-text>
            <v-switch v-model="isThemeDark" label="系统主题：白色/黑色" hide-details></v-switch>
          </v-card-text>
          <!-- <v-card-actions>
            <v-btn text color="deep-purple accent-4">Learn More</v-btn>
          </v-card-actions> -->
        </v-card>
      </div>
      <div>
        <v-card>
          <v-card-text>
            <v-text-field v-model="$store.state.serverApi" label="系统接口地址" outlined hide-details></v-text-field>
          </v-card-text>
        </v-card>
      </div>
      <div>
        <v-card>
          <v-card-text>
            <v-btn @click="clickHandler">Toast测试</v-btn>
          </v-card-text>
        </v-card>
      </div>
    </water-full>
  </div>
</template>

<script>
import WaterFull from '../components/base/water-full'
import appConf from '@/config/app.conf.js'
import { useTheme } from '@/hooks/useVuetify'
import { showToast } from '@/ext/toast'
export default {
  name: 'SystemConfig',
  components: {
    'water-full': WaterFull
  },
  setup () {
    const { isThemeDark } = useTheme(appConf.theme)
    return {
      isThemeDark,
      clickHandler() {
        showToast({
          msg: 'Hello World 分噶尔噶未更改va22范围啊方法违法',
          type: 'warning'
        })
      }
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.system-config-container {
  margin: 16px;
}
</style>
