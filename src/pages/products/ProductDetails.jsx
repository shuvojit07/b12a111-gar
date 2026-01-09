import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role, loading } = useRole();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://garmentstracker.vercel.app/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product || loading) {
    return (
      <p className="text-center mt-20 text-lg text-gray-500">
        Loading product details...
      </p>
    );
  }

  const handleOrder = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (role === "admin" || role === "manager") {
      alert("Admin / Manager cannot place order");
      return;
    }

    navigate(`/dashboard/order/${product._id}`);
  };

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="
            mb-8
            inline-flex items-center gap-2
            text-purple-700 font-semibold
            hover:underline
          "
        >
          ← Back to Home
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="h-[420px] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-10 flex flex-col">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              {product.name}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Info */}
            <div className="space-y-2 text-slate-700 mb-8">
              <p>
                <span className="font-semibold">Price:</span> ${product.price}
              </p>
              <p>
                <span className="font-semibold">Available Quantity:</span>{" "}
                {product.quantity}
              </p>
              <p>
                <span className="font-semibold">Minimum Order:</span>{" "}
                {product.minOrder}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex flex-wrap gap-4">
              <button
                onClick={handleOrder}
                className="
                  flex items-center justify-center
                  p-[3px]
                  rounded-lg
                  bg-[linear-gradient(144deg,#a855f7,#7c3aed_50%,#6366f1)]
                  shadow-[rgba(168,85,247,0.4)_0_15px_30px_-5px]
                  transition-all duration-300
                  active:scale-95
                "
              >
                <span
                  className="
                    px-8 py-3
                    rounded-md
                    bg-[rgb(45,5,90)]
                    text-white font-semibold
                    hover:bg-transparent
                    transition-all
                  "
                >
                  Order / Book Now
                </span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="
                  px-8 py-3
                  rounded-lg
                  border border-slate-300
                  text-slate-700 font-semibold
                  hover:bg-slate-100
                  transition
                "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
