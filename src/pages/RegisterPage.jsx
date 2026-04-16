import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
    Phone,
    Mail,
    Lock,
    Store,
    Factory,
    MapPin,
    Recycle,
    Eye,
    EyeOff,
    List
} from "lucide-react";
import axios from "axios";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [role, setRole] = useState("");
    const [showTerms, setShowTerms] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        businessName: "",
        category: "",
        terms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("FORM DATA:", formData); // 🔥 DEBUG

        if (!role) return alert("Please select your role");

        if (!formData.businessName)
            return alert(role === "seller" ? "Enter Shop Name" : "Enter Company Name");

        if (role === "processing" && !formData.category)
            return alert("Please select a category");

        if (formData.password !== formData.confirmPassword)
            return alert("Passwords do not match");

        if (!formData.terms)
            return alert("Please accept Terms & Conditions");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                role,
                businessName: formData.businessName,
                address: formData.address,
                category: role === "processing" ? formData.category : null
            });

            alert(res.data.message);
            navigate("/login");

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server Error");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">

            <div className="flex items-center gap-2 mb-6 text-green-800">
                <Recycle size={26} />
                <h1 className="text-2xl font-bold">EcoMarket</h1>
            </div>

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

                <h2 className="text-lg font-semibold text-green-900 mb-5">
                    Register
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* ROLE */}
                    <div className="grid grid-cols-2 gap-3">
                        <RoleCard
                            icon={<Store size={18} />}
                            title="Seller"
                            active={role === "seller"}
                            onClick={() => setRole("seller")}
                        />

                        <RoleCard
                            icon={<Factory size={18} />}
                            title="Processing"
                            active={role === "processing"}
                            onClick={() => setRole("processing")}
                        />
                    </div>

                    <Input name="name" placeholder="Full Name" onChange={handleChange} />

                    {role && (
                        <Input
                            name="businessName"
                            placeholder={role === "seller" ? "Shop Name" : "Company Name"}
                            onChange={handleChange}
                        />
                    )}

                    {/* ✅ FIXED CATEGORY */}
                    {role === "processing" && (
                        <select
                            name="category"
                            value={formData.category}   // ✅ IMPORTANT FIX
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="food">Food</option>
                            <option value="medicine">Medicine</option>
                            <option value="cosmetics">Cosmetics</option>
                            <option value="plastic">Plastic</option>
                            <option value="clothes">Clothes</option>
                        </select>
                    )}

                    <Input name="phone" placeholder="Phone" onChange={handleChange} />
                    <Input name="address" placeholder="Address" onChange={handleChange} />
                    <Input name="email" placeholder="Email" onChange={handleChange} />

                    <PasswordInput name="password" placeholder="Password" onChange={handleChange} />
                    <PasswordInput name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />

                    <label className="flex gap-2 text-sm">
                        <input type="checkbox" name="terms" onChange={handleChange} />
                        Accept Terms
                    </label>

                    <button className="w-full bg-green-800 text-white py-3 rounded-full">
                        Create Account
                    </button>

                </form>
            </div>
        </div>
    );
}

/* Small Components */
function RoleCard({ icon, title, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`p-3 border rounded ${active ? "bg-green-100" : ""}`}
        >
            {icon} {title}
        </button>
    );
}

function Input(props) {
    return <input {...props} className="w-full border p-2 rounded" required />;
}

function PasswordInput({ ...props }) {
    const [show, setShow] = useState(false);

    return (
        <div className="flex border p-2 rounded">
            <input {...props} type={show ? "text" : "password"} className="w-full" required />
            <button type="button" onClick={() => setShow(!show)}>
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
}