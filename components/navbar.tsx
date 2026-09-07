import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import SearchInput from "./searchInput";
import InviteButton from "./invite-button";
import { ThemeToggle } from "./theme-toggle";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border bg-card px-4 py-3">
      {/* Search - desktop */}
      <div className="hidden lg:flex lg:items-center lg:gap-4">
        <SearchInput />
      </div>

      {/* Org switcher - mobile */}
      <div className="flex items-center gap-2 lg:hidden">
        <OrganizationSwitcher
          appearance={{
            elements: {
              rootBox:
                "bg-muted hover:bg-accent transition-colors duration-200 rounded-full",
              organizationSwitcherTrigger:
                "text-foreground font-medium",
              organizationPreviewTextContainer: "text-foreground font-medium",
            },
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <InviteButton />

        <div className="">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "rounded-full ring-lime-300 ring-2",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
