import { useEffect, useState } from "react";
import api from "../../services/api";
import { CheckCircle, Truck } from "lucide-react";

export default function Orders({ activeTab }) {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const res = await api.get("/orders/my");

            setOrders(res.data);

        } catch (err) {

            console.error("Failed to fetch orders");

        } finally {

            setLoading(false);

        }

    };

    const acceptOrder = async (id) => {

        try {

            await api.put(`/orders/request-pickup/${id}`);

            fetchOrders();

        } catch (err) {

            console.error("Accept failed");

        }

    };

    const markPicked = async (id) => {

        try {

            await api.put(`/orders/picked/${id}`);

            fetchOrders();

        } catch (err) {

            console.error("Pick failed");

        }

    };

    const filteredOrders = orders.filter(o => {

        if (activeTab === "available") return o.status === "PLACED";
        if (activeTab === "accepted") return o.status === "ACCEPTED";
        if (activeTab === "picked") return o.status === "PICKED";

        return true;

    });

    if (loading) {

        return (

            <div className="bg-white p-6 rounded-xl shadow">
                Loading orders...
            </div>

        );

    }

    return (

        <div className="bg-white p-6 rounded-xl shadow space-y-4">

            {filteredOrders.length === 0 && (

                <p className="text-gray-500">
                    No orders found
                </p>

            )}

            {filteredOrders.map(order => (

                <div
                    key={order._id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                >

                    <div>

                        <p className="font-semibold text-green-900">
                            {order.productId?.category}
                        </p>

                        <p className="text-sm text-gray-600">
                            Seller: {order.sellerId?.businessName}
                        </p>

                        <p className="text-sm text-gray-600">
                            Products: {order.productId?.products?.length}
                        </p>

                    </div>

                    <div className="flex items-center gap-3">

                        {order.status === "PLACED" && (

                            <button
                                onClick={() => acceptOrder(order._id)}
                                className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded"
                            >

                                <CheckCircle size={16} />
                                Accept

                            </button>

                        )}

                        {order.status === "ACCEPTED" && (

                            <button
                                onClick={() => markPicked(order._id)}
                                className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded"
                            >

                                <Truck size={16} />
                                Picked

                            </button>

                        )}

                        {order.status === "PICKED" && (

                            <span className="text-green-700 font-semibold">
                                Completed
                            </span>

                        )}

                    </div>

                </div>

            ))}

        </div>

    );

}