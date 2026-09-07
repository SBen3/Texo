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
  const [debouncedSearch] = useDebounceValue(value, 500);
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
    <div className="relative flex w-[320px] items-center">
      <Search className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search boards…"
        className="pl-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></Input>
    </div>
  );
};
export default SearchInput;
