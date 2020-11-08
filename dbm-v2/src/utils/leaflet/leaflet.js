import 'leaflet/dist/leaflet.css'
import $L from 'leaflet'

// 解决 leaflet 默认 maker 无法显示的问题
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
let DefaultIcon = $L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})
$L.Marker.prototype.options.icon = DefaultIcon

export function createMap (divId, options = {
  attributionControl: false,
  zoomControl: false
}) {
  const map = $L.map(divId, options)
  return map
}

export async function createTileLayer (map, url, options) {
  const tileLayer = await $L.tileLayer(url, options)
  tileLayer.addTo(map)
  return tileLayer
}

export function createMarker (map, coordinate, options) {
  let marker = $L.marker($L.latLng(coordinate[1], coordinate[0]), options)
  marker.addTo(map)
  return marker
}
