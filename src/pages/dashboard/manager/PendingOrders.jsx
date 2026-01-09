import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //  track approve / reject status locally
  const [actionMap, setActionMap] = useState({});

  //  fetch pending orders
  useEffect(() => {
    fetch("https://garmentstracker.vercel.app/api/v1/orders?status=pending")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔹 approve order
  const handleApprove = async (id) => {
    try {
      const res = await fetch(
        `https://garmentstracker.vercel.app/api/v1/orders/${id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            status: "approved",
            approvedAt: new Date(),
          }),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Order approved");

      //  mark as approved (green)
      setActionMap((prev) => ({
        ...prev,
        [id]: "approved",
      }));
    } catch {
      toast.error("Failed to approve order");
    }
  };

  // 🔹 reject order
  const handleReject = async (id) => {
    if (!window.confirm("Reject this order?")) return;

    try {
      const res = await fetch(
        `https://garmentstracker.vercel.app/api/v1/orders/${id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ status: "rejected" }),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Order rejected");

      // mark as rejected (red)
      setActionMap((prev) => ({
        ...prev,
        [id]: "rejected",
      }));
    } catch {
      toast.error("Failed to reject order");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading pending orders...
      </p>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        Pending Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No pending orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Qty</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-3">{index + 1}</td>

                  {/*  NAME COLOR */}
                  <td
                    className={`p-3 font-semibold ${
                      actionMap[order._id] === "approved"
                        ? "text-green-600"
                        : actionMap[order._id] === "rejected"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {order.userEmail || order.email || "N/A"}
                  </td>

                  <td className="p-3">{order.productName}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">${order.totalPrice}</td>

                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleApprove(order._id)}
                      disabled={actionMap[order._id]}
                      className="px-3 py-1.5 rounded-md text-sm font-semibold bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(order._id)}
                      disabled={actionMap[order._id]}
                      className="px-3 py-1.5 rounded-md text-sm font-semibold bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                    >
                      Reject
                    </button>

                    <Link
                      to={`/dashboard/track-order/${order._id}`}
                      className="px-3 py-1.5 rounded-md text-sm font-semibold border border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white transition"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingOrders;
