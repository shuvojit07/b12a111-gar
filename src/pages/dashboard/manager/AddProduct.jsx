import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const product = {
      name: form.name.value.trim(),
      description: form.description.value.trim(),
      category: form.category.value,
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
      minOrder: Number(form.moq.value),
      payment: form.payment.value,
      image: form.image.value.trim(),
      showHome: form.showHome.checked,
      createdAt: new Date(),
    };

    if (product.price <= 0 || product.quantity <= 0) {
      Swal.fire(
        "Invalid Input",
        "Price & Quantity must be greater than 0",
        "warning"
      );
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/v1/products", product);

      Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "Product added successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      form.reset();
    } catch {
      Swal.fire("Error", "Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-100 shadow-xl rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="label">Product Name</label>
          <input
            name="name"
            className="input input-bordered w-full"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Product description"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select category</option>
            <option>Shirt</option>
            <option>Pant</option>
            <option>Jacket</option>
          </select>
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Price ($)</label>
            <input
              name="price"
              type="number"
              className="input input-bordered w-full"
              placeholder="Price"
              required
            />
          </div>

          <div>
            <label className="label">Available Quantity</label>
            <input
              name="quantity"
              type="number"
              className="input input-bordered w-full"
              placeholder="Stock"
              required
            />
          </div>
        </div>

        {/* MOQ */}
        <div>
          <label className="label">Minimum Order Quantity</label>
          <input
            name="moq"
            type="number"
            className="input input-bordered w-full"
            placeholder="Minimum order"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="label">Image URL</label>
          <input
            name="image"
            className="input input-bordered w-full"
            placeholder="https://image-link"
            required
          />
        </div>

        {/* Payment */}
        <div>
          <label className="label">Payment Option</label>
          <select
            name="payment"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select payment</option>
            <option value="COD">Cash on Delivery</option>
            <option value="PayFirst">Pay First</option>
          </select>
        </div>

        {/* Show Home */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="showHome"
            className="checkbox checkbox-primary"
          />
          <span>Show this product on Home page</span>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
