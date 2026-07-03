import { useStorage } from "@/liveblocks.config";
import { Color, LayerType } from "@/app/types/canvas";
import { Rectangle } from "./rectangle";
import { memo } from "react"; 

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown?: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: Color;
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers[id]);

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={()=>{}}
            selectionColor={selectionColor}
          />
        );
      default:
        console.warn("Unknown layer type");
        return null;
    }
  },
);
LayerPreview.displayName = "LayerPreview";
