import Image from "next/image";
import boardPic from "@/public/board.png";

const BoardUi = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={boardPic}
        alt=""
        width={300}
        height={300}
        className="mx-auto mt-5"
      />
      <p className="flex flex-col items-center gap-2">
        <p className="font-bold text-3xl">No boards found!</p> Create a board to
        get started <button className="bg-black rounded-md text-white text-xs p-2 mt-2">Create Board</button>
      </p>
    </div>
  );
};
export default BoardUi;
