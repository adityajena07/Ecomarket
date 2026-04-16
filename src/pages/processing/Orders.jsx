import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Orders({ activeTab }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {

            const res = await api.get("/products/processing");

            console.log("DATA:", res.data);

            setData(res.data);

        } catch (err) {

            console.error("Fetch failed");

        } finally {

            setLoading(false);

        }

    };

    /* ================= LOADING ================= */

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow text-center">
                Loading products...
            </div>
        );
    }

    /* ================= UI ================= */

    return (

        <div className="bg-white p-6 rounded-xl shadow space-y-6">

            {data.length === 0 && (
                <p className="text-gray-500 text-center">
                    No products available for your category
                </p>
            )}

            {data.map(item => (

                <div
                    key={item._id}
                    className="border rounded-xl p-5 hover:shadow-md transition"
                >

                    {/* CATEGORY */}
                    <p className="font-semibold text-green-900 text-lg">
                        {item.category?.toUpperCase()}
                    </p>

                    {/* PRICE */}
                    <p className="text-sm text-gray-600 mt-1">
                        Total Price: <span className="font-medium">₹{item.totalPrice || 0}</span>
                    </p>

                    {/* ITEMS COUNT */}
                    <p className="text-sm text-gray-600 mb-3">
                        Total Items: {item.products?.length || 0}
                    </p>

                    {/* ================= ITEM DETAILS ================= */}

                    <div className="space-y-3">

                        {item.products?.map((prod, index) => (

                            <div
                                key={index}
                                className="bg-gray-50 p-3 rounded-lg border"
                            >

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">

                                    <p><b>Name:</b> {prod.name || "-"}</p>

                                    <p><b>Brand:</b> {prod.brand || "-"}</p>

                                    <p><b>Qty:</b> {prod.quantity || 0}</p>

                                    <p><b>Weight:</b> {prod.weightPerUnit || 0} g</p>

                                    <p><b>MRP:</b> ₹{prod.mrp || 0}</p>

                                    <p><b>Buyer Pay:</b> ₹{prod.buyerPay || 0}</p>

                                    {prod.uan && (
                                        <p><b>UAN:</b> {prod.uan}</p>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            ))}

        </div>

    );

}