import { Plus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm px-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
          <Plus size={16} className="inline-block m-1 " />
          Invite Members
        </button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[450px]">
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
};
export default InviteButton;
