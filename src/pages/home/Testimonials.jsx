import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO, TechCorp",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Great service & fast delivery!",
  },
  {
    name: "Michael Smith",
    position: "Product Manager, InnovateX",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    text: "Production tracking is very helpful",
  },
  {
    name: "Emma Williams",
    position: "Designer, CreativesCo",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Amazing quality and support!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">
        Customer Feedback
      </h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3500 }}
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto text-center"
            >
              {/* Avatar */}
              <img
                src={t.avatar}
                alt={t.name}
                className="w-20 h-20 mx-auto rounded-full mb-4 border-2 border-purple-500"
              />

              {/* Name & Position */}
              <h3 className="font-semibold text-lg">{t.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{t.position}</p>

              {/* Feedback */}
              <p className="text-gray-700">{t.text}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
