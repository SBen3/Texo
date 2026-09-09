"use client";

import { useSearchParams } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import BoardList from "@/components/boardList";

import { LayoutDashboard, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const { organization } = useOrganization();

  const search = searchParams.get("search") || "";
  const favorites = searchParams.get("favorites") || "";
  const isFavorites = favorites === "true";

  return (
    <div className="bg-white dark:bg-sidebar">
      <div className="relative flex flex-col justify-center items-start overflow-hidden bg-lime-300/20 dark:bg-lime-950/50 px-4 sm:px-6 sm:py-14 lg:px-8 h-44">
        <div
          className="pointer-events-none absolute -right-5 -top-8 lg:-right-14 lg:-top-14 h-24 w-24 lg:h-48 lg:w-48 rounded-full bg-lime-200/70"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-8 lg:-bottom-10 right-32 h-12 w-12 lg:h-24 lg:w-24 rounded-2xl bg-lime-700/30"
          aria-hidden
        />
        <p className="eyebrow relative text-lime-700">
          {isFavorites ? "Starred" : "Workspace"}
        </p>
        <h1 className="relative mt-2 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
          {isFavorites ? "Favorite Boards" : "Your Boards"}
        </h1>
        <p className="relative mt-2 max-w-md text-sm text-smoke sm:text-base">
          {isFavorites
            ? "The boards you've starred, all in one place."
            : "Everything your organization is working on, in one canvas."}
        </p>
      </div>
      <div className="">
        <nav className="flex flex-row gap-1 pt-8 justify-around lg:hidden">
          <Link href="/">
            <button
              className={cn(
                "flex w-full items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200",
                !favorites
                  ? "bg-lime-100 text-lime-700"
                  : "bg-lime-700 text-lime-100 hover:bg-lime-100 hover:text-lime-700",
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
                  : "bg-lime-700 text-lime-100 hover:bg-lime-100 hover:text-lime-700",
              )}
            >
              <Star size={15} strokeWidth={2.25} />
              <p>Favorite Boards</p>
            </button>
          </Link>
        </nav>
      </div>

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <BoardList
          orgId={organization?.id || ""}
          query={{ search, favorites }}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
