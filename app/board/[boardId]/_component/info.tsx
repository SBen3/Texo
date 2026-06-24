"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Hint from "@/components/hint";
import { Poppins } from "next/font/google";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/action";
import { Menu } from "lucide-react";

interface InfoProp {
  boardId: string;
}
const poppin = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});
export const Info = ({ boardId }: InfoProp) => {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, { boardId: boardId as Id<"boards"> });
  if (!data) return <InfoSkeleton />;

  const TapSeparator = () => {
    return <div className="text-gray-400 pb-1 px-1.5">|</div>;
  };

  return (
    <div
      suppressHydrationWarning
      className="absolute flex flex-row items-center h-[50px] min-w-[100px] top-2 left-2 bg-white rounded-md px-2 py-1 shadow-md"
    >
      <Button variant="board" className="px-3 py-5">
        <Hint label="Go To Boards" sideOffset={10}>
          <Link href="/">
            <div className="flex flex-row items-center gap-2">
              <Image src="/green.svg" alt="board logo" width={30} height={30} />
              <span className={`${poppin.className}`}>Texo</span>
            </div>
          </Link>
        </Hint>
      </Button>
      <TapSeparator />
      <Button variant="board" onClick={() => onOpen(data._id, data.title)}>
        <Hint label="board name" sideOffset={10}>
          <div>{data.title}</div>
        </Hint>
      </Button>
      <TapSeparator />
      <Actions id={data._id} title={data.title}>
        <Button variant={"board"}>
          <Hint label="edit board" sideOffset={10}>
            <Menu />
          </Hint>
        </Button>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="w-[300px] h-10 absolute top-2 left-2 bg-gray-200 rounded-md px-4 py-2 shadow-md animate-pulse"></div>
  );
};
