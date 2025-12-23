import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Hint from "../hint";

const PlusButton = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="m-1 p-2 text-xs bg-white/25 text-white rounded-md hover:bg-white/50 transition cursor-pointer">
            <Hint
              label="Create Organization"
              side="right"
              align="center"
              sideOffset={10}
              alignOffset={0}
            >
              <Plus size={15} />
            </Hint>
          </button>
        </DialogTrigger>
        <DialogContent>
          <CreateOrganization />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default PlusButton;
