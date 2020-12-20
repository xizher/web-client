<template>
  <div class="application-container">
    <div class="header">
      <div class="header-left-bar header-bar" />
      <div class="header-right-bar header-bar">
        <div class="vertical-bar" />
      </div>
    </div>
    <div class="content">
      <transition name="fade">
        <div
          v-show="sideVisible"
          class="side"
        >
          <div class="side-title" />
          <div class="side-content">
            <a-select
              style="width: 80%;"
            >
              <a-select-option value="jack">
                自然地理环境的地域差异
              </a-select-option>
              <a-select-option value="lucy">
                城市与城市化
              </a-select-option>
              <a-select-option value="Yiminghe">
                区域生态环境建设
              </a-select-option>
              <a-select-option value="Yiminghe2">
                区域自然资源的综合开发与利用
              </a-select-option>
            </a-select>
          </div>
        </div>
      </transition>
      <div class="main">
        <div class="map-panel">
          <div id="map-view-container" />
          <div
            v-if="loaded"
            class="map-top-left-bar map-bar"
          >
            <Zoom />
          </div>
          <div
            v-if="loaded"
            class="map-top-right-bar map-bar"
          >
            <Basemap />
            <Hawkeye />
          </div>
          <div
            v-if="loaded"
            class="map-bottom-left-bar map-bar"
          >
            <MapTools />
          </div>
          <div class="map-bottom-right-bar map-bar" />
          <div
            class="side-panel-switch"
            :class="sideVisible ? 'side-panel-switch__opend' : 'side-panel-switch__closed'"
            @click="sideVisible = !sideVisible"
          />
          <div
            class="legend-panel-switch"
            :class="legendVisible ? 'legend-panel-switch__opend' : 'legend-panel-switch__closed'"
            @click="legendVisible = !legendVisible"
          />
          <transition name="slide-fade">
            <div v-if="legendVisible">
              <Legend />
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- <div class="mouse-location-info">
      lon: {{ lon }}, lat: {{ lat }} | x: {{ x }}, y: {{ y }}
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { WebMap } from './map/esri/mapinit/mapinit'
import { webMapOptions } from './config/app.conf'
import { Basemap, Hawkeye, Zoom, MapTools } from './components/map'
import { Legend } from './components/glc30'
import { useMap } from './hooks/useMap'
export default {
  name: 'App',
  components: {
    Basemap,
    Hawkeye,
    Zoom,
    MapTools,
    Legend,
  },
  setup () {
    const { setWebMap } = useMap()

    const webMap = new WebMap('map-view-container', webMapOptions)
    setWebMap(webMap)
    window.webMap = webMap

    const sideVisible = ref(false)
    const legendVisible = ref(false)
    const { loaded } = webMap.useHooks()

    onMounted(() => {
      webMap.load()
    })

    return {
      sideVisible,
      legendVisible,
      loaded,
    }
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>

