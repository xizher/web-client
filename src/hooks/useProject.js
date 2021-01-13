import { reactive, toRefs } from 'vue'

const zdolState = reactive({
  minLon: 0,
  maxLon: 0,
  lat: 0
})
let pixelData = null

export function useZdol () {
  const setLonlat = options => {
    zdolState.minLon = options.minLon
    zdolState.maxLon = options.maxLon
    zdolState.lat = options.lat
  }
  const setPixelData = p => {
    pixelData = p
  }
  const getPixelData = () => {
    return pixelData
  }
  return {
    ...toRefs(zdolState),
    setLonlat,
    setPixelData,
    getPixelData,
  }
}
