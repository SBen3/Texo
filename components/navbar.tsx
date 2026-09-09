import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import SearchInput from "./searchInput";
import InviteButton from "./invite-button";
import { ThemeToggle } from "./theme-toggle";

const NavBar = () => {
  return (
    <div className="flex flex-col gap-3 border-b border-border bg-card px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="block lg:hidden">
          <OrganizationSwitcher
            appearance={{
              elements: {
                rootBox:
                  "bg-muted hover:bg-accent transition-colors duration-200 rounded-full",
                organizationSwitcherTrigger: "text-foreground",
                organizationPreviewTextContainer: "text-foreground font-medium",
              },
            }}
          />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <InviteButton />
          <div className="mt-1.5">
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
      <div className="w-full lg:max-w-xs lg:order-first">
        <SearchInput />
      </div>
    </div>
  );
};

export default NavBar;
