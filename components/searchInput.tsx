"use client";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useDebounceValue } from "usehooks-ts";
import { useEffect, useState } from "react";
import qs from "query-string";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [debouncedSearch] = useDebounceValue (value, 500);
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: { search: debouncedSearch }, 
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [debouncedSearch, router]);
  return (
    <div className="flex w-[400px]">
      <Search className="absolute ml-2 mt-2 w-5 h-5 text-gray-600" />
      <Input
        type="text"
        placeholder="Search..."
        className="p-2 pl-10 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></Input>
    </div>
  );
};
export default SearchInput;
