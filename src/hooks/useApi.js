import { WEATHER_API } from '@/config/api.conf'
import { computed, reactive } from '@vue/composition-api'
import { useAxios } from './useAjax'

export function useWeather () {
  const { doAxios, loading } = useAxios()
  const state = reactive({
    city: '',
    weatherInfos: {
      'tmp_max': '', 'tmp_min': '', 'wind_dir': '', 'wind_sc': ''
    },
  })

  const weatherInfo = computed(() => {
    if (loading.value) {
      return ''
    }
    const { city, weatherInfos: { 'tmp_min': tmpMin, 'tmp_max': tmpMmax, 'wind_dir': windDir, 'wind_sc': windSc } } = state
    return `${city} ${tmpMin}°C-${tmpMmax}°C ${windDir} ${windSc}级`
  })

  doAxios({
    method: 'get',
    url: WEATHER_API,
    byServerApi: false
  }).then(res => {
    const { basic, 'daily_forecast': dailyForecast } = res.HeWeather6[0] || {}
    state.city = basic.location
    for (const key in state.weatherInfos) {
      state.weatherInfos[key] = dailyForecast[0][key]
    }
  })

  return {
    weatherInfo
  }
}
