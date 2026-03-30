import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // 🔑 MOST IMPORTANT

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      // 🔑 UPDATE CONTEXT (THIS FIXES DASHBOARD ISSUE)
      login(res.data.token);

      // ✅ ROLE BASED REDIRECT
      if (res.data.user.role === "seller") {
        navigate("/seller/dashboard");
      } else if (res.data.user.role === "processing") {
        navigate("/processing/dashboard");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-green-900">
            Login
          </h2>

          <p className="text-center text-green-700 mt-2 mb-8">
            Welcome back to EcoMarket
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-green-900 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-900 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-full hover:bg-green-800 transition"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
