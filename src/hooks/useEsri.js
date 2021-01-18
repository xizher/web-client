import { onMounted, onUnmounted, ref } from 'vue'
import { useMap } from './useMap'

/**
 *
 * @param { import('esri/layers/ImageryLayer') } layer
 */
export function usePixelData (layer) {
  const updating = ref(null)
  let pixelData = null

  let watchHandler = null
  onUnmounted(() => {
    watchHandler && watchHandler.remove()
  })

  const { view } = useMap().getWebMap()
  view.whenLayerView(layer).then(layerView => {
    watchHandler = layerView.watch('updating', state => {
      if (state) {
        updating.value = true
      } else {
        updating.value = false
        pixelData = layerView.pixelData
      }
    })
  })

  return {
    updating,
    getPixelData: () => pixelData
  }

}

/**
 *
 * @param { "blur" | "click" | "double-click" | "drag" | "focus" | "hold" | "immediate-click" | "immediate-double-click" | "key-down" | "key-up" | "layerview-create" | "layerview-create-error" | "layerview-destroy" | "mouse-wheel" | "pointer-down" | "pointer-enter" | "pointer-leave" | "pointer-move" | "pointer-up" | "resize" } name
 * @param { __esri.MapV } callBack
 */
export function useViewOn (name, callback) {
  const { view } = useMap().getWebMap()
  let eventHandler = null

  onMounted(() => {
    eventHandler = view.on(name, callback)
  })

  onUnmounted(() => {
    eventHandler && eventHandler.remove()
  })
}
