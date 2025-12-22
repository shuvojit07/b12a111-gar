import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const ManagerRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();

  // ✅ object destructuring
  const { role, status, loading } = useRole();

  if (authLoading || loading) {
    return (
      <p className="text-center mt-20">
        Checking permission...
      </p>
    );
  }

  // 🔴 suspended user block
  if (status === "suspended") {
    return (
      <Navigate to="/suspended" replace />
    );
  }

  if (user && role === "manager") {
    return children;
  }

  return (
    <Navigate
      to="/"
      state={{ from: location }}
      replace
    />
  );
};

export default ManagerRoute;
