import Image from "next/image";
import { InfoSkeleton } from "./info";
import { ParticipantSkeleton } from "./participant";
import { ToolbarSkeleton } from "./toolbar";

export const Loading = () => {
  return (
    <div className="relative flex flex-col h-screen w-full items-center justify-center bg-background">
      <div className="animate-pulse">
        <Image
          src="/icon.svg"
          alt="Texo"
          width={48}
          height={48}
          className="rounded-xl"
          priority
        />
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Loading Texo…
      </div>
      <InfoSkeleton />
      <ParticipantSkeleton />
      <ToolbarSkeleton />
    </div>
  );
};
