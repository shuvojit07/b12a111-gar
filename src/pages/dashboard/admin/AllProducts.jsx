import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch all products
  useEffect(() => {
    fetch("https://garmentstracker.vercel.app/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔹 toggle show on home
  const toggleShowHome = async (id, current) => {
    try {
      const res = await fetch(
        `https://garmentstracker.vercel.app/api/v1/products/${id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ showOnHome: !current }),
        }
      );

      if (!res.ok) throw new Error();

      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, showOnHome: !current } : p))
      );

      toast.success("Home page visibility updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  // 🔹 delete product
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(
        `https://garmentstracker.vercel.app/api/v1/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">Loading products...</p>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">All Products (Admin)</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Created By</th>
              <th className="p-3">Show on Home</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="border-t hover:bg-slate-50">
                <td className="p-3">{index + 1}</td>

                <td className="p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                    onError={(e) =>
                      (e.target.src = "https://placehold.co/100x100")
                    }
                  />
                </td>

                <td className="p-3 font-medium">{product.name}</td>

                <td className="p-3">৳{product.price}</td>

                <td className="p-3">{product.category}</td>

                <td className="p-3 text-sm text-slate-600">
                  {product.createdBy || "Admin"}
                </td>

                {/* Show on Home */}
                <td className="p-3">
                  <button
                    onClick={() =>
                      toggleShowHome(product._id, product.showOnHome)
                    }
                    className={`
                      relative inline-flex h-6 w-11 items-center
                      rounded-full transition
                      ${product.showOnHome ? "bg-purple-600" : "bg-slate-300"}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition
                        ${
                          product.showOnHome ? "translate-x-6" : "translate-x-1"
                        }
                      `}
                    />
                  </button>
                </td>

                {/* Actions */}
                <td className="p-3 space-x-2">
                  <Link
                    to={`/dashboard/update-product/${product._id}`}
                    className="
    inline-block
    px-3 py-1.5
    rounded-md
    text-sm font-semibold
    bg-blue-600
    text-white
    hover:bg-blue-700
    transition
  "
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="
                      inline-block
                      px-3 py-1.5
                      rounded-md
                      text-sm font-semibold
                      bg-red-500
                      text-white
                      hover:bg-red-600
                      transition
                    "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
