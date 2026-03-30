import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Orders from "./Orders";

import {
  LogOut,
  Package,
  CheckCircle,
  Truck,
  Menu,
  User
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function ProcessingDashboard() {

  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const [showMobileNav, setShowMobileNav] = useState(false);

  const [stats, setStats] = useState({
    available: 0,
    accepted: 0,
    picked: 0
  });

  const [activeTab, setActiveTab] = useState("available");

  useEffect(() => {

    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "processing") {
      navigate("/login");
      return;
    }

    fetchStats();

  }, [user, loading, navigate]);

  const fetchStats = async () => {

    try {

      const res = await api.get("/orders/processing/stats");

      setStats(res.data);

    } catch (err) {

      console.error("Failed to load stats");

    }

  };

  if (loading) {
    return (
      <div className="p-6">
        Loading Dashboard...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= TOP BAR ================= */}

      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

        <button
          className="md:hidden text-green-800"
          onClick={() => setShowMobileNav(true)}
        >
          <Menu size={26} />
        </button>

        <h1 className="text-lg font-semibold text-green-900">
          Processing Dashboard
        </h1>

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/processing/profileTemp")}
            className="flex items-center gap-1 text-green-800"
          >
            <User size={18} />
            Profile
          </button>

          <button
            onClick={logout}
            className="hidden md:flex items-center gap-2 text-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

      {/* ================= MOBILE NAV ================= */}

      {showMobileNav && (

        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden">

          <div className="bg-white w-72 h-full p-6 flex flex-col">

            <p className="font-semibold text-green-900 mb-6">
              {user?.businessName || user?.name}
            </p>

            <nav className="flex flex-col gap-4">

              <NavItem
                icon={<Package />}
                text="Available Orders"
                onClick={() => {
                  setActiveTab("available");
                  setShowMobileNav(false);
                }}
              />

              <NavItem
                icon={<CheckCircle />}
                text="Accepted Orders"
                onClick={() => {
                  setActiveTab("accepted");
                  setShowMobileNav(false);
                }}
              />

              <NavItem
                icon={<Truck />}
                text="Picked Orders"
                onClick={() => {
                  setActiveTab("picked");
                  setShowMobileNav(false);
                }}
              />

              <NavItem
                icon={<User />}
                text="Profile"
                onClick={() => {
                  navigate("/processing/profileTemp");
                  setShowMobileNav(false);
                }}
              />

              <NavItem
                icon={<LogOut />}
                text="Logout"
                onClick={logout}
                red
              />

            </nav>

            <button
              className="mt-auto text-sm text-gray-500"
              onClick={() => setShowMobileNav(false)}
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* ================= DASHBOARD ================= */}

      <div className="p-6 max-w-6xl mx-auto">

        {/* SUMMARY CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <StatCard
            icon={<Package />}
            label="Available Orders"
            value={stats.available}
            color="bg-yellow-100 text-yellow-800"
            onClick={() => setActiveTab("available")}
          />

          <StatCard
            icon={<CheckCircle />}
            label="Accepted Orders"
            value={stats.accepted}
            color="bg-blue-100 text-blue-800"
            onClick={() => setActiveTab("accepted")}
          />

          <StatCard
            icon={<Truck />}
            label="Picked Orders"
            value={stats.picked}
            color="bg-green-100 text-green-800"
            onClick={() => setActiveTab("picked")}
          />

        </div>

        {/* ORDERS LIST */}

        <Orders activeTab={activeTab} />

      </div>

    </div>

  );

}

/* ================= COMPONENTS ================= */

function StatCard({ icon, label, value, color, onClick }) {

  return (

    <div
      onClick={onClick}
      className={`p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition ${color}`}
    >

      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-sm font-medium">{label}</p>
      </div>

      <p className="text-3xl font-bold">{value}</p>

    </div>

  );

}

function NavItem({ icon, text, onClick, red }) {

  return (

    <button
      onClick={onClick}
      className={`flex items-center gap-3 text-base ${
        red ? "text-red-600" : "text-green-900"
      }`}
    >

      {icon} {text}

    </button>

  );

}