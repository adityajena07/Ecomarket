import { Link } from "react-router-dom";
import api from "../../services/api";
import {
    Crown,
    CheckCircle,
    XCircle,
    ArrowLeft
} from "lucide-react";

export default function Subscribe() {

    const user = {
        subscribed: false,          // true when subscribed
        subscriptionType: null      // "Monthly" | "Yearly"
    };

    const handleSubscribe = async (type) => {

        await api.post("/auth/subscribe", { type });

        alert("Subscription activated");

    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Back */}
            <Link
                to="/processing/dashboard"
                className="flex items-center gap-1 text-sm text-green-700 mb-4"
            >
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <Crown className="text-green-700" />
                    Subscription Plans
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                    Choose a plan to unlock full access
                </p>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Monthly Plan */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Monthly Plan
                    </h3>

                    <p className="text-2xl font-bold text-green-700 mb-4">
                        ₹499 / month
                    </p>

                    <ul className="space-y-2 text-sm text-gray-700 mb-5">
                        <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-700" />
                            Multiple categories access
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-700" />
                            No 168-hour buying limit
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-700" />
                            Only <b>5% platform fee</b>
                        </li>
                        <li className="flex items-center gap-2">
                            <XCircle size={16} className="text-red-500" />
                            10% extra charge not applied
                        </li>
                    </ul>

                    {!user.subscribed ? (
                        <button
                            onClick={() => handleSubscribe("Monthly")}
                            className="w-full bg-green-700 text-white py-2 rounded-full hover:bg-green-800 transition"
                        >
                            Subscribe Monthly
                        </button>
                    ) : (
                        <p className="text-green-700 text-sm font-medium text-center">
                            Already Subscribed
                        </p>
                    )}
                </div>

                {/* Yearly Plan */}
                <div className="bg-white p-6 rounded-xl shadow border-2 border-green-700">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Yearly Plan
                    </h3>

                    <p className="text-2xl font-bold text-green-700 mb-4">
                        ₹4999 / year
                    </p>

                    <ul className="space-y-2 text-sm text-gray-700 mb-5">
                        <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-700" />
                            All Monthly benefits
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-700" />
                            Priority access
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-700" />
                            Only <b>5% platform fee</b>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-700" />
                            Best value plan
                        </li>
                    </ul>

                    {!user.subscribed ? (
                        <button
                            onClick={() => handleSubscribe("Yearly")}
                            className="w-full bg-green-700 text-white py-2 rounded-full hover:bg-green-800 transition"
                        >
                            Subscribe Yearly
                        </button>
                    ) : (
                        <p className="text-green-700 text-sm font-medium text-center">
                            Already Subscribed
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
