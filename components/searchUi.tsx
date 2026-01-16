import Image from "next/image";
import searchPic from "@/public/search.png";

const SearchUi = () => {
  return (
    <div className="flex flex-col justify-center items-center">
        <Image src={searchPic} alt="" width={300} height={300} className="mx-auto mt-25" />
        <p className="flex flex-col items-center gap-2"><p className="font-bold text-3xl">Oops!</p> No matches for your search.</p>
    </div>
  )
}       
export default SearchUi;