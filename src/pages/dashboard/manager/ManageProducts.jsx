import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 fetch only manager products
  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://garmentstracker.vercel.app/api/v1/products?manager=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // 🔹 delete product
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(
        `https://garmentstracker.vercel.app/api/v1/products/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error();

      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  //  search filter
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">Loading products...</p>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full max-w-md mb-6
          px-4 py-2
          border border-slate-300
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500
        "
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Payment Mode</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product, index) => (
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

                <td className="p-3">${product.price}</td>

                <td className="p-3">
                  {product.paymentType === "cod"
                    ? "Cash on Delivery"
                    : "Pay First"}
                </td>

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

        {filteredProducts.length === 0 && (
          <p className="text-center mt-6 text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
