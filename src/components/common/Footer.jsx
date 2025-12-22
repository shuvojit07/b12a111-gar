const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-bold">GarmentsTracker</h2>
          <p className="mt-2 text-sm">
            Garments Order & Production Tracker System
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-1 text-sm">
            <li>Home</li>
            <li>All Products</li>
            <li>Dashboard</li>
          </ul>
        </div>

        <div>
          <p className="text-sm">
            © {new Date().getFullYear()} GarmentsTracker  
            <br />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
