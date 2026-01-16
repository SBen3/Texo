import { use } from "react";
import BoardList from "@/components/boardList";

interface DashboardProps {
  searchParams: Promise<{ 
    search?: string; 
    favorites?: string 
  }>;
}

const DashboardLayout = ({ searchParams }: DashboardProps) => {
  const params = use(searchParams); 
  return (
    <BoardList query={params} /> 
  );
};

export default DashboardLayout;