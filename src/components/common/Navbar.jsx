import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

// ✅ FIXED motion usage
const MotionLink = motion.create(Link);

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-purple-600 font-semibold border-b-2 border-purple-600"
      : "text-gray-700 hover:text-purple-600 transition";

  const menuItems = (
    <>
      <NavLink to="/" className={navLinkStyle} onClick={() => setMenuOpen(false)}>
        Home
      </NavLink>

      <NavLink
        to="/all-products"
        className={navLinkStyle}
        onClick={() => setMenuOpen(false)}
      >
        All Products
      </NavLink>

      <NavLink
        to="/about"
        className={navLinkStyle}
        onClick={() => setMenuOpen(false)}
      >
        About Us
      </NavLink>

      <NavLink
        to="/contact"
        className={navLinkStyle}
        onClick={() => setMenuOpen(false)}
      >
        Contact
      </NavLink>

      {!user ? (
        <>
          <NavLink
            to="/login"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Register
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/dashboard"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </NavLink>

          {/* Avatar */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="user"
              className="w-9 h-9 rounded-full border cursor-pointer"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
              {(user?.displayName || user?.email)?.[0]?.toUpperCase()}
            </div>
          )}

          {/* Logout */}
          <button
            onClick={() => {
              logoutUser();
              setMenuOpen(false);
            }}
            className="
              flex items-center justify-center
              min-w-[110px]
              p-[2px]
              rounded-lg
              bg-[linear-gradient(144deg,#a855f7,#7c3aed_50%,#6366f1)]
              shadow-[rgba(168,85,247,0.4)_0_15px_30px_-5px]
              transition-all duration-300
              active:scale-90
            "
          >
            <span
              className="
                w-full h-full
                px-6 py-3
                rounded-md
                bg-[rgb(45,5,90)]
                text-white font-semibold
                transition-all duration-300
                hover:bg-transparent
              "
            >
              Logout
            </span>
          </button>
        </>
      )}
    </>
  );

  return (
    <header className="fixed w-full z-50 bg-white shadow">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        
        {/* Logo */}
        <MotionLink
          to="/"
          className="text-2xl font-bold text-purple-600"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setMenuOpen(false)}
        >
          GarmentsTracker
        </MotionLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          {menuItems}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-purple-600"></span>
          <span className="w-6 h-0.5 bg-purple-600"></span>
          <span className="w-6 h-0.5 bg-purple-600"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <ul className="flex flex-col gap-4 p-6">
              {menuItems}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
