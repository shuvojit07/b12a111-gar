import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ================= EMAIL REGISTER ================= */
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photo.value;
    const role = form.role.value;
    const password = form.password.value;

    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      password.length < 6
    ) {
      return Swal.fire(
        "Invalid Password",
        "Must contain uppercase, lowercase & minimum 6 characters",
        "error"
      );
    }

    try {
      await createUser(email, password);

      try {
        await axios.post("http://localhost:5000/api/v1/users", {
          name,
          email,
          photoURL,
          role,
          status: "pending",
        });
      } catch {}

      Swal.fire("Success", "Registration successful", "success");
      navigate("/"); // 🔥 HOME PAGE
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  /* ================= GOOGLE REGISTER ================= */
  const handleGoogleRegister = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      try {
        await axios.post("http://localhost:5000/api/v1/users", {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "buyer",
          status: "pending",
        });
      } catch {}

      Swal.fire("Success", "Google registration successful", "success");
      navigate("/"); // 🔥 HOME PAGE
    } catch {
      Swal.fire("Error", "Google registration failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join us and start your journey 🚀
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="photo"
            placeholder="Photo URL"
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <select
            name="role"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="buyer">Buyer</option>
            <option value="manager">Manager</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Register
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative text-center text-sm text-gray-500 bg-white px-3">
            OR
          </div>
        </div>

        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
