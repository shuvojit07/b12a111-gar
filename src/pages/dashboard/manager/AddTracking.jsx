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

  // 🔹 Fetch order
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!status) {
      toast.error("Please select tracking status");
      return;
    }

    const trackingData = {
      status,
      note,
      location,
      time: new Date(),
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/orders/${id}/tracking`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(trackingData),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Tracking update added!");
      navigate("/dashboard/approved-orders");
    } catch {
      toast.error("Failed to add tracking");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20">
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
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Add Tracking Update
      </h2>

      {/* Order info */}
      <div className="bg-base-100 shadow p-4 rounded mb-6">
        <p>
          <b>Order ID:</b> {order._id}
        </p>
        <p>
          <b>Product:</b> {order.productName}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 shadow rounded p-6 space-y-4"
      >
        {/* Status */}
        <div>
          <label className="label">Tracking Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered w-full"
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
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="label">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Factory / Warehouse / City"
            className="input input-bordered w-full"
          />
        </div>

        {/* Note */}
        <div>
          <label className="label">Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Additional info (optional)"
          />
        </div>

        <button className="btn btn-primary w-full">
          Add Tracking
        </button>
      </form>
    </div>
  );
};

export default AddTracking;
