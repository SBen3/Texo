import Image from "next/image";
import favPic from "@/public/fav.png";

const SearchUi = () => {
  return (
    <div className="flex flex-col justify-center items-center">
        <Image src={favPic} alt="" width={300} height={300} className="mx-auto mt-5" />
        <p className="flex flex-col items-center gap-2"><p className="font-bold text-3xl">No favorites found!</p> Try marking a board as a favorite</p>
    </div>
  )
}       
export default SearchUi;