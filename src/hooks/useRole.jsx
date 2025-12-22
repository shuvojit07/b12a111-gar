import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email || authLoading) return;

    axios
      .get(`http://localhost:5000/api/v1/users/${user.email}`)
      .then((res) => {
        setRole(res.data.role);
        setStatus(res.data.status);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, authLoading]);

  return { role, status, loading };
};

export default useRole;
