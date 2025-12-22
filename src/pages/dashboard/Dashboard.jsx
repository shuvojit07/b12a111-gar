import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Sidebar */}
      <div className="col-span-12 md:col-span-3 lg:col-span-2">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-6 bg-base-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
