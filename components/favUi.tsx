
import Image from "next/image";
import favPic from "@/public/fav.png";

const FavUi = () => {
  return (
    <div className="mx-auto mt-16 flex max-w-md flex-col items-center gap-4 border-4 border-black bg-white p-8 text-center shadow-[8px_8px_0px_0px_black]">
      <div className="relative h-16 w-16">
        <div className="absolute left-0 top-0 h-8 w-8 rotate-45 bg-[#F0C020]" />
        <div className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#D02020]" />
      </div>
      <Image src={favPic} alt="" width={220} height={220} className="grayscale" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-3xl font-black uppercase tracking-tighter">No Favorites Found</p>
        <p className="font-medium text-black/70">Try marking a board as a favorite.</p>
      </div>
    </div>
  );
};

export default FavUi;