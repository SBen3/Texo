"use client";

import { use } from "react";
import BoardList from "@/components/boardList";
import { useOrganization } from "@clerk/nextjs";

interface DashboardProps {
  searchParams: Promise<{ 
    search?: string; 
    favorites?: string 
  }>;
}

const DashboardLayout = ({ searchParams }: DashboardProps) => {
  const params = use(searchParams); 
  const {organization} = useOrganization();
  return (
    <BoardList 
    orgId={organization?.id || ""} 
    query={params} /> 
  );
};

export default DashboardLayout; 