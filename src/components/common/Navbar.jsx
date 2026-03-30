import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 
      backdrop-blur-md 
      ${scrolled ? "bg-white/70 shadow-md" : "bg-white/40"}`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-primary">
                    EcoMarket
                </Link>

                {/* Right Side Buttons */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="text-gray-700 hover:text-primary font-medium"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="bg-primary text-white px-5 py-2 rounded-full hover:opacity-90 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;