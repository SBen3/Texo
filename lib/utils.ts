import { Camera, Color, Point, Side, XYWH } from "@/app/types/canvas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/app/types/canvas";

const COLORS = [
  "#E57373", // red
  "#F06292", // pink
  "#BA68C8", // purple
  "#64B5F6", // blue
  "#4DB6AC", // teal
  "#81C784", // green
  "#FFD54F", // yellow
  "#FF8A65", // orange
  "#90A4AE", // gray-blue
  "#A1887F", // brown
];

export const connectionIdToColor = (connectionId: number): string => {
  return COLORS[connectionId % COLORS.length];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const pointerEventToCanvasPoint = (
  e: React.PointerEvent,
  camera: Camera,
) => {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
};
export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}
export function findIntersectingWithRectangle(
  layerIds: LiveList<string>,
  layers: LiveMap<string, LiveObject<Layer>>,
  a: Point,
  b: Point,
) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    with: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };
  const ids = [];
  for (const layerId of layerIds) {
    const layer = layers.get(layerId);
    if (layer == null) {
      continue;
    }
    const x = layer.get("x");
    const y = layer.get("y");
    const width = layer.get("width");
    const height = layer.get("height");
    if (
      rect.x + rect.with > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height
    )
      ids.push(layerId);
  }
  return ids;
}
