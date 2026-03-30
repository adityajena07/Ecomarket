import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Truck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SellerTransactions() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!user) return;

    if (user.role !== "seller") {
      navigate("/login");
      return;
    }

    // TEMP DATA (jab tak backend connect nahi hota)
    const listings = JSON.parse(localStorage.getItem("sellerListings")) || [];

    const picked = listings.filter(l => l.status === "Picked");
    setTransactions(picked);
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/seller/dashboard")}
            className="text-green-700"
          >
            <ArrowLeft />
          </button>

          <h1 className="text-2xl font-bold text-green-900">
            Transactions
          </h1>
        </div>

        {transactions.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center text-gray-500">
            No transactions yet.
          </div>
        ) : (
          <div className="space-y-5">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-xl shadow p-6 border"
              >
                {/* TOP */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-green-900">
                      {t.category} Pickup
                    </h3>

                    <p className="text-xs text-gray-400">
                      Pickup ID: #{t.id}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center gap-1">
                    <Truck size={14} /> Picked
                  </span>
                </div>

                {/* AMOUNTS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <Info label="Buyer Total" value={`₹${t.totalBuyerPay}`} />
                  <Info label="Platform Fee" value={`₹${t.platformFee}`} />
                  <Info label="Seller Received" value={`₹${t.finalAmount}`} bold />
                  <Info label="Status" value="Completed" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* INFO BLOCK */
function Info({ label, value, bold }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className={bold ? "font-semibold text-green-900" : ""}>
        {value}
      </p>
    </div>
  );
}