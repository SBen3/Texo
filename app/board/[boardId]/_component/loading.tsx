import { Loader } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantSkeleton } from "./participant";
import { ToolbarSkeleton } from "./toolbar";

export const Loading = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <Loader className="animate-spin text-gray-700" size={30} />
      <InfoSkeleton />
      <ParticipantSkeleton />
      <ToolbarSkeleton />
    </div>
  );
};
