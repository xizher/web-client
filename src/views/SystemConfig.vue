<template>
  <div class="system-config-container">
    <water-full>
      <div>
        <v-card>
          <v-card-title class="headline">主题样式</v-card-title>
          <v-card-text>
            <v-switch v-model="isThemeDark" label="白色/黑色" hide-details></v-switch>
          </v-card-text>
          <!-- <v-card-actions>
            <v-btn text color="deep-purple accent-4">Learn More</v-btn>
          </v-card-actions> -->
        </v-card>
      </div>
      <div>
        <v-card>
          <v-card-title class="headline">主题样式</v-card-title>
          <v-card-text>
            <v-text-field v-model="$store.state.serverApi" label="API根路径" outlined></v-text-field>
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
export default {
  name: 'SystemConfig',
  components: {
    'water-full': WaterFull
  },
  setup () {
    const { isThemeDark } = useTheme(appConf.theme)
    return {
      isThemeDark,
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
