"use client";
import { Room } from "@/components/room";
import { Canvas } from "./_component/canvas";
import { Loading } from "./_component/loading";
import { use } from "react";

interface BoardIdPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  const newParam = use(params);

  return (
    <>
      <Room roomId={newParam.boardId} fallback={<Loading />}>
        <Canvas boardId={newParam.boardId} />
      </Room>
    </>
  );
};

export default BoardIdPage;
