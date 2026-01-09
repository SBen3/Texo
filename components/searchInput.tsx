"use client";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchInput = () => {
  return (
    <div className="flex w-[600px]">
      <Search className="absolute ml-2 mt-2 w-5 h-5 text-gray-600" />
      <Input
        type="text"
        placeholder="Search..."
        className="p-2 pl-10 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        
      </Input>
    </div>
  );
};
export default SearchInput;
