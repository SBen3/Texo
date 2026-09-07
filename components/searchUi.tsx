import { SearchX } from "lucide-react";

const SearchUi = () => {
  return (
    <div className="mx-auto mt-16 flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center shadow-card">
      <div className="flex size-14 items-center justify-center rounded-full bg-lime-200 text-lime-500">
        <SearchX className="size-6" strokeWidth={2} />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-xl font-semibold tracking-[-0.02em] text-foreground">
          No matches found
        </p>
        <p className="text-sm text-muted-foreground">
          Try a different search term.
        </p>
      </div>
    </div>
  );
};

export default SearchUi;
