import { Download } from "lucide-react";

export default function Invoice() {

    // TEMP – backend se
    const user = {
        name: "ABC Processing Unit",
        subscribed: false,        // true => 5%
        subscriptionType: null,   // Monthly / Yearly
    };

    const product = {
        name: "Plastic Waste",
        baseAmount: 1000,
    };

    const extraPercent = user.subscribed ? 5 : 10;
    const extraAmount = (product.baseAmount * extraPercent) / 100;
    const totalAmount = product.baseAmount + extraAmount;

    const downloadInvoice = () => {
        const content = `
EcoMarket Invoice
-------------------------
Buyer: ${user.name}
Product: ${product.name}

Base Amount: ₹${product.baseAmount}
${extraPercent}% Charge: ₹${extraAmount}
-------------------------
Total Payable: ₹${totalAmount}
`;

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "invoice.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="bg-white max-w-xl mx-auto p-6 rounded-xl shadow">

                <h2 className="text-xl font-semibold mb-4">Invoice</h2>

                <div className="text-sm text-gray-700 space-y-2">
                    <p><b>Buyer:</b> {user.name}</p>
                    <p><b>Product:</b> {product.name}</p>
                    <p><b>Base Amount:</b> ₹{product.baseAmount}</p>
                    <p>
                        <b>{extraPercent}% Charge:</b> ₹{extraAmount}
                    </p>

                    <hr />

                    <p className="text-lg font-semibold">
                        Total: ₹{totalAmount}
                    </p>
                </div>

                <button
                    onClick={downloadInvoice}
                    className="mt-4 flex items-center gap-2 bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800"
                >
                    <Download size={16} />
                    Download Invoice
                </button>
            </div>

        </div>
    );
}
