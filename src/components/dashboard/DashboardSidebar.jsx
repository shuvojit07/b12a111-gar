import { NavLink } from "react-router-dom";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";

const DashboardSidebar = () => {
  const { role, status, loading } = useRole();
  const { logoutUser } = useAuth();

  if (loading) {
    return (
      <aside className="w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white p-6">
        Loading...
      </aside>
    );
  }

  if (status === "blocked" || status === "suspended") {
    return (
      <aside className="w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white p-6">
        <p className="text-red-300 font-semibold">
          Your account is {status}
        </p>
      </aside>
    );
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow"
        : "text-purple-200 hover:bg-purple-800/40"
    }`;

  return (
    <aside className="w-64 min-h-screen flex flex-col justify-between bg-gradient-to-b from-purple-900 to-indigo-900">
      
      {/* Logo */}
      <div>
        <div className="px-6 py-5 border-b border-purple-700 text-xl font-bold text-white">
          GarmentsTracker
        </div>

        <ul className="mt-4 space-y-1 px-3">
          <li>
            <NavLink to="/dashboard" end className={linkClass}>
              Overview
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile" className={linkClass}>
              My Profile
            </NavLink>
          </li>

          {/* Admin */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-users" className={linkClass}>
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-products" className={linkClass}>
                  All Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-orders" className={linkClass}>
                  All Orders
                </NavLink>
              </li>
            </>
          )}

          {/* Manager */}
          {role === "manager" && (
            <>
              <li>
                <NavLink to="/dashboard/add-product" className={linkClass}>
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-products" className={linkClass}>
                  Manage Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/pending-orders" className={linkClass}>
                  Pending Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/approved-orders" className={linkClass}>
                  Approved Orders
                </NavLink>
              </li>
            </>
          )}

          {/* Buyer */}
          {role === "buyer" && (
            <li>
              <NavLink to="/dashboard/my-orders" className={linkClass}>
                My Orders
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-purple-700">
        <button
          onClick={logoutUser}
          className="
            w-full
            p-[2px]
            rounded-lg
            bg-[linear-gradient(144deg,#a855f7,#7c3aed_50%,#6366f1)]
            transition-all duration-300
            active:scale-95
          "
        >
          <span
            className="
              w-full block
              py-2
              rounded-md
              bg-[rgb(45,5,90)]
              text-white font-semibold
              transition-all duration-300
              hover:bg-transparent
            "
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
