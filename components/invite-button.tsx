"use client";

import { UserPlus } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const InviteButton = () => {
  const { openOrganizationProfile } = useClerk();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => openOrganizationProfile()}
      className="hidden sm:inline-flex"
    >
      <UserPlus size={14} />
      Invite Members
    </Button>
  );
};
export default InviteButton;
