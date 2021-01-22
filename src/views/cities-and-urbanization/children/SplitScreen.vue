<template>
  <div>
    SplitScreen
  </div>
</template>

<script>
import { onUnmounted } from 'vue'
import { useCAU } from '../../../hooks/useProject'
import { esri } from '../../../map/esri'
import { useMap } from '../../../hooks/useMap'
export default {
  name: 'SplitScreen',
  setup() {
    const { isSplitSceen } = useCAU()
    isSplitSceen.value = true
    onUnmounted(() => {
      isSplitSceen.value = false
    })

    const { layerOperation, view } = useMap().getWebMap()
    layerOperation.layers.forEach(item => item.targetLayer.visible = false)
    layerOperation.findLayerByName('长三角2000年地表覆盖png').visible = true

    const layer2010 = layerOperation.cloneLayer('长三角2010年地表覆盖png')
    const layer2020 = layerOperation.cloneLayer('长三角2020年地表覆盖png')
    layer2010.visible = true
    layer2020.visible = true

    const map2010 = new esri.Map({
      basemap: {
        // baseLayers: [new esri.layers.WebTileLayer({
        //   urlTemplate: 'http://192.168.0.108:4140/arcgis/rest/services/GLC30/WorldLand/MapServer/tile/{level}/{row}/{col}'
        // })]
      },
      layers: [layer2010]
    })
    const view2010 = new esri.views.MapView({
      container: 'map-view-container2',
      map: map2010,
      constraints: {
        // snapToZoom: false,
        minZoom: 3
      },
      ui: {
        components: []
      },
    })


    const map2020 = new esri.Map({
      basemap: {
        // baseLayers: [new esri.layers.WebTileLayer({
        //   urlTemplate: 'http://192.168.0.108:4140/arcgis/rest/services/GLC30/WorldLand/MapServer/tile/{level}/{row}/{col}'
        // })]
      },
      layers: [layer2020]
    })
    const view2020 = new esri.views.MapView({
      container: 'map-view-container3',
      map: map2020,
      constraints: {
        // snapToZoom: false,
        minZoom: 3
      },
      ui: {
        components: []
      },
    })

    const remove = synchronizeViews([view, view2010, view2020])
    onUnmounted(() => {
      remove.remove()
      map2010.destroy()
      map2020.destroy()
      view2010.destroy()
      view2020.destroy()
    })

    console.log(view2010, view2020)

    return {

    }
  }
}
function synchronizeView (view, others) {
  others = Array.isArray(others) ? others : [others]

  let viewpointWatchHandle
  let viewStationaryHandle
  let otherInteractHandlers
  let scheduleId

  let clear = function () {
    if (otherInteractHandlers) {
      otherInteractHandlers.forEach(function (handle) {
        handle.remove()
      })
    }
    viewpointWatchHandle && viewpointWatchHandle.remove()
    viewStationaryHandle && viewStationaryHandle.remove()
    scheduleId && clearTimeout(scheduleId)
    otherInteractHandlers = viewpointWatchHandle = viewStationaryHandle = scheduleId = null
  }

  let interactWatcher = view.watch('interacting,animation', function (
    newValue
  ) {
    if (!newValue) {
      return
    }
    if (viewpointWatchHandle || scheduleId) {
      return
    }

    // start updating the other views at the next frame
    scheduleId = setTimeout(function () {
      scheduleId = null
      viewpointWatchHandle = view.watch('viewpoint', function (
        newValue
      ) {
        others.forEach(function (otherView) {
          otherView.viewpoint = newValue
        })
      })
    }, 0)

    // stop as soon as another view starts interacting, like if the user starts panning
    otherInteractHandlers = others.map(function (otherView) {
      return esri.core.watchUtils.watch(
        otherView,
        'interacting,animation',
        function (value) {
          if (value) {
            clear()
          }
        }
      )
    })

    // or stop when the view is stationary again
    viewStationaryHandle = esri.core.watchUtils.whenTrue(
      view,
      'stationary',
      clear
    )
  })

  return {
    remove: function () {
      this.remove = function () {}
      clear()
      interactWatcher.remove()
    }
  }
}

function synchronizeViews (views) {
  let handles = views.map(function (view, idx, views) {
    let others = views.concat()
    others.splice(idx, 1)
    return synchronizeView(view, others)
  })

  return {
    remove: function () {
      this.remove = function () {}
      handles.forEach(function (h) {
        h.remove()
      })
      handles = null
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
