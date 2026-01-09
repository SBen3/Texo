import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import SearchInput from "./searchInput";
import InviteButton from "./invite-button";

const NavBar = () => {
  return (
    <>
      <div className="hidden md:w-full p-2 md:flex md:justify-between">
        <SearchInput />
        <UserButton />
      </div>
      <div className="w-full p-2 flex justify-between md:hidden ">
        <OrganizationSwitcher
          appearance={{
            elements: {
              rootBox:
                "bg-gray-600 hover:bg-gray-700 text-white transition rounded-md border-2 border-gray-200",
              organizationSwitcherTrigger: "text-white",
              organizationPreviewTextContainer: "text-white",
              
            },
          }}
        />
        <InviteButton />
      </div>
    </>
  );
};

export default NavBar;
