import { useVzd } from '../../../../hooks/useProject'
import { DrawTool } from '../../../../map/esri/maptools/operationtools/drawtool/drawtool'

export class VzdTool extends DrawTool {

  constructor (map, view) {
    super(map, view, 'line-faster')

    this.drawer.setDrawingStyle({
      color: [0, 0, 0, .2],
      width: '6px'
    })

    this.drawer.setDrawedStyle({
      color: [0, 0, 0, .65],
      width: '6px'
    })
  }

  onDrawEnd (event) {
    if (super.onDrawEnd(event)) {
      const { getPixelData } = useVzd()
      console.log(event, getPixelData('GLC'))
      return true
    } else {
      return false
    }
  }

}
