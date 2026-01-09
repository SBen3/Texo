"use client";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
const poppin = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});
const orgSideBare = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  return (
    <div className="min-w-[200px] flex flex-col gap-4 p-4 bg-slate-800 text-white ">
      <div className="flex justify-start items-center gap-1">
        <Image src="./green.svg" alt="Logo" width={40} height={40} />
        <p className={`${poppin.className} text-2xl`}>Texo</p>
      </div>
      <OrganizationSwitcher
        appearance={{
          elements: {
            rootBox:
              "bg-gray-100 hover:bg-gray-200 transition rounded-md border-2 border-gray-200",
          },
        }}
      />
      <div className="flex flex-col gap-2 mt-4">
        <Link href="/">
          <button
            className={`flex justify-center p-2 text-xs rounded-md cursor-pointer ${!favorites ? "bg-indigo-600 text-white" : "bg-gray-200 text-black"}`}
          >
            <LayoutDashboard size={15} />
            <p className="ml-2">bords List</p>
          </button>
        </Link>
        <Link href={{ pathname: "/", query: { favorites: "true" } }}>
          <button
            className={`flex justify-center p-2 text-xs rounded-md cursor-pointer ${!favorites ? "bg-gray-200 text-black" : "bg-indigo-600 text-white"}`}
          >
            <Star size={15} />
            <p className="ml-2">Favorite Bords</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default orgSideBare;
