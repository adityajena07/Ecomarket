import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import {
    Package,
    ShieldCheck,
    TrendingUp,
    Users,
    Recycle,
    Repeat,
} from "lucide-react";

function LandingPage() {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div>
                        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                            Transform Expired <br /> Products Into Value
                        </h1>

                        <p className="mt-6 text-lg text-gray-600">
                            A sustainable marketplace connecting sellers with processing units
                            for safe collection, recycling, and disposal of expired and near-expiry products.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <Link
                                to="/register"
                                className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
                            >
                                Join Now
                            </Link>

                            <a href="#why" className="animated-pill-btn">
                                Learn More
                            </a>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200"
                            alt="Recycling bins"
                            className="rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Why Choose EcoMarket */}
            <section id="why" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-green-900">
                            Why Choose EcoMarket?
                        </h2>

                        <p className="mt-4 text-green-700 text-lg">
                            A transparent, efficient platform for sustainable product management
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-8">

                        <Card
                            icon={<Package size={26} />}
                            title="Automatic Pricing"
                            text="MRP-based automatic pricing ensures fair value for expired products across all categories."
                        />

                        <Card
                            icon={<ShieldCheck size={26} />}
                            title="Secure Transactions"
                            text="Privacy-protected invoices and dual commission billing for complete transparency."
                        />

                        <Card
                            icon={<TrendingUp size={26} />}
                            title="Flexible Subscriptions"
                            text="First category free for processing units. Add more categories as you scale."
                        />

                        <Card
                            icon={<Users size={26} />}
                            title="Role-Based Access"
                            text="Tailored dashboards for sellers, processing units, and administrators."
                        />

                        <Card
                            icon={<Recycle size={26} />}
                            title="Eco-Friendly"
                            text="Promote sustainable handling and recycling of expired products."
                        />

                        <Card
                            icon={<Repeat size={26} />}
                            title="Full Lifecycle"
                            text="From listing to pickup, track the entire journey of your products."
                        />

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-green-700 to-green-900 text-white">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-4xl md:text-5xl font-bold">
                        Ready to Transform Expired Products Into Value?
                    </h2>

                    <p className="mt-6 text-green-100 text-lg max-w-2xl mx-auto">
                        Join EcoMarket today and connect with trusted processing units
                        for sustainable disposal and recycling solutions.
                    </p>

                    <div className="mt-10">
                        <Link
                            to="/register"
                            className="relative inline-block bg-white text-green-800 px-10 py-4 rounded-full font-semibold overflow-hidden group"
                        >
                            <span className="relative z-10">Get Started Now</span>
                            <span className="absolute inset-0 border-2 border-green-600 rounded-full scale-0 group-hover:scale-100 transition duration-500"></span>
                        </Link>
                    </div>

                </div>
            </section>
        </>
    );
}

/* Card Reusable Component */
function Card({ icon, title, text }) {
    return (
        <div className="animated-card bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-md transition">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-700 mb-6">
                {icon}
            </div>

            <h3 className="text-xl font-semibold text-green-900 mb-3">
                {title}
            </h3>

            <p className="text-green-700">
                {text}
            </p>
        </div>
    );
}

export default LandingPage;