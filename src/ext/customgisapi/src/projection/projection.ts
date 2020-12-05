import { Extent } from '../geometry'

export interface IProjection {
  project ([lon, lat] : [number, number]) : [number, number]; // 球面坐标转平面坐标
  unproject ([x, y] : [number, number]) : [number, number]; // 平面坐标转球面坐标
  getExtent () : Extent // 投影系统的坐标范围
}