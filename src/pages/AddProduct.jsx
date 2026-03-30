import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import api from "../services/api";

export default function AddProduct() {

    const navigate = useNavigate();

    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const emptyProduct = () => ({
        name: "",
        brand: "",
        uan: "",
        quantity: "",
        weightPerUnit: "",
        mrp: "",
        totalMRP: 0,
        subtotal: 0
    });

    const addFirstProduct = (cat) => {
        setCategory(cat);
        setProducts([emptyProduct()]);
    };

    const addMoreProduct = () => {
        setProducts([...products, emptyProduct()]);
    };

    const removeProduct = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    /* ================= CALCULATE ================= */

    const calculateProduct = (p) => {

        const qty = Number(p.quantity) || 0;
        const weight = Number(p.weightPerUnit) || 0;
        const mrp = Number(p.mrp) || 0;

        let totalMRP = 0;
        let buyerPay = 0;

        if (["Food", "Medicine"].includes(category)) {

            totalMRP = qty * mrp;
            buyerPay = totalMRP * 0.15;

        }

        if (["Clothes", "Plastic"].includes(category)) {

            const totalKg = (qty * weight) / 1000;
            buyerPay = totalKg * 30;

        }

        return {
            ...p,
            totalMRP,
            subtotal: Math.round(buyerPay)
        };

    };

    const handleChange = (i, field, value) => {

        const updated = [...products];
        updated[i][field] = value;
        updated[i] = calculateProduct(updated[i]);

        setProducts(updated);

    };

    /* ================= TOTALS ================= */

    const totalBuyerPay = products.reduce((sum, p) => sum + p.subtotal, 0);
    const platformFee = totalBuyerPay * 0.10;
    const finalAmount = totalBuyerPay - platformFee;

    /* ================= SUBMIT ================= */

    const submitListing = async () => {

        if (products.length === 0) {
            alert("Add at least one product");
            return;
        }

        try {

            setLoading(true);

            await api.post("/products/add", {

                category,

                products: products.map(p => ({

                    name: p.name,
                    brand: p.brand,
                    uan: p.uan,
                    quantity: Number(p.quantity),
                    weightPerUnit: Number(p.weightPerUnit),
                    mrp: Number(p.mrp),
                    buyerPay: Number(p.subtotal)

                })),

                totalPrice: finalAmount

            });

            alert("Listing created successfully");

            navigate("/seller/products");

        } catch (err) {

            console.error(err);
            alert("Failed to create listing");

        } finally {

            setLoading(false);

        }

    };

    /* ================= UI ================= */

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

                <h2 className="text-2xl font-bold text-green-900 mb-6">
                    Add Products (Single Pickup)
                </h2>

                {/* CATEGORY */}

                {!category && (

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                        {["Food", "Medicine", "Clothes", "Plastic"].map(cat => (

                            <button
                                key={cat}
                                onClick={() => addFirstProduct(cat)}
                                className="border py-3 rounded-lg hover:bg-green-50"
                            >

                                {cat}

                            </button>

                        ))}

                    </div>

                )}

                {/* PRODUCTS */}

                {products.map((p, i) => (

                    <div key={i} className="border rounded-xl p-5 mb-6">

                        <div className="flex justify-between mb-4">

                            <h3>{category} Product #{i + 1}</h3>

                            {products.length > 1 && (

                                <Trash2
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => removeProduct(i)}
                                />

                            )}

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <input
                                placeholder="Product Name"
                                className="input"
                                onChange={(e) => handleChange(i, "name", e.target.value)}
                            />

                            <input
                                placeholder="Brand"
                                className="input"
                                onChange={(e) => handleChange(i, "brand", e.target.value)}
                            />

                            {["Food", "Medicine"].includes(category) && (

                                <input
                                    placeholder="UAN Number"
                                    className="input"
                                    onChange={(e) => handleChange(i, "uan", e.target.value)}
                                />

                            )}

                            <input
                                type="number"
                                placeholder="Quantity"
                                className="input"
                                onChange={(e) => handleChange(i, "quantity", e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Weight per unit (grams)"
                                className="input"
                                onChange={(e) => handleChange(i, "weightPerUnit", e.target.value)}
                            />

                            {["Food", "Medicine"].includes(category) && (

                                <input
                                    type="number"
                                    placeholder="MRP per unit"
                                    className="input"
                                    onChange={(e) => handleChange(i, "mrp", e.target.value)}
                                />

                            )}

                        </div>

                        <div className="text-right mt-4 text-green-800">

                            {["Food", "Medicine"].includes(category) && (

                                <p>Total MRP: ₹{p.totalMRP}</p>

                            )}

                            <p className="font-semibold">
                                Buyer Pays: ₹{p.subtotal}
                            </p>

                        </div>

                    </div>

                ))}

                {/* ADD MORE */}

                {category && (

                    <button
                        onClick={addMoreProduct}
                        className="text-green-700 mb-6 flex items-center gap-2"
                    >

                        <Plus size={18} /> Add More

                    </button>

                )}

                {/* TOTALS */}

                {products.length > 0 && (

                    <div className="border-t pt-6 text-right space-y-2">

                        <p>Buyer Total: ₹{totalBuyerPay}</p>

                        <p className="text-red-600">
                            Platform Fee (10%): −₹{platformFee.toFixed(2)}
                        </p>

                        <p className="text-xl font-bold text-green-900">
                            Seller Receives: ₹{finalAmount.toFixed(2)}
                        </p>

                        <button
                            onClick={submitListing}
                            disabled={loading}
                            className="mt-4 w-full bg-green-700 text-white py-3 rounded-full"
                        >

                            {loading ? "Submitting..." : "Submit Listing"}

                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}