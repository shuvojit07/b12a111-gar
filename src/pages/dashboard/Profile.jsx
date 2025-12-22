import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/api/v1/users/${user.email}`)
      .then((res) => {
        setDbUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ API error:", err);
        setLoading(false);
      });
  }, [user]);

  /* 🔥 DEBUG LOGS (IMPORTANT) */
  console.log("🔥 Firebase user:", user);
  console.log("🔥 DB user:", dbUser);
  console.log("🔥 Firebase photo:", user?.photoURL);
  console.log("🔥 DB photo:", dbUser?.photoURL);

  if (loading) {
    return <p className="text-center mt-20 text-lg">Loading profile...</p>;
  }

  // ❗ ONLY DB photo (safe)
  const profileImage = dbUser?.photoURL;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      <div className="bg-base-100 shadow-xl rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* ✅ SIMPLE IMAGE (NO DaisyUI avatar) */}
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-28 h-28 rounded-full border object-cover"
              onError={(e) => {
                console.log("❌ Image load failed");
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
              {(user?.displayName || user?.email)?.[0]?.toUpperCase()}
            </div>
          )}

          {/* User Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold">
              {dbUser?.name || user?.displayName || "User"}
            </h3>
            <p className="text-gray-500">{user?.email}</p>

            <div className="flex gap-3 mt-3 justify-center md:justify-start">
              <span className="badge badge-outline">
                Role: {dbUser?.role}
              </span>
              <span className="badge badge-success">
                Status: {dbUser?.status}
              </span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={logoutUser}
            className="btn btn-error btn-outline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
