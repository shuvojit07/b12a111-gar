import { motion } from "framer-motion";

const steps = [
  "Place Order",
  "Production Started",
  "Quality Check",
  "Packaging",
  "Delivered",
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {/* Animated Number Circle */}
            <motion.div
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-white font-bold mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {i + 1}
            </motion.div>

            <h3 className="font-semibold text-lg text-center">{step}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
