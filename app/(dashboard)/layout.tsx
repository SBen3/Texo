import SideBar from "@/components/side-bar";
import OrgSideBare from "@/components/sidebare";
import NavBar from "@/components/navbar";

interface dashboardLayout {
  children: React.ReactNode;
}

const dashboardLayout = ({ children }: dashboardLayout) => {
  return (
    <>
      <main className="flex h-full">
        <SideBar />
        <div className="hidden lg:flex">
          <OrgSideBare />
        </div>
        <div className="h-full w-full bg-blue-950 text-white">
          <NavBar />
          {children}
        </div>
      </main>
    </>
  );
};
export default dashboardLayout;
