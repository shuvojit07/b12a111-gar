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

    fetch(`http://localhost:5000/api/v1/products?manager=${user.email}`)
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
      const res = await fetch(`http://localhost:5000/api/v1/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔍 search filter
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-20">Loading products...</p>;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full max-w-md mb-4"
      />

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="text-left">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment Mode</th>
              <th className="">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>

                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) =>
                      (e.target.src = "https://placehold.co/100x100")
                    }
                  />
                </td>

                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  {product.paymentType === "cod"
                    ? "Cash on Delivery"
                    : "Pay First"}
                </td>

                <td className="space-x-2">
                  <Link
                    to={`/dashboard/update-product/${product._id}`}
                    className="btn btn-xs btn-info"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-xs btn-error"
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
