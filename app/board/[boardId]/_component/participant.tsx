"use client";

import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN = 0;

export const Participant = () => {
  const others = useOthers();
  const currentUser = useSelf();

  const hasMoreUsers = others.length > MAX_SHOWN;

  return (
    <div className="absolute top-4 right-2 flex flex-col items-center gap-2 rounded-full">
      {/* Other users */}
      {others.slice(0, MAX_SHOWN).map(({ connectionId, info }) => (
        <UserAvatar
          borderColor={connectionIdToColor(connectionId)}
          key={connectionId}
          src={info?.avatar}
          name={info?.name}
          fallback={info?.name?.[0] ?? "T"}
        />
      ))}

      {/* Current user */}
      {currentUser && (
        <UserAvatar
          borderColor={connectionIdToColor(currentUser.connectionId)}
          src={currentUser.info?.avatar}
          name={`${currentUser.info?.name} (You)`}
          fallback={currentUser.info?.name?.[0] ?? "Y"}
        />
      )}

      {/* Overflow indicator */}
      {hasMoreUsers && (
        <UserAvatar
          borderColor={connectionIdToColor(currentUser.connectionId)}
          name={`${others.length - MAX_SHOWN} more`}
          fallback={`+${others.length - MAX_SHOWN}`}
        />
      )}
    </div>
  );
};

export const ParticipantSkeleton = () => {
  return (
    <div className="absolute top-2 right-2 h-10 w-[180px] animate-pulse rounded-2xl bg-muted px-4 py-2 shadow-card"></div>
  );
};
