import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const TrackOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = () => {
      axios
        .get(`http://localhost:5000/api/v1/orders/${id}`)
        .then((res) => {
          setOrder(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg text-gray-500">
        Loading order details...
      </p>
    );
  }

  if (!order) {
    return (
      <p className="text-center mt-20 text-red-500">
        Order not found
      </p>
    );
  }

  // 🔹 FIXED LOGIC (unchanged)
  const isPaid = order.status !== "unpaid";

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-10 text-slate-900 text-center">
          Track Your Order
        </h2>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-1">
            {order.productName}
          </h3>

          <p className="text-sm text-slate-500 mb-6">
            Order ID: {order._id}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
            <p>
              <span className="font-semibold">Quantity:</span>{" "}
              {order.quantity}
            </p>
            <p>
              <span className="font-semibold">Total Price:</span>{" "}
              ${order.totalPrice}
            </p>
            <p>
              <span className="font-semibold">Payment:</span>{" "}
              {isPaid ? (
                <span className="text-green-600 font-medium">
                  Paid
                </span>
              ) : (
                <span className="text-red-500 font-medium">
                  Unpaid
                </span>
              )}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`
                  inline-block px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    order.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "paid"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {order.status}
              </span>
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">
          <h3 className="text-lg font-semibold mb-6 text-slate-900">
            Order Progress
          </h3>

          <div className="flex flex-col md:flex-row justify-between gap-6">
            {[
              { label: "Order Placed", active: true },
              {
                label: "Approved",
                active: ["approved", "paid", "shipped", "delivered"].includes(
                  order.status
                ),
              },
              {
                label: "Paid",
                active: isPaid,
              },
              {
                label: "Delivered",
                active: order.status === "delivered",
              },
            ].map((step, i) => (
              <div key={i} className="flex-1 text-center">
                <div
                  className={`
                    w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2
                    ${
                      step.active
                        ? "bg-purple-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }
                  `}
                >
                  {i + 1}
                </div>
                <p
                  className={`text-sm font-medium ${
                    step.active
                      ? "text-slate-900"
                      : "text-slate-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="
              px-6 py-3
              rounded-lg
              border border-slate-300
              text-slate-700
              font-semibold
              hover:bg-slate-100
              transition
            "
          >
            Go to Home
          </Link>

          <Link
            to="/dashboard/my-orders"
            className="
              px-6 py-3
              rounded-lg
              bg-purple-600
              text-white
              font-semibold
              hover:bg-purple-700
              transition
            "
          >
            My Orders
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrackOrder;
