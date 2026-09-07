import { Star } from "lucide-react";

const FavUi = () => {
  return (
    <div className="mx-auto mt-16 flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center shadow-card">
      <div className="flex size-14 items-center justify-center rounded-full bg-lime-200 text-lime-500">
        <Star className="size-6" strokeWidth={2} />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-xl font-semibold tracking-[-0.02em] text-foreground">
          No favorites yet
        </p>
        <p className="text-sm text-muted-foreground">
          Star a board to find it here quickly.
        </p>
      </div>
    </div>
  );
};

export default FavUi;
