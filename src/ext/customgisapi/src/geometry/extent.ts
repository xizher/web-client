export class Extent {

  private _xmin : number;
  private _ymin : number;
  private _xmax : number;
  private _ymax : number;
  private _xscale : number = 1; // 1 => x方向为自西向东，-1反之
  private _yscale : number = 1; // 1 => y方向为自北向南，-1反之

  get xmin () : number { return this._xmin; }
  get ymin () : number { return this._ymin; }
  get xmax () : number { return this._xmax; }
  get ymax () : number { return this._ymax; }
  get xscale () : number { return this._xscale; }
  get yscale () : number { return this._yscale; }

  constructor (xmin, ymin, xmax, ymax) {
    this._xmin = Math.min(xmin, xmax);
    this._ymin = Math.min(ymin, ymax);
    this._xmax = Math.max(xmin, xmax);
    this._ymax = Math.max(ymin, ymax);
    this._xscale = xmin <= xmax ? 1 : -1;
    this._yscale = ymin <= ymax ? 1 : -1;
  }

  getCenter () : number[] {
    return [
      (this._xmin + this._xmax) / 2,
      (this._ymin + this._ymax) / 2
    ];
  }

  intersect (extent : Extent) : boolean {
    return (
      extent.xmax >= this._xmin
      && extent.xmin <= this._xmax
      && extent.ymax >= this._ymin
      && extent.ymin <= this._ymax
    );
  }

  scale (s : number) {
    this._xmin = this._xmin - (s - 1) * (this._xmax - this._xmin) / 2;
    this._xmax = this._xmax + (s - 1) * (this._xmax - this._xmin) / 2;
    this._ymin = this._ymin - (s - 1) * (this._ymax - this._ymin) / 2;
    this._ymax = this._ymax + (s - 1) * (this._ymax - this._ymin) / 2;
  }

}