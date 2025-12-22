import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-700 text-white rounded-2xl p-6 mb-8 shadow-lg">
        <h1 className="text-2xl font-bold">
          Welcome Back, {user?.displayName || "User"}!
        </h1>
        <p className="text-sm text-purple-200 mt-1">
          Here is your daily overview.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Add Product"
          desc="Create new products with pricing and stock"
        />
        <DashboardCard
          title="Manage Products"
          desc="Update or delete existing products"
        />
        <DashboardCard
          title="Pending Orders"
          desc="Review and approve new orders"
        />
        <DashboardCard
          title="Approved Orders"
          desc="Track approved order status"
        />
        <DashboardCard
          title="My Profile"
          desc="View and update your profile"
        />
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="
          mt-10
          flex items-center
          p-[3px]
          rounded-lg
          bg-[linear-gradient(144deg,#a855f7,#7c3aed_50%,#6366f1)]
          shadow-[rgba(168,85,247,0.4)_0_15px_30px_-5px]
          transition-all duration-300
          active:scale-95
        "
      >
        <span
          className="
            px-6 py-3
            rounded-md
            bg-[rgb(45,5,90)]
            text-white font-semibold
            transition-all duration-300
            hover:bg-transparent
          "
        >
          ← Back to Home
        </span>
      </button>
    </div>
  );
};

const DashboardCard = ({ title, desc }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-purple-100 hover:shadow-xl hover:border-purple-300 transition">
      <h3 className="text-lg font-semibold text-purple-700 mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-500">
        {desc}
      </p>
    </div>
  );
};

export default DashboardHome;
