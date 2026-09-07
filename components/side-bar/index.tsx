import PlusButton from "./plus-button";
import ListOfOrganizations from "./list";

const SideBar = () => {
  return (
    <div className="flex h-full w-[68px] flex-col items-center gap-4 bg-midnight py-4 dark:bg-sidebar">
      <aside className="flex flex-col items-center gap-3">
        <ListOfOrganizations />
        <PlusButton />
      </aside>
    </div>
  );
};

export default SideBar;
