import { Color, RectangleLayer } from "@/app/types/canvas";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: Color;
}

export const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height , fill} = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={()=>{}}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={selectionColor ? `rgb(${fill.r}, ${fill.g}, ${fill.b})` : "none"}
      stroke={selectionColor ? `rgb(${selectionColor.r}, ${selectionColor.g}, ${selectionColor.b})` : "none"}
    />
  );
};