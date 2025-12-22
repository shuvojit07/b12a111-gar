import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const BuyerRoute = ({ children }) => {
  const { role, loading } = useRole();

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // 🔥 allow until role is resolved
  if (!role) {
    return <p className="text-center mt-10">Checking access...</p>;
  }

  if (role !== "buyer") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default BuyerRoute;
