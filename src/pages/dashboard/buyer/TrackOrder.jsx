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
      <p className="text-center mt-20 text-lg">
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

  // 🔥 FIXED LOGIC
  const isPaid = order.status !== "unpaid";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Track Your Order
      </h2>

      {/* Order Summary */}
      <div className="bg-base-100 shadow-xl rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold">
          {order.productName}
        </h3>

        <p className="text-sm text-gray-500">
          Order ID: {order._id}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <p>
            <b>Quantity:</b> {order.quantity}
          </p>
          <p>
            <b>Total Price:</b> ৳{order.totalPrice}
          </p>
          <p>
            <b>Payment:</b>{" "}
            {isPaid ? "Paid" : "Unpaid"}
          </p>
          <p>
            <b>Status:</b>{" "}
            <span
              className={`badge ${
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
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-base-100 shadow-xl rounded-xl p-6 mb-6">
        <h3 className="font-semibold mb-4">
          Order Progress
        </h3>

        <ul className="steps steps-vertical md:steps-horizontal w-full">
          <li className="step step-primary">
            Order Placed
          </li>

          <li
            className={`step ${
              ["approved", "paid", "shipped", "delivered"].includes(order.status)
                ? "step-primary"
                : ""
            }`}
          >
            Approved
          </li>

          <li
            className={`step ${
              isPaid ? "step-primary" : ""
            }`}
          >
            Paid
          </li>

          <li
            className={`step ${
              order.status === "delivered"
                ? "step-primary"
                : ""
            }`}
          >
            Delivered
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Link to="/" className="btn btn-outline">
          Go to Home
        </Link>

        <Link
          to="/dashboard/my-orders"
          className="btn btn-primary"
        >
          My Orders
        </Link>
      </div>
    </div>
  );
};

export default TrackOrder;
