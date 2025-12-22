import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch orders
  useEffect(() => {
    setLoading(true);

    const url = status
      ? `http://localhost:5000/api/v1/orders?status=${status}`
      : `http://localhost:5000/api/v1/orders`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [status]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg">
        Loading orders...
      </p>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold">
          All Orders (Admin)
        </h2>

        {/* Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="select p-5 select-bordered w-full md:w-48 mt-3 md:mt-0"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-5 bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>User Email</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>

                <td className="text-xs text-gray-500">
                  {order._id}
                </td>

                {/* 🔥 FIXED */}
                <td>{order.userEmail}</td>

                <td className="font-medium">
                  {order.productName}
                </td>

                <td>{order.quantity}</td>

                <td>
                  <span
                    className={`badge capitalize ${
                      order.status === "approved"
                        ? "badge-success"
                        : order.status === "pending"
                        ? "badge-warning"
                        : order.status === "paid"
                        ? "badge-info"
                        : "badge-error"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="text-right">
                  {/* ✅ VIEW WORKING */}
                  <Link
                    to={`/dashboard/track-order/${order._id}`}
                    className="btn btn-xs btn-outline btn-primary"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
