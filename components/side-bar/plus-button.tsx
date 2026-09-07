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
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors
                       duration-200 hover:bg-lime-400 hover:text-black"
          >
            <Hint
              label="Create Organization"
              side="right"
              align="center"
              sideOffset={10}
              alignOffset={0}
            >
              <Plus size={16} strokeWidth={2.5} />
            </Hint>
          </button>
        </DialogTrigger>
        <DialogContent className="p-0 overflow-hidden bg-transparent border-none shadow-none">
          <CreateOrganization />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlusButton;
