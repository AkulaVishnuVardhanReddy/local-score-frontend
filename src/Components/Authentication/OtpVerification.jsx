import React, { useEffect, useState } from "react";
import axios from "axios";
import FormBg from "../../assets/registration-form-2.png";
import logo from "../../assets/logo.png";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // Handle OTP field change
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numeric input and handle one character per field
    if (/^[0-9]{0,1}$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Move focus to the next field if filled
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Handle keydown events for backspace or focus change
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      // Focus the previous input if Backspace is pressed and the field is empty
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      try {
        const { data } = await axios.post("http://localhost:8080/api/verify-otp", { otp: otpValue });
        setMessage("OTP Verified Successfully!");
        console.log("Success:", data);
      } catch (error) {
        const errorMsg = error.response?.data?.message || "OTP verification failed! Try again.";
        setMessage(errorMsg);
        console.error("Error:", errorMsg);
      }
    } else {
      setMessage("Please enter all 6 digits.");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-center">
      <div
        className={`relative w-full max-w-4xl lg:shadow-lg lg:rounded-lg overflow-hidden flex flex-col lg:flex-row min-h-[500px] 
          ${isLargeScreen ? "bg-cover bg-center" : ""}`}
        style={isLargeScreen ? { backgroundImage: `url(${FormBg})` } : {}}
      >
        <div className="flex flex-col items-center w-full p-10 lg:w-1/2 bg-opacity-70">
          <img src={logo} alt="Logo" className="h-32 w-32" />
          <h3 className="text-center text-[22px] font-muli font-semibold uppercase tracking-[2px] text-[#333] mb-8">
            Enter OTP
          </h3>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4 flex justify-between">
              {/* Render OTP input fields */}
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)} // Add keydown listener for backspace
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-[#ae3c33] font-semibold text-xl"
                  maxLength="1"
                  autoComplete="one-time-code"
                  placeholder="-"
                />
              ))}
            </div>
            <div className="flex flex-col items-center mt-6">
              <button
                type="submit"
                className="w-40 h-10 bg-[#ae3c33] text-white rounded-full uppercase font-semibold transition duration-500 relative overflow-hidden flex items-center justify-center
                before:absolute before:inset-0 before:bg-[#f11a09] before:scale-x-0 before:origin-left before:transition-transform before:duration-500 hover:before:scale-x-100"
              >
                <span className="relative z-10">Verify</span>
              </button>
              {message && <p className="mt-4 text-center text-sm font-semibold text-red-600">{message}</p>}
              <p className="mt-4 text-gray-700">
                Didn’t receive an OTP?{" "}
                <button className="font-semibold text-[#ae3c33] hover:underline" onClick={() => console.log("Resend OTP")}>
                  Resend OTP
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
