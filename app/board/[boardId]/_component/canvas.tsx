import { Info } from "./info";
import { Participant } from "./participant";
import { Toolbar } from "./toolbar";
import {
  useSelf,
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
  useStorage,
  useOthersMapped,
} from "@/liveblocks.config";
import {
  CanvasState,
  CanvasMode,
  Camera,
  LayerType,
  Point,
  Color,
} from "@/app/types/canvas";
import { useState, useCallback, useMemo } from "react";
import { connectionIdToColor, pointerEventToCanvasPoint } from "@/lib/utils";
import { CursorsPresence } from "./cursors-presence";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
interface CanvasProps {
  boardId: string;
}
const MAX_LAYERS = 100;
export const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);
      setMyPresence({ cursor: current });
    },
    [camera],
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 200,
    g: 50,
    b: 0,
  });
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor],
  );
  const onPointerUp = useMutation(
    ({}, e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer],
  );
  const layerIds = useStorage((root) => root.layerIds);
  // we enter onPointerDown "selection: [layerId]", cursor ydi LayerId ta3 layer , w ndiro "selection" bch na3arfo layer li tsilakto w yfot fihom "layerId" w "layerId" njbdo connectionId (color)
  const selections = useOthersMapped((other) => other.presence.selection);
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};
    for (const user of selections) {
      const [connectionId, selection] = user;
      for (const layerId of selection)
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
    }
    return layerIdsToColorSelection;
  }, [selections]);
  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history],
  );
  return (
    <div>
      <Info boardId={boardId} />
      <Participant />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <svg
        className="w-screen h-screen"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              selectionColor={layerIdsToColorSelection[layerId]}
              onLayerPointerDown={onLayerPointerDown}
            />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </div>
  );
};
