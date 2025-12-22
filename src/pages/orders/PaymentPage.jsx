import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const { orderId } = useParams();
  const Navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load order
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Order not found");
        }
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load order");
        setLoading(false);
      });
  }, [orderId]);

  // 🔹 Stripe checkout
  const handlePayment = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/stripe/create-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        }
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Stripe session failed");
      }
    } catch (error) {
      toast.error("Payment error");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg">Loading payment details...</p>
    );
  }

  if (!order) {
    return <p className="text-center mt-20 text-red-500">Order not found</p>;
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <div className="bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Secure Checkout</h2>

        <div className="space-y-2 text-sm">
          <p>
            <b>Product:</b> {order.productName}
          </p>
          <p>
            <b>Quantity:</b> {order.quantity}
          </p>
          <p>
            <b>Total Price:</b> ৳{order.totalPrice}
          </p>
        </div>

        <div className="bg-base-200 p-4 rounded-lg text-center">
          <p className="text-sm">Payment Method</p>
          <p className="font-semibold">Stripe (Card)</p>
        </div>

        <button onClick={handlePayment} className="btn btn-primary w-full">
          Pay Securely →
        </button>

        <p className="text-xs text-center text-gray-500">
          Your payment is securely processed by Stripe
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
