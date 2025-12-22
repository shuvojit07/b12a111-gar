import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="flex">
        {/* ===== Sidebar ===== */}
        <div className="sticky top-0 h-screen">
          <DashboardSidebar />
        </div>

        {/* ===== Main Content ===== */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="h-16 bg-white/70 backdrop-blur border-b border-slate-200 px-6 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-slate-700">
              Dashboard
            </h1>

            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">
                {user?.displayName}
              </span>

              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                {user?.displayName?.[0] || "U"}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
