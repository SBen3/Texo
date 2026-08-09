import { Camera, Color, XYWH } from "@/app/types/canvas";
import { useSelf, useMutation } from "@/liveblocks.config";
import { useSelectionBounds } from "@/app/hooks/use-selection-bounds";
import { ColorPicker } from "./color-picker";
import { memo } from "react";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { useDeleteLayers } from "./use-delete-layers";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LiveList } from "@liveblocks/client";
interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayersIds = storage.get("layerIds");
        const indices: number[] = [];
        const arr = Array.from(liveLayersIds);

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }
        for (let i = 0; i < indices.length; i++) {
          liveLayersIds.move(indices[i], i);
        }
      },
      [selection],
    );
    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayersIds = storage.get("layerIds");
        const indices: number[] = [];
        const arr = Array.from(liveLayersIds);

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }
        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayersIds.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i),
          );
        }
      },
      [selection],
    );

    const deleteLayers = useDeleteLayers();
    const setFill = useMutation(
      ({ storage }, fill) => {
        const liveLayers = storage.get("layers");
        if (!liveLayers) {
          return;
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
    function getToolbarPosition(
      selectionBounds: XYWH,
      camera: Camera,
      toolbarWidth = 320,
      toolbarHeight = 70,
      gap = 20,
    ) {
      const layerLeft = selectionBounds.x + camera.x + gap;
      const layerTop = selectionBounds.y + camera.y - (gap + gap / 2);
      const layerCenterX = layerLeft + selectionBounds.width / 2;

      let x = layerCenterX - toolbarWidth / 2;
      let y = layerTop - toolbarHeight - gap;

      const padding = 8;
      x = Math.max(
        padding,
        Math.min(x, window.innerWidth - toolbarWidth - padding),
      );
      if (y < padding) {
        y = layerTop + selectionBounds.height + gap * 2;
      }

      return { x, y };
    }
    const { x, y } = getToolbarPosition(selectionBounds, camera);

    return (
      <div
        className="absolute z-10 flex items-center gap-2 bg-white rounded-md p-2 border-2 border-black/5"
        style={{
          transform: `translate(${x}px, ${y}px)`,
        }}
      >
        <ColorPicker onChange={setFill} />

        <div className="flex flex-col">
          <Hint label="Bring to Front">
            <Button variant={"board"} onClick={moveToFront}>
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Send to Back" side="bottom">
            <Button variant={"board"} onClick={moveToBack}>
              <SendToBack />
            </Button>
          </Hint>
        </div>

        <Hint label="delete">
          <button
            className="flex text-sm mr-1 p-1 rounded hover:bg-red-100 text-red-600 font-medium"
            onClick={deleteLayers}
          >
            <Trash2 size={20} />
          </button>
        </Hint>
      </div>
    );
  },
);
SelectionTools.displayName = "SelectionTools";
