import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProductAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch product by id
  useEffect(() => {
    fetch(`https://garmentstracker.vercel.app/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // 🔹 update submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedProduct = {
      name: form.name.value,
      description: form.description.value,
      category: form.category.value,
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
      minOrder: Number(form.minOrder.value),
      image: form.image.value,
      paymentType: form.paymentType.value,
      showOnHome: form.showOnHome.checked,
    };

    try {
      const res = await fetch(
        `https://garmentstracker.vercel.app/api/v1/products/${id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Product updated successfully");
      navigate("/dashboard/all-products");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading || !product) {
    return (
      <p className="text-center mt-20 text-gray-500">Loading product...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-8">Update Product (Admin)</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            defaultValue={product.name}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={product.description}
            rows="4"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={product.category}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              defaultValue={product.price}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Available Quantity</label>
            <input
              type="number"
              name="quantity"
              defaultValue={product.quantity}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Minimum Order</label>
            <input
              type="number"
              name="minOrder"
              defaultValue={product.minOrder}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={product.image}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Payment */}
        <div>
          <label className="block mb-1 font-medium">Payment Mode</label>
          <select
            name="paymentType"
            defaultValue={product.paymentType}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="payfirst">Pay First</option>
          </select>
        </div>

        {/* Show on Home */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="showOnHome"
            defaultChecked={product.showOnHome}
          />
          Show on Home Page
        </label>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            Update Product
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard/all-products")}
            className="px-6 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductAdmin;
