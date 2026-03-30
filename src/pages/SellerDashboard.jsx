import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LogOut,
    User,
    PackagePlus,
    List,
    Menu,
    Wallet,
    Clock,
    CheckCircle,
    Truck,
    IndianRupee,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function SellerDashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [showProfile, setShowProfile] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);

    // 🔥 REAL STATS (backend se)
    const [stats, setStats] = useState({
        listed: 0,
        accepted: 0,
        picked: 0,
        earnings: 0,
    });

    useEffect(() => {

        if (!user) return;

        if (user.role !== "seller") {
            navigate("/login");
            return;
        }

        fetchStats();

    }, [user, navigate]);

    const fetchStats = async () => {
        try {
            const res = await api.get("/products/seller/stats");
            setStats(res.data);
        } catch (err) {
            console.error("Failed to load seller stats");
        }
    };

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
                    Welcome, {user?.name}
                </h1>

                {/* Desktop profile */}
                <div className="relative hidden md:block">
                    <div
                        onClick={() => setShowProfile(!showProfile)}
                        className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center cursor-pointer"
                    >
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    {showProfile && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg p-4 z-50 space-y-2">
                            <p className="font-semibold text-green-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>

                            <hr />

                            <ProfileItem
                                icon={<User size={16} />}
                                text="Profile"
                                onClick={() => navigate("/seller/profile")}
                            />
                            <ProfileItem
                                icon={<List size={16} />}
                                text="My Products"
                                onClick={() => navigate("/seller/products")}
                            />
                            <ProfileItem
                                icon={<Wallet size={16} />}
                                text="Transactions"
                                onClick={() => navigate("/seller/transactions")}
                            />
                            <ProfileItem
                                icon={<LogOut size={16} />}
                                text="Logout"
                                onClick={logout}
                                red
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* ================= MOBILE SIDE NAV ================= */}
            {showMobileNav && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden">
                    <div className="bg-white w-72 h-full p-6 flex flex-col">
                        <div className="mb-6">
                            <p className="font-semibold text-green-900">{user?.name}</p>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>

                        <nav className="flex flex-col gap-4">
                            <MobileItem
                                icon={<User />}
                                text="Profile"
                                onClick={() => navigate("/seller/profile")}
                            />
                            <MobileItem
                                icon={<PackagePlus />}
                                text="Add Product"
                                onClick={() => navigate("/seller/add-product")}
                            />
                            <MobileItem
                                icon={<List />}
                                text="My Products"
                                onClick={() => navigate("/seller/products")}
                            />
                            <MobileItem
                                icon={<Wallet />}
                                text="Transactions"
                                onClick={() => navigate("/seller/transactions")}
                            />
                            <MobileItem
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
                {/* ===== SUMMARY CARDS ===== */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <SummaryCard
                        icon={<Clock />}
                        label="Listed"
                        value={stats.listed}
                        color="bg-yellow-100 text-yellow-800"
                    />

                    <SummaryCard
                        icon={<CheckCircle />}
                        label="Accepted"
                        value={stats.accepted}
                        color="bg-blue-100 text-blue-800"
                    />

                    <SummaryCard
                        icon={<Truck />}
                        label="Picked"
                        value={stats.picked}
                        color="bg-green-100 text-green-800"
                    />

                    <SummaryCard
                        icon={<IndianRupee />}
                        label="Earnings"
                        value={`₹${stats.earnings}`}
                        color="bg-emerald-100 text-emerald-800"
                    />
                </div>

                {/* ===== ACTION CARDS ===== */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ActionCard
                        icon={<PackagePlus size={22} />}
                        title="Add Product"
                        desc="List expired products"
                        onClick={() => navigate("/seller/add-product")}
                    />

                    <ActionCard
                        icon={<List size={22} />}
                        title="My Products"
                        desc="Manage listings"
                        onClick={() => navigate("/seller/products")}
                    />

                    <ActionCard
                        icon={<Wallet size={22} />}
                        title="Transactions"
                        desc="Pickup & earnings"
                        onClick={() => navigate("/seller/transactions")}
                    />
                </div>
            </div>
        </div>
    );
}

/* ================= COMPONENTS ================= */

function SummaryCard({ icon, label, value, color }) {
    return (
        <div className={`p-4 rounded-xl shadow-sm ${color}`}>
            <div className="flex items-center gap-2 mb-1">
                {icon}
                <p className="text-sm font-medium">{label}</p>
            </div>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}

function ActionCard({ icon, title, desc, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition"
        >
            <div className="flex items-center gap-2 text-green-800 mb-2">
                {icon}
                <h3 className="font-semibold text-lg">{title}</h3>
            </div>
            <p className="text-sm text-gray-600">{desc}</p>
        </div>
    );
}

function ProfileItem({ icon, text, onClick, red }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 text-sm ${red ? "text-red-600" : "text-green-900"
                }`}
        >
            {icon} {text}
        </button>
    );
}

function MobileItem({ icon, text, onClick, red }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 text-base ${red ? "text-red-600" : "text-green-900"
                }`}
        >
            {icon} {text}
        </button>
    );
}