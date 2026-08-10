import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Hint from "../hint";

const PlusButton = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black
                       bg-[#F0C020] text-black shadow-[3px_3px_0px_0px_black] transition-all
                       duration-200 hover:-translate-y-1 active:translate-y-0 active:shadow-none"
          >
            <Hint
              label="Create Organization"
              side="right"
              align="center"
              sideOffset={10}
              alignOffset={0}
            >
              <Plus size={16} strokeWidth={3} />
            </Hint>
          </button>
        </DialogTrigger>
        <DialogContent className="rounded-none border-4 border-black bg-white p-0 shadow-[8px_8px_0px_0px_black]">
          <CreateOrganization />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlusButton;