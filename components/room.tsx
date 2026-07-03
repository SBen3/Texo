import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "../liveblocks.config";
import { Layer } from "@/app/types/canvas";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";

interface RoomProps {
  roomId: string;
  children: React.ReactNode;
  fallback: React.ReactNode;
}
export const Room = ({ roomId, children, fallback }: RoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null, selection: [] }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList([]),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
