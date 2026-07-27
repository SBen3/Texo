"use client";
import { memo } from "react";
import { useOthersConnectionIds } from "@/liveblocks.config";
import { Cursor } from "./cursor";
import { shallow, useOthersMapped } from "@liveblocks/react";
import {Path} from './path'
import { Color } from "@/app/types/canvas";
import { colorToCss } from "@/lib/utils";
const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};
const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      pencilColor: other.presence.pencilColor,
    }),
    shallow,
  );
  return (
    <>
      {others.map(([key, other]) => {
        console.log(other.pencilColor)
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              points={other.pencilDraft as number[][]}
              x={0}
              y={0}
             fill={other.pencilColor ? colorToCss(other.pencilColor as Color) : "#000"}
            
            />
          );
        }      })}
    </>
  );
};
export const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
