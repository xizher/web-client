import { IGeometry } from './geometry';
import { Extent } from './extent';
import { IProjection } from '../projection';
import { Map } from '../map';

export class Point implements IGeometry {

  static RADIUS : number = 10; // px

  private _x : number;
  private _y : number;
  private _lon : number;
  private _lat : number;
  private _projection : IProjection;
  private _exntent : Extent;

  constructor (lon : number, lat : number) {
    this._lon = lon;
    this._lat = lat;
  }

  getExtent () : Extent {
    return this._exntent;
  }

  addTo (map : Map) {
    this._projection = map.projection;
    [this._x, this._y] = this._projection.project([this._lon, this._lat]);
    this._exntent = new Extent(this._x, this._y, this._x, this._y);
    map.addGeometry(this);
    return this
  }

  draw (ctx : CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = '#ff0000';
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    const matrix = ctx.getTransform();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const [x, y] = [
      matrix.a * this._x + matrix.e,
      matrix.d * this._y + matrix.f
    ];
    ctx.arc(x, y, Point.RADIUS, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    return this
  }

}
