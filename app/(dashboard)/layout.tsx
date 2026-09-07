import SideBar from "@/components/side-bar";
import OrgSideBare from "@/components/organizationSidebare";
import NavBar from "@/components/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="flex h-full bg-background">
      <div>
        <SideBar />
      </div>

      <div className="hidden lg:flex">
        <OrgSideBare />
      </div>

      <div className="flex h-full w-full flex-col">
        <NavBar />
        <div className="flex-1 overflow-auto bg-background">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
