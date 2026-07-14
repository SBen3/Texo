import { Camera, Color } from "@/app/types/canvas";
import { useSelf, useMutation } from "@/liveblocks.config";
import { useSelectionBounds } from "@/app/hooks/use-selection-bounds";
import { ColorPicker } from "./color-picker";
import { memo } from "react";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const setFill = useMutation(
      ({ storage }, fill) => {
        const liveLayers = storage.get("layers");
        if(!liveLayers){
          return
        }
        setLastUsedColor(fill);
        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor],
    );

    const selectionBounds = useSelectionBounds();
    if (!selectionBounds) {
      return;
    }
    const x = selectionBounds.width / 2 + selectionBounds.x - camera.x;
    const y = selectionBounds.y - camera.y;
    return (
      <>
        <div
          className="absolute z-10 bg-white rounded-md p-2 border-2 border-black/5"
          style={{ transform: `translate(${x - 90}px, ${y - 80}px)` }}
        >
          <ColorPicker onChange={setFill} />
        </div>
      </>
    );
  },
);
SelectionTools.displayName = "SelectionTools";
