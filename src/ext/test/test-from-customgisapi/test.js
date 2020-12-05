import { Map, Point, Polyline, Polygon } from '../../customgisapi'
import { 
  isFromMobileBrowser
} from '../../js.utils'

console.log(isFromMobileBrowser())

window.load = () => {
  const amap = new AMap.Map('amap', {
    fadeOnZoom: false,
    navigationMode: 'classic',
    optimizePanAnimation: false,
    animateEnable: false,
    dragEnable: false,
    zoomEnable: false,
    resizeEnable: true,
    doubleClickZoom: false,
    keyboardEnable: false,
    scrollWheel: false,
    expandZoomRange: true,
    zooms: [1, 20],
    mapStyle: 'normal',
    features: ['road', 'point', 'bg'],
    viewMode: '2D',
  })

  const map = new Map('foo')
  map.on('extent-change', event => {
    amap.setZoomAndCenter(event.zoom, event.center)
  })
  for (let i = -180; i <= 180; i += 10) {
    const line = new Polyline([[i, -80], [i, 80]])
    line.addTo(map)
  }
  for (let i = -80; i <= 80; i += 10) {
    const line = new Polyline([[-180, i], [180, i]])
    line.addTo(map)
  }
  for (let i = -180; i <= 180; i += 10) {
    for (let j = -90; j <= 80; j += 10) {
      const point = new Point(i, j)
      point.addTo(map)
    }
  }

  const point = new Point(116.397411, 39.909186)
  point.addTo(map)

  map.setView([0, 0], 5)

}