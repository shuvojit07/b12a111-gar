import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="text-center mt-32">
      <h2 className="text-2xl font-bold text-red-500">
        Payment Cancelled
      </h2>

      <p className="mt-2 text-gray-600">
        You can pay later from My Orders.
      </p>

      <Link
        to="/dashboard/my-orders"
        className="btn btn-primary mt-6"
      >
        Back to My Orders
      </Link>
    </div>
  );
};

export default PaymentCancel;
