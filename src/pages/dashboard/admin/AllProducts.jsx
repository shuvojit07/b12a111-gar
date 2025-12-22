import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch all products
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/products")
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
        `http://localhost:5000/api/v1/products/${id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ showOnHome: !current }),
        }
      );

      if (!res.ok) throw new Error();

      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, showOnHome: !current } : p
        )
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
        `http://localhost:5000/api/v1/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Product deleted");
      setProducts((prev) =>
        prev.filter((p) => p._id !== id)
      );
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20">
        Loading products...
      </p>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">
        All Products (Admin)
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>

                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) =>
                      (e.target.src =
                        "https://placehold.co/100x100")
                    }
                  />
                </td>

                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.createdBy || "Admin"}</td>

                {/* Show on Home */}
                <td>
                  <input
                    type="checkbox"
                    checked={product.showOnHome || false}
                    onChange={() =>
                      toggleShowHome(
                        product._id,
                        product.showOnHome
                      )
                    }
                    className="toggle toggle-primary"
                  />
                </td>

                {/* Actions */}
                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() =>
                      toast.info(
                        "Edit page can be added if needed"
                      )
                    }
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() =>
                      handleDelete(product._id)
                    }
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
