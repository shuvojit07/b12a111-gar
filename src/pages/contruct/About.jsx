



const About = () => {
  return (
    <section className="min-h-screen mt-5 bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Page Title */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700">
            About Our Platform
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            GarmentsTracker is a smart order and production management platform
            built to simplify how garment factories handle orders, production
            stages, and delivery tracking.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* Left */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-purple-600 mb-2">
                What We Do
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We help garment businesses manage their daily operations digitally.
                From receiving buyer orders to tracking production progress,
                everything is organized in one system for better efficiency
                and transparency.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-purple-600 mb-2">
                Production Tracking Made Easy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Each order moves through multiple production stages such as
                cutting, sewing, finishing, quality check, and delivery.
                Users can track progress in real-time without confusion.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-purple-600 mb-2">
                Built for Different Users
              </h2>
              <ul className="text-gray-600 space-y-2">
                <li>• Buyers can place orders and track their status</li>
                <li>• Managers control products and production flow</li>
                <li>• Admins oversee users, orders, and system activity</li>
              </ul>
            </div>
          </div>

          {/* Right */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">
              Why Choose This System?
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>✔ Clear order & production visibility</li>
              <li>✔ Role-based dashboards and access control</li>
              <li>✔ Secure login & protected private routes</li>
              <li>✔ Responsive design for all devices</li>
              <li>✔ Simple, clean, and user-friendly interface</li>
            </ul>

            <p className="mt-6 text-gray-600">
              Our goal is to reduce manual tracking, minimize errors,
              and help garment businesses focus more on production quality
              and timely delivery.
            </p>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default About;
