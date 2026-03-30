import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Package,
    IndianRupee,
    Weight,
    Store,
    User,
    Phone,
    MapPin,
    ShoppingCart
} from "lucide-react";

export default function ProductDetail() {

    const navigate = useNavigate();
    const { id } = useParams();

    // TEMP – backend se aayega
    const user = {
        subscribed: false,       // true => 5%
        lastBuyAt: null          // ISO date or null
    };

    const product = {
        id,
        name: "Plastic Waste",
        qty: 50,
        price: 1000,
        category: "Plastic"
    };

    /* 🔒 168 HOURS CHECK */
    const canBuy = () => {
        if (user.subscribed) return true;
        if (!user.lastBuyAt) return true;

        const last = new Date(user.lastBuyAt).getTime();
        const now = Date.now();
        const diffHours = (now - last) / (1000 * 60 * 60);

        return diffHours >= 168;
    };

    const handleBuy = () => {
        if (!canBuy()) {
            alert("You can buy only once in 168 hours.");
            return;
        }

        // ✅ Redirect to invoice
        navigate(`/processing/invoice/${product.id}`, {
            state: { product }
        });
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Product Details */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Package className="text-green-700" />
                        Product Details
                    </h2>

                    <p><b>Product:</b> {product.name}</p>
                    <p className="flex items-center gap-2 mt-2">
                        <Weight size={16} className="text-green-700" />
                        Quantity: {product.qty} Kg
                    </p>
                    <p className="flex items-center gap-2 mt-2">
                        <IndianRupee size={16} className="text-green-700" />
                        Price: ₹{product.price}
                    </p>
                    <p className="mt-2"><b>Category:</b> {product.category}</p>
                </div>

                {/* Seller Details */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Store className="text-green-700" />
                        Seller Details
                    </h2>

                    <p className="flex items-center gap-2">
                        <Store size={16} className="text-green-700" />
                        Shop: Green Scrap Store
                    </p>
                    <p className="flex items-center gap-2">
                        <User size={16} className="text-green-700" />
                        Seller: Ramesh Patel
                    </p>
                    <p className="flex items-center gap-2">
                        <Phone size={16} className="text-green-700" />
                        Contact: 9876543210
                    </p>
                    <p className="flex items-center gap-2">
                        <MapPin size={16} className="text-green-700" />
                        Address: Surat, Gujarat
                    </p>
                </div>
            </div>

            {/* BUY BAR */}
            <div className="mt-6 bg-white p-5 rounded-xl shadow flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-600">Base Price</p>
                    <p className="text-lg font-semibold">₹{product.price}</p>
                </div>

                <button
                    onClick={handleBuy}
                    className="flex items-center gap-2 bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition"
                >
                    <ShoppingCart size={18} />
                    Buy Now
                </button>
            </div>
        </div>
    );
}
