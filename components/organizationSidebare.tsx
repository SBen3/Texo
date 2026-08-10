
"use client";

import { Outfit } from "next/font/google";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const outfit = Outfit({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const OrgSideBare = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div
      className={`${outfit.className} flex min-w-[220px] flex-col gap-6 bg-[#121212] p-4 text-white`}
    >
      {/* Geometric logo mark — circle, rotated square, triangle */}
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8 shrink-0">
          <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-[#D02020]" />
          <div className="absolute right-0 top-0 h-4 w-4 rotate-45 bg-[#F0C020]" />
          <div
            className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 bg-[#1040C0]"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        </div>
        <p className="text-2xl font-black uppercase tracking-tighter">Texo</p>
      </div>

      <OrganizationSwitcher
        appearance={{
          elements: {
            rootBox:
              "bg-white hover:bg-[#F0F0F0] transition-colors duration-200 rounded-none border-2 border-black shadow-[3px_3px_0px_0px_black]",
            organizationSwitcherTrigger: "text-black font-bold px-2 py-1",
            organizationPreviewTextContainer: "text-black font-bold",
          },
        }}
      />

      <nav className="flex flex-col gap-3">
        <Link href="/">
          <button
            className={`flex w-full items-center gap-2 border-2 border-black px-3 py-2 text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_0px_black] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
              !favorites ? "bg-[#D02020] text-white" : "bg-white text-black"
            }`}
          >
            <LayoutDashboard size={15} strokeWidth={2.5} />
            <p>Boards List</p>
          </button>
        </Link>

        <Link href={{ pathname: "/", query: { favorites: "true" } }}>
          <button
            className={`flex w-full items-center gap-2 border-2 border-black px-3 py-2 text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_0px_black] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
              favorites ? "bg-[#F0C020] text-black" : "bg-white text-black"
            }`}
          >
            <Star size={15} strokeWidth={2.5} />
            <p>Favorite Boards</p>
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default OrgSideBare;