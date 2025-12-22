import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  const user = null; // later auth user

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      {/* Dynamic Route Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
