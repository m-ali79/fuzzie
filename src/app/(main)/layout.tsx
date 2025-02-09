import DashboardNav from "@/components/dashboardNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <DashboardNav />
      <div>
        {/* <InfoBar /> */}
        {children}
      </div>
    </div>
  );
};
export default Layout;
