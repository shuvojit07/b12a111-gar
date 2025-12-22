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
      <p className="text-center mt-20 text-lg text-gray-500">
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
    <section className="bg-gradient-to-b from-white to-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-slate-900">
          My Orders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {order.productName}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  Order ID: {order._id}
                </p>
              </div>

              <div className="mt-4 space-y-2 text-slate-700">
                <p>
                  <span className="font-semibold">
                    Quantity:
                  </span>{" "}
                  {order.quantity}
                </p>

                <p>
                  <span className="font-semibold">
                    Total Price:
                  </span>{" "}
                  ${order.totalPrice}
                </p>

                <p>
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  <span
                    className={`
                      inline-block px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    `}
                  >
                    {order.status}
                  </span>
                </p>
              </div>

              <div className="mt-auto pt-5 flex justify-end">
                <Link
                  to={`/dashboard/track-order/${order._id}`}
                  className="
                    px-4 py-2
                    rounded-lg
                    border border-purple-600
                    text-purple-600
                    font-semibold
                    text-sm
                    hover:bg-purple-600
                    hover:text-white
                    transition
                  "
                >
                  Track Order →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
