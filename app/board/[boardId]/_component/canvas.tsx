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
  XYWH,
  Side,
} from "@/app/types/canvas";
import { useState, useCallback, useMemo } from "react";
import {
  colorToCss,
  connectionIdToColor,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "@/lib/utils";
import { CursorsPresence } from "./cursors-presence";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";
interface CanvasProps {
  boardId: string;
}
import { findIntersectingWithRectangle } from "@/lib/utils";
import { penPointsToPathLayer } from "@/lib/utils";
import { Path } from "./path";
import { useDisableScrollBounce } from "@/app/hooks/use-disable-scroll-bounce";
import { useEffect, useRef } from "react";
import { useDeleteLayers } from "./use-delete-layers";

const MAX_LAYERS = 100;
export const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info);
  const pencilDraft = useSelf((me) => me.presence.pencilDraft);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  useDisableScrollBounce();
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, scale: 1 });
  const MIN_ZOOM = 0.25;
  const MAX_ZOOM = 3;

  const zoomOut = useCallback(() => {
    setCamera((camera) => ({
      ...camera,
      scale: Math.max(camera.scale / 1.1, MIN_ZOOM),
    }));
  }, []);
  const touchStartRef = useRef<{
    dist: number;
    camera: Camera;
    center: Point;
  } | null>(null);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        setCanvasState({ mode: CanvasMode.None });

        const t1 = e.touches[0];
        const t2 = e.touches[1];

        const dist = Math.hypot(
          t1.clientX - t2.clientX,
          t1.clientY - t2.clientY,
        );
        const center = {
          x: (t1.clientX + t2.clientX) / 2,
          y: (t1.clientY + t2.clientY) / 2,
        };

        touchStartRef.current = { dist, camera: { ...camera }, center };
      }
    },
    [camera],
  );
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartRef.current) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];

      const currentDist = Math.hypot(
        t1.clientX - t2.clientX,
        t1.clientY - t2.clientY,
      );
      const currentCenter = {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      };

      if (touchStartRef.current.dist === 0) return;

      const scaleFactor = currentDist / touchStartRef.current.dist;
      const newScale = Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, touchStartRef.current.camera.scale * scaleFactor),
      );

      const deltaX = currentCenter.x - touchStartRef.current.center.x;
      const deltaY = currentCenter.y - touchStartRef.current.center.y;

      setCamera({
        x: touchStartRef.current.camera.x + deltaX,
        y: touchStartRef.current.camera.y + deltaY,
        scale: newScale,
      });
    }
  }, []);

const onTouchEnd = useMutation(({ setMyPresence }) => {
  touchStartRef.current = null;
  setMyPresence({ cursor: null });
}, []);
  const resetZoom = useCallback(() => {
    setCamera((camera) => ({
      ...camera,
      scale: 1,
    }));
  }, []);
  const onWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      setCamera((prev) => {
        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        const newScale = Math.min(
          MAX_ZOOM,
          Math.max(MIN_ZOOM, prev.scale * zoomFactor),
        );
        return { ...prev, scale: newScale };
      });
      return;
    }

    setCamera((prev) => ({
      ...prev,
      x: prev.x - e.deltaX,
      y: prev.y - e.deltaY,
    }));
  }, []);
  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history],
  );
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point,
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState],
  );

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setCamera((camera) => ({
        x: camera.x - e.deltaX,
        y: camera.y - e.deltaY,
        scale: camera.scale,
      }));
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const deleteLayers = useDeleteLayers();
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        if (e.shiftKey) {
          history.redo();
        } else {
          history.undo();
        }
      } else if (e.key === "Delete") {
        deleteLayers();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [history, deleteLayers]);

const translateSelectedLayers = useMutation(
  ({ storage, self }, point: Point) => {
    if (canvasState.mode !== CanvasMode.Translating || !canvasState.current) return;

    const offset = {
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y,
    };

    const liveLayers = storage.get("layers");

    for (const id of self.presence.selection) {
      const layer = liveLayers.get(id);
      if (layer) {
        layer.update({
          x: layer.get("x") + offset.x,
          y: layer.get("y") + offset.y,
        });
      }
    }
    setCanvasState({
      mode: CanvasMode.Translating,
      current: point,
    });
  },
  [canvasState]
);
  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x + (current.y - origin.y))) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        current,
        origin,
      });
    }
  }, []);
  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers");
      const layerIds = storage.get("layerIds");
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        current,
        origin,
      });
      const ids = findIntersectingWithRectangle(
        layerIds,
        layers,
        current,
        origin,
      );
      setMyPresence({ selection: ids });
    },
    [],
  );
  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;
      if (
        canvasState.mode !== CanvasMode.Pencil ||
        e.buttons !== 1 ||
        pencilDraft == null
      ) {
        return;
      }
      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft?.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft!, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode],
  );
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
const onPointerMove = useMutation(
  ({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();

    if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);

    if (canvasState.mode === CanvasMode.Translating && canvasState.current) {
      const deltaX = e.clientX - canvasState.current.x;
      const deltaY = e.clientY - canvasState.current.y;

      setCamera((prev) => ({
        ...prev,
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      setCanvasState({
        mode: CanvasMode.Translating,
        current: { x: e.clientX, y: e.clientY },
      });
      
      return;
    }

    const current = pointerEventToCanvasPoint(e, camera);
    setMyPresence({ cursor: current });

    cursorTimeoutRef.current = setTimeout(() => {
      setMyPresence({ cursor: null });
    }, 1000);

    if (canvasState.mode === CanvasMode.Pressing) {
      startMultiSelection(current, canvasState.origin);
    } else if (canvasState.mode === CanvasMode.SelectionNet) {
      updateSelectionNet(current, canvasState.origin);
    } else if (canvasState.mode === CanvasMode.Resizing) {
      resizeSelectedLayer(current);
    } else if (canvasState.mode === CanvasMode.Pencil) {
      continueDrawing(current, e);
    }
  },
  [canvasState, camera]
);
const onPointerLeave = useMutation(({ setMyPresence }) => {
  setMyPresence({ cursor: null });
}, []);
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 200,
    g: 200,
    b: 100,
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
  const unSelectedLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);
  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;
      if (
        pencilDraft == null ||
        pencilDraft.length === 0 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ pencilDraft: null });
      }
      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft!, lastUsedColor)),
      );
      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);
      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: CanvasMode.Pencil });
      return;
    },
    [lastUsedColor],
  );
const onPointerUp = useMutation(
  ({ setMyPresence }, e: React.PointerEvent) => {
    const point = pointerEventToCanvasPoint(e, camera);
    
    setMyPresence({ cursor: null });

    if (canvasState.mode === CanvasMode.Translating) {
      setCanvasState({ mode: CanvasMode.None });
    } else if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layerType, point);
    } else if (
      canvasState.mode === CanvasMode.Pressing ||
      canvasState.mode === CanvasMode.None
    ) {
      unSelectedLayers();
      setCanvasState({ mode: CanvasMode.None });
    } else if (canvasState.mode === CanvasMode.Pencil) {
      insertPath();
    } else {
      setCanvasState({ mode: CanvasMode.None });
    }

    history.resume();
  },
  [
    camera,
    canvasState,
    setCanvasState,
    history,
    insertLayer,
    unSelectedLayers,
    insertPath,
  ]
);
  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        pencilColor: lastUsedColor,
      });
    },
    [lastUsedColor],
  );
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
 if (e.pointerType === "touch") {
    if (!e.isPrimary) return;

    setCanvasState({
      mode: CanvasMode.Translating,
      current: { x: e.clientX, y: e.clientY },
    });
    return;
  }
      const point = pointerEventToCanvasPoint(e, camera);
      if (e.button !== 0) {
        return;
      }

      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      }
      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }
      setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    },
    [camera, canvasState.mode, setCanvasState, startDrawing],
  );
  const layerIds = useStorage((root) => root.layerIds);

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
    if (canvasState.mode === CanvasMode.Pencil) return;

    if (e.pointerType === "touch" && !e.isPrimary) return;

    const point = pointerEventToCanvasPoint(e, camera);

    setCanvasState({
      mode: CanvasMode.Translating, 
      current: point,
    });

    if (!self.presence.selection.includes(layerId)) {
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
    }
  },
  [canvasState.mode, camera]
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
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        className="w-screen h-screen touch-none"
        ref={svgRef}
        style={{ touchAction: "none" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`,
            transformOrigin: "0 0",
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              selectionColor={layerIdsToColorSelection[layerId]}
              onLayerPointerDown={onLayerPointerDown}
            />
          ))}
          <CursorsPresence />
          {pencilDraft != null && pencilDraft.length > 0 && (
            <Path
              points={pencilDraft}
              fill={colorToCss(lastUsedColor)}
              x={0}
              y={0}
            />
          )}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current != null && (
              <rect
                className="fill-blue-500/5 stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
        </g>
      </svg>
    </div>
  );
};
