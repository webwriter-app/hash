export type Point = { x: number; y: number };
export type Size = { width: number; height: number };
export type Rect = Point & Size;

export type GraphEngineOptions = {
  minZoom: number;
  maxZoom: number;
  zoomStep: number;
  defaultNodeSize: Size;
};

export type NodeKind = 'key' | 'hash' | 'value';