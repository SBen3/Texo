"use client";

import { Plus } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

const InviteButton = () => {
  const { openOrganizationProfile } = useClerk();
  return (
    <div className="flex w-full h-full p-1 pr-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition cursor-pointer 
    ">
            <Plus size={15} className="inline-block m-2" />
      <div
        className="flex self-center pb-1 text-xs md:text-sm"
        onClick={() => openOrganizationProfile()}
      >
        Invite Members
      </div>
    </div>
  );
};
export default InviteButton;
