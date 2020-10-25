<template>
  <span v-show="isLoaded" class="weather-box">
    {{showInfos}}
  </span>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api'
export default defineComponent({
  name: 'WeatherBox',
  setup () {
    const { axiosGet } = WXZ.Ajax
    const weatherState = reactive({
      city: '',
      weatherInfos: {
        tmp_max: '', tmp_min: '', wind_dir: '', wind_sc: ''
      },
      loadWeatherInfos () {
        axiosGet('https://free-api.heweather.com/s6/weather/forecast?key=bfe208dbbab24761bee522346c1c0779&location=113.69.213.16', {}, {
          localhost: false
        }).then(res => {
          const { basic, daily_forecast } = res.HeWeather6[0] || {}
          weatherState.city = basic.location
          for (const key in weatherState.weatherInfos) {
            weatherState.weatherInfos[key] = daily_forecast[0][key]
          }
        }).catch(err => {})
      },
      showInfos: computed(() => {
        const { city, weatherInfos: { tmp_min, tmp_max, wind_dir, wind_sc } } = weatherState
        return `${city} ${tmp_min}°C-${tmp_max}°C ${wind_dir} ${wind_sc}级`
      }),
      isLoaded: computed(() => {
        const { city, weatherInfos: { tmp_min, tmp_max, wind_dir, wind_sc } } = weatherState
        return city && tmp_min && tmp_max && wind_dir && wind_sc
          ? true
          : false
      })
    })
    onMounted(weatherState.loadWeatherInfos)
    return {
      ...toRefs(weatherState)
    }
  }
})
</script>

<style lang="scss" scoped>
.weather-box {
  // 单行文本不换行
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // end
}
</style>
