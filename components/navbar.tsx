import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import SearchInput from "./searchInput";
import InviteButton from "./invite-button";

const NavBar = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="hidden p-2 lg:flex lg:justify-between">
        <SearchInput />
      </div>
      <div className="p-2 flex justify-between lg:hidden ">
        <OrganizationSwitcher
          appearance={{
            elements: {
              rootBox:
                "bg-gray-300 hover:bg-gray-400 transition rounded-md border-2 border-gray-400",
              organizationSwitcherTrigger: "text-black",
              organizationPreviewTextContainer: "text-black",
            },
          }}
        />
      </div>
      <div className="flex gap-2">
          <InviteButton />
          <UserButton />
        </div>
      </div>
    </>
  );
};

export default NavBar;
