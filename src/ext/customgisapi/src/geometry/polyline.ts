import { IGeometry } from './geometry';
import { Extent } from './extent';
import { IProjection } from '../projection';
import { Map } from '../map';

export class Polyline implements IGeometry {

  private _coordinates : number[][];
  private _lonlats : number[][];
  private _projection: IProjection;
  private _extent : Extent;

  constructor (lonlats : number[][]) {
    this._lonlats = lonlats;
  }

  getExtent () : Extent {
    return this._extent;
  }

  addTo (map : Map) {
    this._projection = map.projection;
    this._coordinates = this._lonlats.map((point : [number, number]) => this._projection.project(point))
    let [xmin, ymin, xmax, ymax] = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MIN_VALUE, Number.MIN_VALUE];
    this._coordinates.forEach(point => {
      xmin = Math.min(xmin, point[0]);
      ymin = Math.min(ymin, point[1]);
      xmax = Math.max(xmax, point[0]);
      ymax = Math.max(ymax, point[1]);
    });
    this._extent = new Extent(xmin, ymin, xmax, ymax);
    map.addGeometry(this);
    return this
  }

  draw (ctx : CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const matrix = ctx.getTransform();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    this._coordinates.forEach((point, index) => {
      const [x, y] = [
        matrix.a * point[0] + matrix.e,
        matrix.d * point[1] + matrix.f
      ];
      index === 0
        ? ctx.moveTo(x, y)
        : ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.restore();
    return this
  }

}
