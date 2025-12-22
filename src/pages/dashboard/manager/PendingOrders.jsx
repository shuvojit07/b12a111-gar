import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch pending orders
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/orders?status=pending")
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
        `http://localhost:5000/api/v1/orders/${id}`,
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
      setOrders((prev) =>
        prev.filter((order) => order._id !== id)
      );
    } catch {
      toast.error("Failed to approve order");
    }
  };

  // 🔹 reject order
  const handleReject = async (id) => {
    if (!window.confirm("Reject this order?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/orders/${id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ status: "rejected" }),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Order rejected");
      setOrders((prev) =>
        prev.filter((order) => order._id !== id)
      );
    } catch {
      toast.error("Failed to reject order");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20">
        Loading pending orders...
      </p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Pending Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">
          No pending orders found.
        </p>
      ) : (
        <div className="overflow-x-auto p-5 bg-base-100 shadow-xl rounded-xl">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-left">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.userEmail}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>৳{order.totalPrice}</td>
                  <td className="text-center space-x-2">
                    <button
                      onClick={() =>
                        handleApprove(order._id)
                      }
                      className="btn btn-xs btn-success"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleReject(order._id)
                      }
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>

                    <Link
                      to={`/dashboard/track-order/${order._id}`}
                      className="btn btn-xs btn-outline"
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
