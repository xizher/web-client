import { Extent } from '../geometry'
import { IProjection } from './projection'

export class WebMercator implements IProjection {

  static R : number = 6378137;

  getExtent () : Extent {
    const PIR = Math.PI * WebMercator.R;
    return new Extent(-PIR, PIR, PIR, -PIR);
  }

  project ([lon, lat] : [number, number]) : [number, number] {
    const d = Math.PI / 180;
    const sin = Math.sin(lat * d)
    return [
      WebMercator.R * lon * d,
      WebMercator.R * Math.log((1 + sin) / (1 - sin)) / 2
    ];
  }

  unproject ([x, y] : [number, number]) : [number, number] {
    const d = 180 / Math.PI;
    return [
      x * d / WebMercator.R,
      (2 * Math.atan(Math.exp(y / WebMercator.R)) - (Math.PI / 2)) * d
    ];
  }

}
