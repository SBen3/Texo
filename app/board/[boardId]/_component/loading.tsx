import { Loader } from "lucide-react";
import { Info } from "./info";
import { Participant } from "./participant";
import { Toolbar } from "./toolbar";

export const Loading = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <Loader className="animate-spin text-gray-700" size={30} />
      <Info.Skeleton />
      <Participant.Skeleton />
      <Toolbar.Skeleton />
    </div>
  );
};
