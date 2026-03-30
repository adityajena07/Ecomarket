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
            navigate("/verify-otp");

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

            <p className="text-green-600 mb-8 text-sm">
                Create your account and start today
            </p>

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

                <h2 className="text-lg font-semibold text-green-900 mb-1">
                    Register
                </h2>

                <p className="text-sm text-gray-500 mb-5">
                    Choose your role and fill your details
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* ROLE */}
                    <div>
                        <p className="text-sm font-medium mb-2">I am a</p>

                        <div className="grid grid-cols-2 gap-3">
                            <RoleCard
                                icon={<Store size={18} />}
                                title="Seller"
                                sub="Shop Owner"
                                active={role === "seller"}
                                onClick={() => setRole("seller")}
                            />

                            <RoleCard
                                icon={<Factory size={18} />}
                                title="Processing Unit"
                                sub="Industry / Factory"
                                active={role === "processing"}
                                onClick={() => setRole("processing")}
                            />
                        </div>
                    </div>

                    <Input icon={<User size={18} />} name="name" placeholder="Full Name" onChange={handleChange} />

                    {role && (
                        <Input
                            icon={role === "seller" ? <Store size={18} /> : <Factory size={18} />}
                            name="businessName"
                            placeholder={role === "seller" ? "Shop Name" : "Company Name"}
                            onChange={handleChange}
                        />
                    )}

                    {/* CATEGORY – ONLY FOR PROCESSING UNIT */}
                    {role === "processing" && (
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                            <div className="mr-2 text-green-700">
                                <List size={18} />
                            </div>
                            <select
                                name="category"
                                required
                                onChange={handleChange}
                                className="w-full outline-none bg-transparent"
                            >
                                <option value="">Select Category</option>
                                <option value="glass">Food</option>
                                <option value="paper">Medicine</option>
                                <option value="organic">Cosmatics</option>
                                <option value="plastic">Plastic</option>
                                <option value="metal">Clothes</option>
                            </select>
                        </div>
                    )}

                    <Input icon={<Phone size={18} />} name="phone" placeholder="Phone Number" onChange={handleChange} />
                    <Input icon={<MapPin size={18} />} name="address" placeholder="Address" onChange={handleChange} />
                    <Input icon={<Mail size={18} />} name="email" placeholder="Email" type="email" onChange={handleChange} />

                    <PasswordInput icon={<Lock size={18} />} name="password" placeholder="Password" onChange={handleChange} />
                    <PasswordInput icon={<Lock size={18} />} name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />

                    <div className="flex items-center gap-2 text-sm">
                        <input type="checkbox" name="terms" onChange={handleChange} />
                        <span>
                            I accept the{" "}
                            <button
                                type="button"
                                onClick={() => setShowTerms(true)}
                                className="text-green-700 underline"
                            >
                                Terms and Conditions
                            </button>
                        </span>
                    </div>

                    <button className="w-full bg-green-800 text-white py-3 rounded-full hover:bg-green-900 transition">
                        Create Account
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-green-700">
                            Login here
                        </Link>
                    </p>

                </form>
            </div>

            <Link to="/" className="mt-6 text-green-700 text-sm">
                ← Back to Home
            </Link>

            {showTerms && <Modal close={() => setShowTerms(false)} />}
        </div>
    );
}

/* Role Card */
function RoleCard({ icon, title, sub, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-3 border rounded-lg p-3 transition
            ${active ? "border-green-700 bg-green-50" : "border-gray-300"}`}
        >
            <div className="text-green-700">{icon}</div>
            <div>
                <p className="font-medium">{title}</p>
                <span className="text-xs text-gray-500">{sub}</span>
            </div>
        </button>
    );
}

/* Input */
function Input({ icon, ...props }) {
    return (
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-green-700">
            <div className="mr-2 text-green-700">{icon}</div>
            <input {...props} required className="w-full outline-none" />
        </div>
    );
}

/* Password Input */
function PasswordInput({ icon, ...props }) {

    const [show, setShow] = useState(false);

    return (
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-green-700">
            <div className="mr-2 text-green-700">{icon}</div>

            <input
                {...props}
                type={show ? "text" : "password"}
                required
                className="w-full outline-none"
            />

            <button type="button" onClick={() => setShow(!show)}>
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
}

/* Terms Modal */
function Modal({ close }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white max-w-md p-6 rounded-xl">
                <h3 className="font-semibold mb-3">Terms & Conditions</h3>

                <p className="text-sm text-gray-600">
                    • Provide correct information <br />
                    • Follow platform rules <br />
                    • Fraud accounts will be suspended <br />
                    • EcoMarket not responsible for disputes
                </p>

                <button
                    onClick={close}
                    className="mt-4 bg-green-800 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
