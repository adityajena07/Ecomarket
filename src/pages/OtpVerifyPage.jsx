import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";

export default function OtpVerifyPage() {

    const navigate = useNavigate();

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(30);

    const inputsRef = useRef([]);

    /* Timer Countdown */
    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    /* Handle Input */
    const handleChange = (value, index) => {

        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    /* Handle Backspace */
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    /* Handle Paste */
    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pasteData)) return;

        const newOtp = pasteData.split("");
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);

        newOtp.forEach((digit, i) => {
            if (inputsRef.current[i]) {
                inputsRef.current[i].value = digit;
            }
        });
    };

    /* Submit */
    const handleSubmit = (e) => {
        e.preventDefault();

        const finalOtp = otp.join("");

        if (finalOtp.length !== 6) {
            alert("Enter valid OTP");
            return;
        }

        alert("OTP Verified ✅");
        navigate("/login");
    };

    /* Resend OTP */
    const handleResend = () => {
        setTimer(30);
        alert("OTP Resent ✅");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">

                <div className="flex justify-center mb-4 text-green-800">
                    <KeyRound size={40} />
                </div>

                <h2 className="text-xl font-semibold mb-2">Verify OTP</h2>

                <p className="text-gray-500 text-sm mb-6">
                    Enter the 6-digit OTP sent to your phone/email
                </p>

                <form onSubmit={handleSubmit}>

                    {/* OTP Boxes */}
                    <div
                        className="flex justify-between mb-6"
                        onPaste={handlePaste}
                    >
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                ref={(el) => (inputsRef.current[index] = el)}
                                onChange={(e) =>
                                    handleChange(e.target.value, index)
                                }
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-12 border rounded-lg text-center text-xl focus:border-green-700 outline-none"
                            />
                        ))}
                    </div>

                    <button className="w-full bg-green-800 text-white py-3 rounded-full hover:bg-green-900 transition">
                        Verify OTP
                    </button>

                </form>

                {/* Resend Section */}
                <div className="mt-4 text-sm">

                    {timer > 0 ? (
                        <p className="text-gray-500">
                            Resend OTP in {timer}s
                        </p>
                    ) : (
                        <button
                            onClick={handleResend}
                            className="text-green-700 font-medium"
                        >
                            Resend OTP
                        </button>
                    )}

                </div>

            </div>
        </div>
    );
}
