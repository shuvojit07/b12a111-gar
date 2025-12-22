import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const { orderId } = useParams();

  useEffect(() => {
    axios
      .patch(`http://localhost:5000/api/v1/orders/pay/${orderId}`)
      .then(() => {
        toast.success("Payment successful!");
      })
      .catch(() => {
        toast.error("Failed to update payment status");
      });
  }, [orderId]);

  return (
    <div className="text-center mt-32">
      <h2 className="text-2xl font-bold text-green-600">
        Payment Successful 
      </h2 >
      <h3 className="text-xl font-bold text-green-600">Thanks For Your Payment</h3>

      <p className="mt-2 text-gray-600">Your order has been confirmed.</p>

      <Link
        to={`/dashboard/track-order/${orderId}`}
        className="btn btn-primary mt-6"
      >
        Track This Order
      </Link>
    </div>
  );
};

export default PaymentSuccess;
