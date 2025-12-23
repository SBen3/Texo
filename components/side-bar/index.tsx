import PlusButton from "./plus-button";
import ListOfOrganizations from "./list";

const sideBar = () => {
  return (
    <div className="w-fit p-2 h-full flex flex-col bg-gray-900">
      <aside>
        <ListOfOrganizations />
        <PlusButton />
      </aside>
    </div>
  );
};

export default sideBar;
