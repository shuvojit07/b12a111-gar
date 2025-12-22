import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/api/v1/orders?email=${user.email}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg">
        Loading your orders...
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-500">
        You have not placed any orders yet.
      </p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        My Orders
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-base-100 shadow-xl rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold">
              {order.productName}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Order ID: {order._id}
            </p>

            <div className="mt-3 space-y-1">
              <p>
                <b>Quantity:</b> {order.quantity}
              </p>

              <p>
                <b>Total:</b> ৳{order.totalPrice}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={`badge ${
                    order.status === "paid"
                      ? "badge-success"
                      : order.status === "pending"
                      ? "badge-warning"
                      : "badge-info"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <Link
                to={`/dashboard/track-order/${order._id}`}
                className="btn btn-sm btn-outline btn-primary"
              >
                Track Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
