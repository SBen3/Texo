import { TextLayer } from "@/app/types/canvas";
import { cn, colorToCss } from "@/lib/utils";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Kalam } from "next/font/google";
import { useMutation } from "@/liveblocks.config";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

interface textProp {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Text = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: textProp) => {
  const { x, y, width, height, fill, value } = layer;
  const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactore = 0.5;
    const fontSizeBasedOnHeight = height * scaleFactore;
    const fontSizeBasedOnWidth = width * scaleFactore;
    return Math.min(maxFontSize, fontSizeBasedOnHeight, fontSizeBasedOnWidth);
  };
  const updateValue = useMutation(({ storage }, newValue) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);
  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => {
        onPointerDown(e, id);
      }}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <ContentEditable
        html={value || "Text"} 
        onChange={handleContentChange}
        style={{
          color: colorToCss(fill),
          fontSize: calculateFontSize(width, height),
        }}
        className={cn(
          "w-full h-full flex justify-center items-center text-center drop-shadow-md outline-none",
          font.className,
        )}
      />
    </foreignObject>
  );
};
