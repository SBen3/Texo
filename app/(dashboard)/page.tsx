"use client";

import { useSearchParams } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import BoardList from "@/components/boardList";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const { organization } = useOrganization();

  const search = searchParams.get("search") || "";
  const favorites = searchParams.get("favorites") || "";
  const isFavorites = favorites === "true";

  return (
    <div className="bg-white dark:bg-sidebar">
      <div className="relative overflow-hidden bg-lime-300/20 dark:bg-lime-950/50 px-4 py-10sm:px-6 sm:py-14 lg:px-8">
        <div
          className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-lime-200/70"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 right-32 h-24 w-24 rounded-2xl bg-lime-700/30"
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
