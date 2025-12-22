import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  // 🔹 Fetch users
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔹 Open modal
  const openModal = (user) => {
    setSelectedUser(user);
    setRole(user.role);
    setStatus(user.status);
    setReason(user.suspendReason || "");
    setFeedback(user.suspendFeedback || "");
    document.getElementById("user_modal").showModal();
  };

  // 🔹 Update user
  const handleUpdate = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/users/${selectedUser.email}`,
        {
          role,
          status,
          suspendReason: status === "suspended" ? reason : "",
          suspendFeedback: status === "suspended" ? feedback : "",
        }
      );

      toast.success("User updated successfully");
      window.location.reload();
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto p-5 bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.email}>
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td className="text-sm">{user.email}</td>

                <td>
                  <span className="badge badge-outline">{user.role}</span>
                </td>

                <td>
                  <span
                    className={`badge ${
                      user.status === "active" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="text-right">
                  <button
                    onClick={() => openModal(user)}
                    className="btn btn-xs btn-outline btn-primary"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      <dialog id="user_modal" className="modal ">
        <div className="modal-box modal-box w-full max-w-md bg-white rounded-xl shadow-lg p-6 relative">
          <h3 className="font-bold text-lg mb-4">Update User</h3>

          {/* Role */}
          <label className="label">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="buyer">Buyer</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          {/* Status */}
          <label className="label mt-3">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>

          {/* Suspend details */}
          {status === "suspended" && (
            <>
              <input
                placeholder="Suspend Reason"
                className="input input-bordered w-full mt-3"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />

              <textarea
                placeholder="Admin Feedback"
                className="textarea textarea-bordered w-full mt-2"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </>
          )}

          <div className="modal-action">
            <button onClick={handleUpdate} className="btn btn-sm btn-outline mt-3">
              Save Changes
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("user_modal").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;
