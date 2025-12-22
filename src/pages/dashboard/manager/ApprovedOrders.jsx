import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/orders?status=approved")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading approved orders...
      </p>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">
        Approved Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">
          No approved orders found.
        </p>
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
                <th className="p-3 text-left">Tracking</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3">
                    {order.email ||
                     order.userEmail ||
                     order.buyerEmail ||
                     order.user?.email ||
                     "N/A"}
                  </td>

                  <td className="p-3">{order.productName}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">${order.totalPrice}</td>

                  <td className="p-3">
                    <Link
                      to={`/dashboard/add-tracking/${order._id}`}
                      className="
                        inline-block
                        px-3 py-1.5
                        rounded-md
                        text-sm
                        bg-purple-600
                        text-white
                        hover:bg-purple-700
                        transition
                      "
                    >
                      Add / Update
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

export default ApprovedOrders;
