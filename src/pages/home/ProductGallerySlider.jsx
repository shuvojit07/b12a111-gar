import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductGallerySlider = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const IMAGES_PER_SLIDE = 9;
  const SHOW_TIME = 5000; // 5 sec fully visible
  const TRANSITION_TIME = 3000; // 3 sec animation

  useEffect(() => {
    fetch("https://garmentstracker.vercel.app/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔥 PERFECT TIMING CONTROL
  useEffect(() => {
    if (products.length === 0) return;

    let showTimer = setTimeout(() => {
      setIsTransitioning(true);

      let transitionTimer = setTimeout(() => {
        setPage(
          (prev) => (prev + 1) % Math.ceil(products.length / IMAGES_PER_SLIDE)
        );
        setIsTransitioning(false);
      }, TRANSITION_TIME);

      return () => clearTimeout(transitionTimer);
    }, SHOW_TIME);

    return () => clearTimeout(showTimer);
  }, [page, products]);

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading gallery...</p>
      </section>
    );
  }

  const start = page * IMAGES_PER_SLIDE;
  const currentImages = products.slice(start, start + IMAGES_PER_SLIDE);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, filter: "blur(18px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              filter: "blur(18px)",
            }}
            transition={{
              duration: TRANSITION_TIME / 1000, // 3s
              ease: "easeInOut",
            }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {currentImages.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl shadow-xl bg-white"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductGallerySlider;
