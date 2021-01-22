import { reactive, toRefs } from 'vue'

const zdol = {
  state: reactive({
    minLon: 0,
    maxLon: 0,
    lat: 0,
    loaded: false
  }),
  pixelData: null
}

export function useZdol () {
  const setLonlat = options => {
    zdol.state.minLon = options.minLon
    zdol.state.maxLon = options.maxLon
    zdol.state.lat = options.lat
  }
  const setPixelData = p => {
    zdol.pixelData = p
    zdol.state.loaded = true
  }
  const getPixelData = () => zdol.pixelData

  return {
    setLonlat, setPixelData, getPixelData,
    ...toRefs(zdol.state),
  }
}

const vzd = {
  pixelData: {
    GLC: null,
    DEM: null
  },
  state: reactive({
    loaded: false
  })
}

export function useVzd () {
  /**
   * @param { 'GLC' | 'DEM' } type
   */
  const getPixelData = type => vzd.pixelData[type.toUpperCase()]

  function setPixelData ({ glc, dem }) {
    vzd.pixelData.DEM = dem
    vzd.pixelData.GLC = glc
  }

  return {
    getPixelData, setPixelData,
    ...toRefs(vzd.state)
  }
}

const cau = {
  pixelData: {
    y2000: null,
    y2010: null,
    y2020: null,
  },
  state: reactive({
    loaded: false,
    isSplitSceen: false
  })
}

export function useCAU () {

  /**
   * @param { 'y2020' | 'y2010' | 'y2020' } type
   */
  const getPixelData = type => cau.pixelData[type]

  function setPixelData ({y2000, y2010, y2020 }) {
    cau.pixelData.y2000 = y2000,
    cau.pixelData.y2010 = y2010
    cau.pixelData.y2020 = y2020
  }

  return {
    getPixelData, setPixelData,
    ...toRefs(cau.state)
  }
}
