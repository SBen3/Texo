import SideBar from "@/components/side-bar";
import OrgSideBare from "@/components/organizationSidebare";
import NavBar from "@/components/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="flex h-full bg-[#F0F0F0]">
      <div className="border-r-4 border-black">
        <SideBar />
      </div>

      <div className="hidden border-r-4 border-black lg:flex">
        <OrgSideBare />
      </div>

      <div className="flex h-full w-full flex-col">
        <NavBar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;