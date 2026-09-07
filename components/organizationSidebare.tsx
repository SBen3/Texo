"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const OrgSideBare = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="flex min-w-60 flex-col gap-6 border-r border-white/10 bg-midnight p-5 text-white dark:bg-sidebar">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icon.svg" alt="Texo" width={32} height={32}/>
        <p className="text-lg font-semibold tracking-[-0.03em]">Texo</p>
      </Link>

      <OrganizationSwitcher
        appearance={{
          elements: {
            rootBox:
              "bg-white/5 hover:bg-white/10 transition-colors duration-200 rounded-2xl w-full",
            organizationSwitcherTrigger: "text-white font-medium px-3 py-2 w-full",
            organizationPreviewTextContainer: "text-white font-medium",
          },
        }}
      />

      <nav className="flex flex-col gap-1">
        <Link href="/">
          <button
            className={cn(
              "flex w-full items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200",
              !favorites
                ? "bg-lime-100 text-lime-700"
                : "bg-lime-700 text-lime-100 hover:bg-lime-100 hover:text-lime-700"
            )}
          >
            <LayoutDashboard size={15} strokeWidth={2.25} />
            <p>Boards List</p>
          </button>
        </Link>

        <Link href={{ pathname: "/", query: { favorites: "true" } }}>
          <button
            className={cn(
              "flex w-full items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200",
              favorites
                ? "bg-lime-100 text-lime-700"
                : "bg-lime-700 text-lime-100 hover:bg-lime-100 hover:text-lime-700"
            )}
          >
            <Star size={15} strokeWidth={2.25} />
            <p>Favorite Boards</p>
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default OrgSideBare;
