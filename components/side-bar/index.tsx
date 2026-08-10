
import PlusButton from "./plus-button";
import ListOfOrganizations from "./list";

const SideBar = () => {
  return (
    <div className="flex h-full w-fit flex-col gap-4 bg-[#121212] p-3">
      <aside className="flex flex-col items-center gap-3">
        <ListOfOrganizations />

        <div
          className="[&>button]:flex [&>button]:h-10 [&>button]:w-10 [&>button]:items-center
                     [&>button]:justify-center [&>button]:rounded-full [&>button]:border-2
                     [&>button]:border-black [&>button]:bg-[#F0C020] [&>button]:text-black
                     [&>button]:font-black [&>button]:shadow-[3px_3px_0px_0px_black]
                     [&>button]:transition-transform [&>button]:duration-200
                     [&>button]:hover:-translate-y-1 [&>button]:active:translate-y-0
                     [&>button]:active:shadow-none"
        >
          <PlusButton />
        </div>
      </aside>
    </div>
  );
};

export default SideBar;