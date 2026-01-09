import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const [heroes, setHeroes] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // fetch hero data
  useEffect(() => {
    fetch("https://garmentstracker.vercel.app/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setHeroes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hero fetch error:", err);
        setLoading(false);
      });
  }, []);

  // auto slide
  useEffect(() => {
    if (heroes.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroes.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [heroes]);

  // 🔹 loading UI (VERY IMPORTANT)
  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <p className="text-xl">Loading hero...</p>
      </section>
    );
  }

  // 🔹 fallback (if API empty)
  if (heroes.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <p className="text-xl">No hero data found</p>
      </section>
    );
  }

  const hero = heroes[index];

  return (
    <section className="min-h-[75vh] flex items-center bg-gradient-to-r from-indigo-600 to-purple-700 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* TEXT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={hero.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.name}</h1>

            <p className="mb-6 text-xl text-indigo-100">{hero.description}</p>

            <Link
              to="/all-products"
              className="inline-block rounded-xl p-[3px] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-lg hover:scale-105 transition"
            >
              <span className="block bg-indigo-950 text-white px-8 py-4 rounded-lg text-lg font-semibold">
                View Products
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* IMAGE */}
        <AnimatePresence mode="wait">
          <motion.img
            key={hero.image}
            src={hero.image}
            alt="Hero"
            className="rounded-lg shadow-lg w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
