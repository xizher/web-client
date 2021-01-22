<template>
  <div class="application-container">
    <AppHeader />
    <div class="content">
      <transition name="fade">
        <div
          v-show="sideVisible"
          class="side"
        >
          <AppSide />
        </div>
      </transition>
      <div class="main">
        <div class="map-panel">
          <div style="display: flex">
            <div
              id="map-view-container"
              :style="{
                height: '100%', width: isSplitSceen ? '33.3%' : '100%'
              }"
            />
            <div
              v-show="isSplitSceen"
              id="map-view-container2"
              :style="{
                height: '100%', width: '33.3%'
              }"
            />
            <div
              v-show="isSplitSceen"
              id="map-view-container3"
              :style="{
                height: '100%', width: '33.3%'
              }"
            />
          </div>
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
          <div
            v-if="loaded"
            class="map-bottom-right-bar map-bar"
          >
            <PointerLocation />
          </div>
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
          <ZdolSlider v-if="loaded && selectedThemeUid === 2" />
          <ZdolViewer v-if="loaded && selectedThemeUid === 2" />
        </div>
      </div>
    </div>
    <!-- <div class="mouse-location-info">
      lon: {{ lon }}, lat: {{ lat }} | x: {{ x }}, y: {{ y }}
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref, watch, watchEffect } from 'vue'
import { WebMap } from './map/esri/mapinit/mapinit'
import { webMapOptions } from './config/app.conf'
import { Basemap, Hawkeye, Zoom, MapTools, PointerLocation, ZdolSlider, ZdolViewer } from './components/map'
import { Legend } from './components/glc30'
import { AppHeader, AppSide } from './components/app'
import { useMap } from './hooks/useMap'
import { useCAU } from './hooks/useProject'
export default {
  name: 'App',
  components: {
    Basemap,
    Hawkeye,
    Zoom,
    MapTools,
    Legend,
    PointerLocation,
    AppHeader,
    AppSide,
    ZdolSlider,
    ZdolViewer,
  },
  setup () {
    const { setWebMap } = useMap()

    const webMap = new WebMap('map-view-container', webMapOptions)
    setWebMap(webMap)
    window.webMap = webMap

    const sideVisible = ref(false)
    const legendVisible = ref(false)
    const { loaded, selectedThemeUid } = webMap.useHooks()
    watch(selectedThemeUid, val => console.log(val), { immediate: true })

    onMounted(() => {
      webMap.load()
    })

    const { isSplitSceen } = useCAU()
    watchEffect(() => {
      console.log(isSplitSceen.value)
    })


    return {
      sideVisible,
      legendVisible,
      loaded,
      selectedThemeUid,
      isSplitSceen,
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

