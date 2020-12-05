import { Extent } from "./extent";
import { Map } from "../map";

export interface IGeometry {
  getExtent () : Extent;
  addTo (map: Map) : IGeometry
  draw (ctx: CanvasRenderingContext2D) : IGeometry
}