import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const MotionLink = motion.create(Link);

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinkStyle = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-purple-600 font-semibold border-b-2 border-purple-600"
        : "text-gray-700 hover:text-purple-600"
    }`;

  const commonLinks = [
    { to: "/", label: "Home" },
    { to: "/all-products", label: "All Products" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <MotionLink
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-purple-600"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          GarmentsTracker
        </MotionLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          {commonLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className={navLinkStyle}>
              {label}
            </NavLink>
          ))}

          {!user ? (
            <>
              <NavLink to="/login" className={navLinkStyle}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkStyle}>
                Register
              </NavLink>
            </>
          ) : (
            <UserActions user={user} logoutUser={logoutUser} />
          )}
        </ul>

        {/* Mobile Button */}
        <button
          aria-label="Toggle Menu"
          className="md:hidden space-y-1"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="block w-6 h-0.5 bg-purple-600" />
          <span className="block w-6 h-0.5 bg-purple-600" />
          <span className="block w-6 h-0.5 bg-purple-600" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col gap-4 p-6">
              {commonLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={navLinkStyle}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              ))}

              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    className={navLinkStyle}
                    onClick={closeMenu}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={navLinkStyle}
                    onClick={closeMenu}
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <UserActions
                  user={user}
                  logoutUser={logoutUser}
                  onClose={closeMenu}
                  mobile
                />
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ---------- User Actions ---------- */
const UserActions = ({ user, logoutUser, onClose, mobile }) => {
  const handleLogout = () => {
    logoutUser();
    onClose?.();
  };

  return (
    <div
      className={`flex items-center gap-4 ${mobile && "flex-col items-start"}`}
    >
      {/* Avatar */}
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt="User Avatar"
          className="w-9 h-9 rounded-full border"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
          {(user?.displayName || user?.email)?.[0]?.toUpperCase()}
        </div>
      )}

      <NavLink to="/dashboard" className="text-gray-700 hover:text-purple-600">
        Dashboard
      </NavLink>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="min-w-[110px] p-[2px] rounded-lg bg-[linear-gradient(144deg,#a855f7,#7c3aed_50%,#6366f1)] shadow-lg active:scale-95 transition"
      >
        <span className="block px-6 py-2 rounded-md bg-[rgb(45,5,90)] text-white font-semibold hover:bg-transparent transition">
          Logout
        </span>
      </button>
    </div>
  );
};

export default Navbar;
