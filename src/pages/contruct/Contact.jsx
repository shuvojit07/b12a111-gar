const Contact = () => {
  return (
    <section className="min-h-screen mt-5 bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700">
            Contact Us
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have questions about orders, production tracking, or system usage?
            Our team is here to help you.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
            <h2 className="text-2xl font-semibold text-purple-600 mb-6">
              📍 Get in Touch
            </h2>

            <div className="space-y-4 text-gray-600">
              <p>
                <b>Office Address:</b> <br />
                Dhaka, Bangladesh
              </p>
              <p>
                <b>Email:</b> <br />
                support@garmentstracker.com
              </p>
              <p>
                <b>Phone:</b> <br />
                +880 1234 567 890
              </p>
            </div>

            <div className="mt-6 p-4 bg-purple-100 text-purple-700 rounded-lg">
              ⏱ We usually respond within 24 hours.
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
            <h2 className="text-2xl font-semibold text-purple-600 mb-6">
              ✉️ Send a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />

              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />

              <button
                type="submit"
                className="
                  w-full
                  p-[3px]
                  rounded-lg
                  bg-[linear-gradient(144deg,#a855f7,#7c3aed_50%,#6366f1)]
                  transition-all duration-300
                  active:scale-95
                "
              >
                <span
                  className="
                    block w-full
                    py-3
                    rounded-md
                    bg-[rgb(45,5,90)]
                    text-white font-semibold
                    hover:bg-transparent
                    transition-all
                  "
                >
                  Send Message
                </span>
              </button>
            </form>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default Contact;