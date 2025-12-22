import { Link } from "react-router-dom";
import useRole from "../../hooks/useRole";

const DashboardHome = () => {
  const { role, loading } = useRole();

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Dashboard Overview
        </h2>
        <p className="text-gray-500 mt-1">
          Manage your activities from here
        </p>

        {/* Go to Home Button */}
        <Link
          to="/"
          className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
        >
          Go to Home Page
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Buyer */}
        {role === "buyer" && (
          <>
            <div className="bg-base-100 shadow-xl rounded-xl p-6">
              <h3 className="text-xl font-semibold">
                My Orders
              </h3>
              <p className="text-gray-500 mt-2">
                View and track your orders
              </p>
              <Link
                to="/dashboard/my-orders"
                className="btn btn-primary btn-sm mt-4"
              >
                View Orders
              </Link>
            </div>

            <div className="bg-base-100 shadow-xl rounded-xl p-6">
              <h3 className="text-xl font-semibold">
                My Profile
              </h3>
              <p className="text-gray-500 mt-2">
                View account information
              </p>
              <Link
                to="/dashboard/profile"
                className="btn btn-outline btn-sm mt-4"
              >
                Profile
              </Link>
            </div>
          </>
        )}

        {/* Manager */}
        {role === "manager" && (
          <>
            <div className="bg-base-100 shadow-xl rounded-xl p-6">
              <h3 className="text-xl font-semibold">
                Add Product
              </h3>
              <p className="text-gray-500 mt-2">
                Add new product to store
              </p>
              <Link
                to="/dashboard/add-product"
                className="btn btn-primary btn-sm mt-4"
              >
                Add Product
              </Link>
            </div>

            <div className="bg-base-100 shadow-xl rounded-xl p-6">
              <h3 className="text-xl font-semibold">
                Manage Products
              </h3>
              <p className="text-gray-500 mt-2">
                Update or remove products
              </p>
              <Link
                to="/dashboard/manage-products"
                className="btn btn-outline btn-sm mt-4"
              >
                Manage
              </Link>
            </div>

            <div className="bg-base-100 shadow-xl rounded-xl p-6">
              <h3 className="text-xl font-semibold">
                Pending Orders
              </h3>
              <p className="text-gray-500 mt-2">
                Review pending orders
              </p>
              <Link
                to="/dashboard/pending-orders"
                className="btn btn-warning btn-sm mt-4"
              >
                View Pending
              </Link>
            </div>
          </>
        )}

        {/* Admin */}
        {role === "admin" && (
          <>
            <div className="bg-base-100 shadow-xl rounded-xl p-6">
              <h3 className="text-xl font-semibold">
                Manage Users
              </h3>
              <p className="text-gray-500 mt-2">
                Control user roles and access
              </p>
              <Link
                to="/dashboard/manage-users"
                className="btn btn-primary btn-sm mt-4"
              >
                Manage Users
              </Link>
            </div>

            <div className="bg-base-100 shadow-xl rounded-xl p-6">
              <h3 className="text-xl font-semibold">
                All Orders
              </h3>
              <p className="text-gray-500 mt-2">
                Monitor all orders
              </p>
              <Link
                to="/dashboard/all-orders"
                className="btn btn-outline btn-sm mt-4"
              >
                View Orders
              </Link>
            </div>

            <div className="bg-base-100 shadow-xl rounded-xl p-6">
              <h3 className="text-xl font-semibold">
                Products
              </h3>
              <p className="text-gray-500 mt-2">
                Manage product inventory
              </p>
              <Link
                to="/dashboard/all-products"
                className="btn btn-info btn-sm mt-4"
              >
                Products
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
