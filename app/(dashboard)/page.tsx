"use client";

import { use } from "react";
import BoardList from "@/components/boardList";
import { useOrganization } from "@clerk/nextjs";

interface DashboardProps {
  searchParams: Promise<{
    search?: string;
    favorites?: string;
  }>;
}

const DashboardPage = ({ searchParams }: DashboardProps) => {
  const params = use(searchParams);
  const { organization } = useOrganization();
  const isFavorites = params.favorites === "true";

  return (
    <div className="bg-[#F0F0F0]">
      <div className="relative overflow-hidden border-b-4 border-black bg-[#1040C0] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-8 right-24 h-24 w-24 rotate-45 bg-[#F0C020]/20"
          aria-hidden
        />
        <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-5xl">
          {isFavorites ? "Favorite Boards" : "Your Boards"}
        </h1>
        <p className="mt-2 max-w-md font-medium text-white/80">
          {isFavorites
            ? "The boards you've starred, all in one place."
            : "Everything your organization is working on."}
        </p>
      </div>

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <BoardList orgId={organization?.id || ""} query={params} />
      </div>
    </div>
  );
};

export default DashboardPage;