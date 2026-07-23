import { NoteLayer } from "@/app/types/canvas";
import { cn, colorToCss, getConstractingTextColor } from "@/lib/utils";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Kalam } from "next/font/google";
import { useMutation } from "@/liveblocks.config";
const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

interface noteProp {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Note = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: noteProp) => {
  const { x, y, width, height, fill, value } = layer;
  const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactore = 0.10;
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
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        style={{
          color: fill ? getConstractingTextColor(fill) : "#000",
          fontSize: calculateFontSize(width, height),
          backgroundColor : fill ? colorToCss(fill) : "#000"
        }}
        className={cn(
          "w-full h-full flex p-2 drop-shadow-md outline-none rounded-md",
          font.className,
        )}
      />
    </foreignObject>
  );
};
