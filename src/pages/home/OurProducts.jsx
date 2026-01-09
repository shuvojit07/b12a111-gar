import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://garmentstracker.vercel.app/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 6));
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Our Products
          </h2>
          <p className="text-slate-500 mt-3 text-lg">
            Premium garments crafted with precision
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.map((p) => (
              <div
                key={p._id}
                className="
                  group
                  bg-white
                  rounded-3xl
                  border border-slate-200
                  shadow-sm
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all duration-500
                  overflow-hidden
                  flex flex-col
                "
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="
                      w-full h-full object-cover
                      transition-transform duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">
                    {p.name}
                  </h3>

                  <p className="text-slate-500 mb-6 font-medium">${p.price}</p>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link
                      to={`/products/${p._id}`}
                      className="
                        inline-flex items-center justify-center
                        w-full
                        px-6 py-3
                        rounded-full
                        text-sm font-semibold
                        text-purple-700
                        border border-purple-600
                        hover:bg-purple-600
                        hover:text-white
                        transition-all duration-300
                      "
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurProducts;
