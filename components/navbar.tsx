
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import SearchInput from "./searchInput";
import InviteButton from "./invite-button";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between border-b-4 border-black bg-white px-4 py-3 shadow-[0px_4px_0px_0px_black]">
      {/* Search - desktop */}
      <div className="hidden lg:flex lg:items-center lg:gap-4">
        <div className="border-2 border-black bg-[#F0F0F0]">
          <SearchInput />
        </div>
      </div>

      {/* Org switcher - mobile */}
      <div className="flex items-center gap-2 p-2 lg:hidden">
        <OrganizationSwitcher
          appearance={{
            elements: {
              rootBox:
                "bg-[#F0C020] hover:bg-[#F0C020]/90 transition-colors duration-200 rounded-none border-2 border-black shadow-[3px_3px_0px_0px_black]",
              organizationSwitcherTrigger:
                "text-black font-bold uppercase tracking-wide px-2 py-1",
              organizationPreviewTextContainer: "text-black font-bold",
            },
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <div
          className="[&>button]:rounded-none [&>button]:border-2 [&>button]:border-black
                     [&>button]:bg-[#D02020] [&>button]:text-white [&>button]:font-bold
                     [&>button]:uppercase [&>button]:tracking-wider [&>button]:px-4 [&>button]:py-2
                     [&>button]:shadow-[3px_3px_0px_0px_black] [&>button]:transition-transform
                     [&>button]:duration-200 [&>button]:active:translate-x-0.5
                     [&>button]:active:translate-y-0.5 [&>button]:active:shadow-none"
        >
          <InviteButton />
        </div>

        <div className="rounded-full border-2 border-black shadow-[3px_3px_0px_0px_black]">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "rounded-full",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;