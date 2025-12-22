import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTracking = () => {
  const { id } = useParams(); // orderId
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 fetch order info
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // 🔹 submit tracking
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!status) {
      toast.error("Please select tracking status");
      return;
    }

    const trackingPayload = {
      status,
      note,
      location,
      time: new Date(),
      // 🔥 VERY IMPORTANT
      orderStatus: status === "Delivered" ? "delivered" : undefined,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/orders/${id}/tracking`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(trackingPayload),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Tracking update added successfully");
      navigate("/dashboard/approved-orders");
    } catch {
      toast.error("Failed to add tracking");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading order...
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

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">
        Add Tracking Update
      </h2>

      {/* Order Info */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <p className="text-sm text-gray-600">
          <b>Order ID:</b> {order._id}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <b>Product:</b> {order.productName}
        </p>
      </div>

      {/* Tracking Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-5"
      >
        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">
            Tracking Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Select status</option>
            <option>Cutting Completed</option>
            <option>Sewing Started</option>
            <option>Finishing</option>
            <option>QC Checked</option>
            <option>Packed</option>
            <option>Shipped</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Factory / Warehouse / City"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block mb-1 font-medium">
            Note
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="4"
            placeholder="Additional info (optional)"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            Add Tracking
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard/approved-orders")}
            className="flex-1 py-3 rounded-lg border hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTracking;
