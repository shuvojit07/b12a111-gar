import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch approved orders
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
      <p className="text-center mt-20">
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
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Tracking</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.email}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    <Link
                      to={`/dashboard/add-tracking/${order._id}`}
                      className="btn btn-xs btn-primary"
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



