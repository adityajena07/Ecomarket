import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ProfileTemp() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("PROFILE DATA:", res.data); // 🔥 DEBUG

      setUser(res.data);

    } catch (err) {
      console.error(err);
      setError("Unable to load profile. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading Profile...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">

      <div className="max-w-xl mx-auto">

        <button
          onClick={() => navigate("/processing/dashboard")}
          className="mb-4 text-green-700 font-medium"
        >
          ← Back
        </button>

        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6 text-green-900 text-center">
            Processing Unit Profile
          </h2>

          {/* USER CARD */}
          <div className="space-y-4 text-sm">

            <ProfileRow label="Name" value={user?.name} />
            <ProfileRow label="Email" value={user?.email} />
            <ProfileRow label="Phone" value={user?.phone} />
            <ProfileRow label="Address" value={user?.address} />

            <ProfileRow
              label="Current Category"
              value={user?.category}
              highlight
            />

            <ProfileRow
              label="Access"
              value={user?.isPremium ? "All Categories" : "Single Category"}
              premium={user?.isPremium}
            />

          </div>

          {/* PREMIUM BUTTON */}
          {!user?.isPremium && (
            <button
              onClick={() => navigate("/processing/subscribe")}
              className="w-full mt-6 bg-green-700 hover:bg-green-800 text-white py-2 rounded-full transition"
            >
              Unlock All Categories (Premium)
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

/* ================= SMALL COMPONENT ================= */

function ProfileRow({ label, value, highlight, premium }) {

  return (
    <div className="flex justify-between border-b pb-2">

      <span className="font-medium text-gray-600">{label}</span>

      <span
        className={`font-semibold ${highlight
            ? "text-green-700"
            : premium
              ? "text-green-600"
              : "text-gray-800"
          }`}
      >
        {value || "Not Available"}
      </span>

    </div>
  );
}