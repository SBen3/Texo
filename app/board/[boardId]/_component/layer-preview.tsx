import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/app/types/canvas";
import { Rectangle } from "./rectangle";
import { memo } from "react";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";  

interface LayerPreviewProps {
  id: string;
  selectionColor: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
}

export const LayerPreview = memo(
  ({ id, selectionColor, onLayerPointerDown }: LayerPreviewProps) => {
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
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
        case LayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
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
