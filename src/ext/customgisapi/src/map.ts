import { IProjection } from './projection';
import { WebMercator } from './projection/web-mercator';
import { Extent, IGeometry } from './geometry'
import { CustomEvent } from '../../customevent'

export class Map extends CustomEvent {

  private _container : HTMLDivElement;
  private _canvas : HTMLCanvasElement;
  private _ctx : CanvasRenderingContext2D;

  private _drag : any = { // 地图拖拽状态管理
    flag: false,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  }
  private _geometries: IGeometry[] = [];
  private _zoom : number = 1;
  private _center : [number, number] = [0, 0];
  private _extext : Extent;
  private _projection : IProjection;

  get projection () : IProjection {
    return this._projection
  }

  constructor (id : string | HTMLDivElement) {
    super()
    this._container = id instanceof HTMLDivElement
      ? id
      : document.getElementById(id) as HTMLDivElement;
    this._canvas = document.createElement('canvas');
    this._canvas.style.cssText = `
      position: absolute; 
      height: 100%;
      width: 100%;
      z-index: 100;
    `;
    this._canvas.width = this._container.clientWidth;
    this._canvas.height = this._container.clientHeight;
    this._container.appendChild(this._canvas);
    this._ctx = this._canvas.getContext('2d');

    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onWheel = this._onWheel.bind(this);

    this._canvas.addEventListener('dblclick', this._onDoubleClick);
    this._canvas.addEventListener('mousedown', this._onMouseDown);
    this._canvas.addEventListener('mousemove', this._onMouseMove);
    this._canvas.addEventListener('mouseup', this._onMouseUp);
    this._canvas.addEventListener('wheel', this._onWheel);

    this._projection = new WebMercator();
    this._center = [0, 0];
    this._zoom = 3;
    const extent = this._projection.getExtent();
    this._ctx.setTransform(
      256 * Math.pow(2, this._zoom) / (extent.xmax - extent.xmin) * extent.xscale, 0, 0,
      256 * Math.pow(2, this._zoom) / (extent.ymax - extent.ymin) * extent.yscale, 0, 0
    );
  }

  setView (center : [number, number], zoom : number = this._zoom) {
    this._center = center;
    this._zoom = Math.max(1, Math.min(20, zoom));
    const [x, y] = this._projection.project(center);
    const extent : Extent = this._projection.getExtent();
    const [a, d] = [
      246 * Math.pow(2, this._zoom) / (extent.xmax - extent.xmin) * extent.xscale,
      246 * Math.pow(2, this._zoom) / (extent.ymax - extent.ymin) * extent.yscale
    ]
    const [e, f] = [
      this._canvas.width / 2 - a * x,
      this._canvas.height / 2 - d * y
    ]
    this._ctx.setTransform(a, 0, 0, d, e, f);
    this.redraw();
  }

  addGeometry (geometry : IGeometry) {
    geometry.draw(this._ctx);
    this._geometries.push(geometry);
  }

  updateExtent () {
    const matrix = this._ctx.getTransform();
    const [x1, y1, x2, y2] = [
      (0 - matrix.e) / matrix.a,
      (0 - matrix.f) / matrix.d,
      (this._canvas.width - matrix.e) / matrix.a,
      (this._canvas.height - matrix.f) / matrix.d
    ];
    this._extext = new Extent(
      Math.min(x1, x2), Math.min(y1, y2),
      Math.max(x1, x2), Math.max(y1, y2)
    );
    this._center= this._projection.unproject([(x1 + x2) / 2, (y1 + y2) / 2]);
    this.fire('extent-change', {
      extent: this._extext,
      center: this._center,
      zoom: this._zoom,
      matrix
    })
  }

  redraw () {
    this._ctx.save();
    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.restore();
    this.updateExtent();
    this._geometries.forEach(geometry => geometry.draw(this._ctx));
  }

  clear () {
    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  _onDoubleClick (event) {
    if (this._zoom >= 20) {
      return;
    }
    const scale = 2;
    this._zoom += 1;
    const matrix = this._ctx.getTransform();
    const { a, e, d, f } = matrix;
    const { x, y } = event;
    const te = (x - scale * (x - e) - e) / a;
    const tf = (y - scale * (y - f) - f) / d;
    this._ctx.transform(scale, 0, 0, scale, te, tf);
    this.redraw();
  }

  _onMouseDown (event) {
    this._drag.flag = true;
    this._drag.start.x = event.x;
    this._drag.start.y = event.y;
  }
  
  _onMouseMove (event) {
    if (this._drag.flag) {
      this._drag.end.x = event.x;
      this._drag.end.y = event.y;
      const matrix = this._ctx.getTransform();
      this._ctx.translate((this._drag.end.x - this._drag.start.x) / matrix.a, (this._drag.end.y - this._drag.start.y) / matrix.d);
      this.redraw();
      this._drag.start.x = event.x;
      this._drag.start.y = event.y;
    }
  }
  
  _onMouseUp (event) {
    if (this._drag.flag) {
      this._drag.end.x = event.x;
      this._drag.end.y = event.y;
      const matrix = this._ctx.getTransform();
      this._ctx.translate((this._drag.end.x - this._drag.start.x) / matrix.a, (this._drag.end.y - this._drag.start.y) / matrix.d);
      this.redraw();
    }
    this._drag.flag = false;
  }
  
  _onWheel (event) {
    event.preventDefault();
    let scale = 1;
    const sensitivity = 100;
    const delta = event.deltaY / sensitivity;
    if (delta < 0) {
      if (this._zoom >= 20) {
        return;
      }
      scale *= delta * -2;
    }
    else {
      if (this._zoom <= 3) {
        return;
      }
      scale /= delta * 2;
    }
    const zoom = Math.round(Math.log(scale));
    scale = Math.pow(2, zoom);
    this._zoom += zoom;
    const matrix = this._ctx.getTransform();
    const { a, e, d, f } = matrix;
    const { x, y } = event;
    const te = (x - scale * (x - e) - e) / a;
    const tf = (y - scale * (y - f) - f) / d;
    this._ctx.transform(scale, 0, 0, scale, te, tf);
    this.redraw();
  }

  destroy () {
    this._canvas.removeEventListener('dblclick', this._onDoubleClick);
    this._canvas.removeEventListener('mousedown', this._onMouseDown);
    this._canvas.removeEventListener('mousemove', this._onMouseMove);
    this._canvas.removeEventListener('mouseup', this._onMouseUp);
    this._canvas.removeEventListener('wheel', this._onWheel);
  }

}
