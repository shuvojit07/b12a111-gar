import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    notes: "",
  });

  // 🔹 Load product
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/products/${id}`)
      .then((res) => {
        const data = res.data;
        setProduct(data);
        setQuantity(Number(data.minOrder)); // always valid default
      })
      .catch(() => {
        toast.error("Failed to load product");
      });
  }, [id]);

  if (!product) {
    return <p className="text-center mt-20 text-lg">Loading product...</p>;
  }

  // 🔹 Safe numbers
  const price = Number(product.price);
  const min = Number(product.minOrder);
  const max = Number(product.quantity);

  // 🔹 Always valid total
  const totalPrice = quantity * price;

  // 🔹 Quantity handler (auto-fix invalid input)
  const handleQuantityChange = (e) => {
    let val = Number(e.target.value);

    if (isNaN(val)) return;

    if (val < min) val = min;
    if (val > max) val = max;

    setQuantity(val);
  };

  // 🔹 Proceed to payment
  const handleNext = async () => {
    if (quantity < min || quantity > max) {
      return toast.error("Invalid quantity");
    }

    const order = {
      userEmail: user.email,
      productId: product._id,
      productName: product.name,
      quantity,
      totalPrice,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      address: form.address,
      notes: form.notes,
      status: "unpaid",
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/orders",
        order
      );

      navigate(`/dashboard/payment/${res.data.insertedId}`);
    } catch {
      toast.error("Order creation failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
      {/* ================= LEFT: BILLING ================= */}
      <div className="bg-base-100 shadow-lg rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold">Billing Details</h2>

        <input
          value={user.email}
          readOnly
          className="input input-bordered w-full"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="First Name"
            className="input input-bordered"
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            placeholder="Last Name"
            className="input input-bordered"
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <input
          placeholder="Phone Number"
          className="input input-bordered w-full"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <textarea
          placeholder="Delivery Address"
          className="textarea textarea-bordered w-full"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <textarea
          placeholder="Notes (optional)"
          className="textarea textarea-bordered w-full"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>

      {/* ================= RIGHT: ORDER SUMMARY ================= */}
      <div className="bg-base-100 shadow-lg rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold">Order Summary</h2>

        <div className="flex justify-between">
          <span>Product</span>
          <span className="font-semibold">{product.name}</span>
        </div>

        <div className="flex justify-between">
          <span>Price</span>
          <span>৳{product.price}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Quantity</span>
          <input
            type="number"
            min={min}
            max={max}
            value={quantity}
            onChange={handleQuantityChange}
            className="input input-bordered w-24"
          />
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>৳{totalPrice}</span>
        </div>

        <button onClick={handleNext} className="btn btn-primary w-full mt-4">
          Proceed to Payment →
        </button>
      </div>
    </div>
  );
};

export default OrderForm;
