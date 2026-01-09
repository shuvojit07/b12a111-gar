import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch existing product
  useEffect(() => {
    fetch(`https://garmentstracker.vercel.app/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // 🔹 submit update
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
      navigate("/dashboard/manage-products");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading || !product) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading product...
      </p>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
          Update Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-5"
        >
          {/* Product Name */}
          <div>
            <label className="block mb-1 font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={product.name}
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={product.description}
              rows="4"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block mb-1 font-medium">
                Category
              </label>
              <input
                type="text"
                name="category"
                defaultValue={product.category}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Price
              </label>
              <input
                type="number"
                name="price"
                min="1"
                defaultValue={product.price}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Available Quantity
              </label>
              <input
                type="number"
                name="quantity"
                min="0"
                defaultValue={product.quantity}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Minimum Order
              </label>
              <input
                type="number"
                name="minOrder"
                min="1"
                defaultValue={product.minOrder}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              defaultValue={product.image}
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Payment */}
          <div>
            <label className="block mb-1 font-medium">
              Payment Mode
            </label>
            <select
              name="paymentType"
              defaultValue={product.paymentType}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="payfirst">Pay First</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/manage-products")
              }
              className="w-full sm:w-auto px-6 py-3 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
