import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileTemp() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const res = await api.get("/auth/me");

      setUser(res.data);

    } catch (err) {

      console.error("Failed to load Profile");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return <div className="p-6">Loading Profile...</div>;
  }

  if (!user) {
    return <div className="p-6">Failed to load Profile</div>;
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-xl mx-auto">

        <button
          onClick={() => navigate("/processing/dashboard")}
          className="mb-4 text-green-700"
        >
          ← Back
        </button>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-6 text-green-900">
            Processing Unit Profile
          </h2>

          <div className="space-y-2 text-sm">

            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phone}</p>
            <p><b>Address:</b> {user.address}</p>
            <p><b>Category:</b> {user.category}</p>

            <p>
              <b>Subscription:</b>{" "}
              {user.subscribed ? user.subscriptionType : "Not Subscribed"}
            </p>

          </div>

          {!user.subscribed && (

            <Link
              to="/processing/subscribe"
              className="bg-green-700 text-white px-5 py-2 rounded-full mt-5 inline-block"
            >
              Subscribe Now
            </Link>

          )}

        </div>

      </div>

    </div>

  );

}