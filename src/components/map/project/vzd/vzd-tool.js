import { Matrix } from '../../../../ext/spatialalgorithms/matrix/matrix'
import { useVzd } from '../../../../hooks/useProject'
import { DrawTool } from '../../../../map/esri/maptools/operationtools/drawtool/drawtool'
import { init } from 'echarts'
import { webMapOptions } from '../../../../config/app.conf'

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
      const { glc30Colormap } = webMapOptions
      /** @type {__esri.Polyline} */
      const line = event.geometry
      const [startPoint, endPoint] = [
        line.getPoint(0, 0),
        line.getPoint(0, 1),
      ]
      /** @type {__esri.PixelData} */
      const pixelDataDEM = getPixelData('DEM')
      const { extent, pixelBlock } = pixelDataDEM
      const matrix = new Matrix(pixelBlock.pixels[0], pixelBlock.height, pixelBlock.width, extent)
      const demData = matrix.getByGeoLine(startPoint, endPoint)

      /** @type {__esri.PixelData} */
      const pixelDataGLC = getPixelData('GLC')
      const glcData = new Matrix(pixelDataGLC.pixelBlock.pixels[0], pixelDataGLC.pixelBlock.height, pixelDataGLC.pixelBlock.width, pixelDataGLC.extent).getByGeoLine(startPoint, endPoint)
      console.log(glcData)
      const pieces = []
      let tempVal = glcData[0]
      let startIndex = 0
      let endIndex = 0
      for (let i = 0; i < glcData.length; i++) {
        const targetVal = glcData[i]
        if (targetVal !== tempVal) {
          pieces.push({
            gt: startIndex,
            lte: endIndex,
            color: glc30Colormap[tempVal].color
          })
          tempVal = targetVal
          startIndex = endIndex
          endIndex++
        } else {
          if (i === glcData.length - 1) {
            pieces.push({
              gt: startIndex,
              lte: endIndex,
              color: glc30Colormap[targetVal].color
            })
          } else {
            endIndex++
          }
        }
      }
      console.log(pieces)
      // const [startX, startY] = [
      //   Math.round((startPoint.x - extent.xmin) * (matrix.colCount - 0) / (extent.xmax - extent.xmin) + 0),
      //   Math.round(((extent.ymax - (startPoint.y - extent.ymin) - extent.ymin) * (matrix.rowCount - 0)) / (extent.ymax - extent.ymin) + 0)
      // ]
      // console.log(startPoint, endPoint, extent, matrix)
      const chart = init(document.getElementById('echarts-vzd-profile'))
      chart.setOption({
        grid: {
          bottom: '30px',
          top: '30px',
          right: 0,
          left: '40px'
        },
        title: {
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: pieces
        },
        series: [
          {
            name: '用电量',
            type: 'line',
            smooth: true,
            data: demData,
          }
        ]
      })

      return true
    } else {
      return false
    }
  }

}
