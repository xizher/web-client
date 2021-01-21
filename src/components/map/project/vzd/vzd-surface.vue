<template>
  <div
    id="echarts-vzd-surface"
    style="height: 50%;"
  />
</template>

<script>
import { watch } from 'vue'
import { useVzd } from '../../../../hooks/useProject'
import { Matrix } from '../../../../ext/spatialalgorithms/matrix/matrix'
import { init } from 'echarts'
import { webMapOptions } from '../../../../config/app.conf'
import 'echarts-gl'
export default {
  name: 'VzdSurface',
  setup() {

    const { getPixelData, loaded } = useVzd()

    watch(loaded, val => {
      if (val) {

        /** @type {__esri.PixelData} */
        const pixelDataGLC = getPixelData('GLC')
        const { glc30Colormap } = webMapOptions
        const matrixGlc = new Matrix(pixelDataGLC.pixelBlock.pixels[0], pixelDataGLC.pixelBlock.height, pixelDataGLC.pixelBlock.width, pixelDataGLC.extent)

        /** @type {__esri.PixelData} */
        const pixelDataDEM = getPixelData('DEM')
        const { extent, pixelBlock } = pixelDataDEM
        const matrix = new Matrix(pixelBlock.pixels[0], pixelBlock.height, pixelBlock.width, extent)
        let startHeight = null, startWidth = null
        let endHeight = null, endWidth = null
        for (let i = 0; i < pixelBlock.height; i++) {
          for (let j = 0; j < pixelBlock.width; j++) {
            if (matrix.get(i)(j) !== 0) {
              if (startHeight === null) {
                startHeight = i
                startWidth = j
              }
              break
            }
          }
        }
        for (let i = pixelBlock.height - 1; i >= 0; i--) {
          for (let j = pixelBlock.width - 1; j >= 0; j--) {
            if (matrix.get(i)(j) !== 0) {
              if (endHeight === null) {
                endHeight = i
                endWidth = j
              }
              break
            }
          }
        }
        const arr = []
        const arrGlc = []
        console.log(startHeight, endHeight, startWidth, endWidth)
        for (let i = startHeight; i <= endHeight; i++) {
          const tempArr = []
          const tempArrGlc = []
          for (let j = startWidth; j <= endWidth; j++) {
            tempArr.push(matrix.get(i)(j))
            tempArrGlc.push(matrixGlc.get(i)(j))
          }
          arr.push(tempArr)
          arrGlc.push(tempArrGlc)
        }


        console.log(arr)


        const chart = init(document.getElementById('echarts-vzd-surface'))
        chart.setOption({
          tooltip: {},
          // backgroundColor: '#000',
          xAxis3D: {
            type: 'value'
          },
          yAxis3D: {
            type: 'value'
          },
          zAxis3D: {
            type: 'value'
          },
          grid3D: {
            viewControl: {
              // projection: 'orthographic'
            }
          },
          series: [{
            type: 'surface',
            silent: true,
            wireframe: {
              // show: false
            },
            itemStyle: {
              color: function (params) {
                let i = params.dataIndex
                if (i < 10) {
                  console.log(params)
                }
                const val = arrGlc[arr.length - 1 - Math.floor(i / arr[0].length)][i % arr[0].length]
                // // const value = arrGlc[endHeight - startHeight - 1 - i % arr[0].length][Math.floor(i / arr[0].length)] || 0
                // // console.log(val)
                return glc30Colormap[val]?.color ?? '#ffffff'
                // return '#ff0000'
              }
            },
            equation: {
              x: {
                step: 1,
                min: 0,
                max: endWidth - startWidth,
              },
              y: {
                step: 1,
                min: 0,
                max: endHeight - startHeight,
              },
              z: function (x, y) {
                if (x < 0 || y < 0) {
                  return '-'
                }
                // return 0
                return arr[endHeight - startHeight - y][x] || 0
              }
            }
          }]
        })
      }
    })

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
