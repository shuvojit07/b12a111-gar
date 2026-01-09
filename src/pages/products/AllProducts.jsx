import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://garmentstracker.vercel.app/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>

      {/* Search Input */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded"
            />

            <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>

            <p className="text-sm text-gray-600">
              Category: {product.category}
            </p>

            <p>Price: ৳{product.price}</p>
            <p>Available: {product.quantity}</p>

            {/* Stylish Button */}
            <Link
              to={`/products/${product._id}`}
              className="mt-4 inline-block w-full text-center rounded-lg bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 p-2 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="text-white font-semibold">View Details</span>
            </Link>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
