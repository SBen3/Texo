import { Camera, Color } from "@/app/types/canvas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
