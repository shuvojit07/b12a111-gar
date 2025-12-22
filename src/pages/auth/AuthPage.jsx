import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { loginUser, createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ================= LOGIN ================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      Swal.fire("Success", "Login successful", "success");
      navigate("/");
    } catch {
      Swal.fire("Error", "Email or password incorrect", "error");
    }
  };

  /* ================= REGISTER ================= */
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

      await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        photoURL,
        role,
        status: "pending",
      });

      Swal.fire("Success", "Registration successful", "success");
      setIsSignUp(false);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  /* ================= GOOGLE ================= */
  const handleGoogle = async () => {
    try {
      const result = await googleLogin();
      await axios.post("http://localhost:5000/api/users", {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "buyer",
        status: "pending",
      });
      Swal.fire("Success", "Google login successful", "success");
      navigate("/");
    } catch {
      Swal.fire("Error", "Google login failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="relative w-full max-w-4xl h-[520px] bg-white rounded-xl shadow-xl overflow-hidden">
        {/* ================= FORMS ================= */}
        <div
          className={`absolute inset-0 flex transition-transform duration-700 ${
            isSignUp ? "-translate-x-1/2" : "translate-x-0"
          }`}
        >
          {/* SIGN IN */}
          <div className="w-1/2 flex items-center justify-center p-10">
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <h2 className="text-3xl font-bold mb-4">Sign In</h2>
              <input
                name="email"
                placeholder="Email"
                className="w-full border px-4 py-3 rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border px-4 py-3 rounded"
                required
              />
              <button className="w-full bg-indigo-600 text-white py-3 rounded font-semibold">
                Login
              </button>
              <button
                type="button"
                onClick={handleGoogle}
                className="w-full border py-3 rounded font-semibold"
              >
                Login with Google
              </button>
            </form>
          </div>

          {/* SIGN UP */}
          <div className="w-1/2 flex items-center justify-center p-10">
            <form onSubmit={handleRegister} className="w-full space-y-3">
              <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
              <input
                name="name"
                placeholder="Name"
                className="w-full border px-4 py-3 rounded"
                required
              />
              <input
                name="email"
                placeholder="Email"
                className="w-full border px-4 py-3 rounded"
                required
              />
              <input
                name="photo"
                placeholder="Photo URL"
                className="w-full border px-4 py-3 rounded"
                required
              />
              <select name="role" className="w-full border px-4 py-3 rounded">
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
              </select>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border px-4 py-3 rounded"
                required
              />
              <button className="w-full bg-indigo-600 text-white py-3 rounded font-semibold">
                Register
              </button>
            </form>
          </div>
        </div>

        {/* ================= OVERLAY ================= */}
        <div
          className={`absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex flex-col items-center justify-center text-center px-10 transition-transform duration-700 ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          {isSignUp ? (
            <>
              <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>
              <p className="mb-6">Login with your personal information</p>
              <button
                onClick={() => setIsSignUp(false)}
                className="border border-white px-6 py-2 rounded"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-3">Hello, Friend!</h2>
              <p className="mb-6">Enter your details and start your journey</p>
              <button
                onClick={() => setIsSignUp(true)}
                className="border border-white px-6 py-2 rounded"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
