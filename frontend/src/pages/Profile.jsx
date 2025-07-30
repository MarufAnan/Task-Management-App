import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { Pencil } from "lucide-react"; // you can use any icon library you prefer

export default function Profile() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setUser(res.data);
        setForm({ name: res.data.name, password: "" });
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/api/user/me`, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      alert("Profile updated");
      setUser({ ...user, name: form.name });
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!user) return <p className="text-center mt-4">Loading...</p>;

  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded text-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-4">👤 Profile</h2>

      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-24 h-24 rounded-full shadow mx-auto mb-4"
      />

      {!isEditing ? (
        <>
          <h3 className="text-xl font-semibold mb-2">Name: {user.name}</h3>
          <p className="text-lg mb-4">Email: {user.email}</p>

          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            <Pencil size={18} />
            Edit
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            value={user.email}
            disabled
            className="border p-2 rounded bg-gray-100"
          />
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Enter name"
            className="border p-2 rounded"
          />
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="New password (optional)"
            className="border p-2 rounded"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
