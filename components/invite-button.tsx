"use client";

import { Plus } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

const InviteButton = () => {
  const { openOrganizationProfile } = useClerk();
  return (
    <>
      <div
        className="text-sm h-8 px-3 pt-1 mt-3 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition cursor-pointer"
        onClick={() => openOrganizationProfile()}
      >
        <Plus size={15} className="inline-block mr-2 mb-1" />
        Invite Members
      </div>
    </>
  );
};
export default InviteButton;
