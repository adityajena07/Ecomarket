import { useEffect, useState } from "react";
import { Truck, PackageCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function MyOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      // 🔥 Processing / buyer ke orders
      const res = await api.get("/orders/my");
      setOrders(res.data);

    } catch (err) {
      console.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-yellow-100 text-yellow-700";
      case "ACCEPTED":
        return "bg-green-100 text-green-700";
      case "PICKED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const requestPickup = async (orderId) => {
    try {
      await api.put(`/orders/request-pickup/${orderId}`);
      fetchOrders();
    } catch {
      alert("Failed to request pickup");
    }
  };

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Seller</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3">#{order._id.slice(-5)}</td>
                <td className="p-3">{order.productId?.category}</td>
                <td className="p-3">{order.sellerId?.businessName}</td>
                <td className="p-3">
                  {order.productId?.quantity} {order.productId?.unit}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">
                  {order.status === "PLACED" && (
                    <button
                      onClick={() => requestPickup(order._id)}
                      className="flex items-center gap-1 text-green-700 text-sm"
                    >
                      <Truck size={16} />
                      Request Pickup
                    </button>
                  )}

                  {order.status === "ACCEPTED" && (
                    <span className="flex items-center gap-1 text-green-700 text-sm">
                      <PackageCheck size={16} />
                      Accepted
                    </span>
                  )}

                  {order.status === "PICKED" && (
                    <span className="text-blue-700 text-sm">
                      Picked
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
