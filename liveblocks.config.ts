import { createClient } from "@liveblocks/client";
import { Liveblocks } from "@liveblocks/node";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
throttle: 16,
 authEndpoint : "/api/liveblocks-auth"
});

// Presence = what each user shares in real-time (e.g. cursor position)
type Presence = {
  cursor: { x: number; y: number } | null;
};

// Storage = persistent room data (shapes, layers, etc.)
type Storage = {};

type UserMeta = { 
  id: string;
  info: {
    name: string;
    avatar: string;
  };
};

type RoomEvent = {};

export type { UserMeta, Presence, Storage, RoomEvent };

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
/*     useObject,
    useMap,
    useList,
    useBatch, */
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useUser,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);