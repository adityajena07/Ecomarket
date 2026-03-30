import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function SellerProducts() {

    const navigate = useNavigate();
    const { user } = useAuth();

    const [listings, setListings] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!user) return;

        if (user.role !== "seller") {
            navigate("/login");
            return;
        }

        fetchProducts();

    }, [user]);

    const fetchProducts = async () => {

        try {

            const res = await api.get("/products/my-products");
            setListings(res.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const toggleExpand = (id) => {

        setExpanded({
            ...expanded,
            [id]: !expanded[id]
        });

    };

    const deleteListing = async (id) => {

        const confirmDelete = window.confirm("Delete this listing?");

        if (!confirmDelete) return;

        try {

            await api.delete(`/products/${id}`);

            setListings(prev => prev.filter(l => l._id !== id));

        } catch (err) {

            console.error(err);
            alert("Delete failed");

        }

    };

    const statusColor = (status) => {

        if (status === "LISTED") return "bg-yellow-100 text-yellow-800";
        if (status === "ACCEPTED") return "bg-blue-100 text-blue-800";
        if (status === "PICKED") return "bg-green-100 text-green-800";

        return "bg-gray-100 text-gray-700";

    };

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-5xl mx-auto">

                <div className="flex items-center gap-3 mb-6">

                    <button
                        onClick={() => navigate("/seller/dashboard")}
                        className="text-green-700"
                    >
                        <ArrowLeft />
                    </button>

                    <h1 className="text-2xl font-bold text-green-900">
                        My Products
                    </h1>

                </div>

                {loading ? (

                    <div className="bg-white p-10 rounded-xl text-center">
                        Loading products...
                    </div>

                ) : listings.length === 0 ? (

                    <div className="bg-white p-10 rounded-xl text-center">
                        No listings yet
                    </div>

                ) : (

                    <div className="space-y-5">

                        {listings.map((listing) => {

                            const products = listing.products || [];

                            const firstProduct = products[0];

                            const single = products.length === 1;
                            const multiple = products.length > 1;

                            const totalWeight = products.reduce((sum, p) => {

                                const qty = Number(p.quantity || 0);
                                const weight = Number(p.weightPerUnit || 0);

                                return sum + (qty * weight);

                            }, 0);

                            return (

                                <div
                                    key={listing._id}
                                    className="bg-white rounded-xl shadow border p-6"
                                >

                                    {/* HEADER */}

                                    <div className="flex justify-between items-start">

                                        <div>

                                            <h3 className="font-semibold text-lg text-green-900">
                                                {listing.category}
                                            </h3>

                                            {single && (

                                                <p className="text-sm text-gray-600">
                                                    {firstProduct.name} • Qty {firstProduct.quantity}
                                                </p>

                                            )}

                                            {multiple && (

                                                <>

                                                    <p className="text-sm text-gray-600">
                                                        {firstProduct.name} • Qty {firstProduct.quantity}
                                                        {products.length > 1 && ` +${products.length - 1} more`}
                                                    </p>

                                                    <button
                                                        onClick={() => toggleExpand(listing._id)}
                                                        className="text-blue-600 text-sm mt-1"
                                                    >
                                                        {expanded[listing._id] ? "Show less" : "See more"}
                                                    </button>

                                                </>

                                            )}

                                        </div>

                                        {/* STATUS + DELETE */}

                                        <div className="flex items-center gap-3">

                                            <button
                                                onClick={() => deleteListing(listing._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                            <span className={`px-3 py-1 rounded-full text-sm ${statusColor(listing.status)}`}>
                                                {listing.status}
                                            </span>

                                        </div>

                                    </div>

                                    {/* PRODUCT DETAILS */}

                                    {(single || expanded[listing._id]) && (

                                        <div className="mt-4 border-t pt-4 space-y-4">

                                            {products.map((p, i) => {

                                                const qty = Number(p.quantity || 0);
                                                const weight = Number(p.weightPerUnit || 0);
                                                const total = qty * weight;

                                                return (

                                                    <div
                                                        key={i}
                                                        className="bg-gray-50 border rounded-lg p-4"
                                                    >

                                                        <h4 className="font-semibold text-green-800">
                                                            {p.name}
                                                        </h4>

                                                        <div className="grid grid-cols-2 gap-2 text-sm mt-2">

                                                            <p>
                                                                <span className="font-medium">Brand:</span> {p.brand || "-"}
                                                            </p>

                                                            <p>
                                                                <span className="font-medium">Qty:</span> {qty}
                                                            </p>

                                                            <p>
                                                                <span className="font-medium">Weight/unit:</span> {weight} g
                                                            </p>

                                                            <p>
                                                                <span className="font-medium">Total weight:</span> {total} g
                                                            </p>

                                                            <p>
                                                                <span className="font-medium">Price:</span> ₹{p.buyerPay || 0}
                                                            </p>

                                                        </div>

                                                    </div>

                                                );

                                            })}

                                            <div className="pt-3 border-t">

                                                <p className="font-semibold">
                                                    Total ₹{listing.totalPrice}
                                                </p>

                                                <p className="text-sm text-gray-700">
                                                    Total Weight: {totalWeight} g
                                                </p>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>

    );

}