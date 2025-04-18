import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import FormBg from "../../assets/registration-form-2.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { fullName, email, password } = location.state || {};

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    startTimer();
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    setCanResend(false);
    setTimer(45);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`).focus();
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      document.getElementById(`otp-${index - 1}`).focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    setMessage("");
    try {
      const { response } =await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        fullName,
        email,
        password,
        otp: otpString
      });
      
      setMessage("OTP Verified Successfully!");
      console.log("Success:", data);
      navigate("/view-created-matches");
    } catch (error) {
      setMessage(error?.response?.data);
      console.error("Error:", error);
    }
  };

  const handleResendOtp = () => {
    console.log("Resend OTP");
    setOtp(Array(6).fill(""));
    startTimer();
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-center">
      <div
        className={`relative w-full max-w-4xl flex flex-col lg:flex-row min-h-[500px] 
        ${isLargeScreen ? "bg-cover bg-center shadow-lg rounded-lg" : ""}`}
        style={isLargeScreen ? { backgroundImage: `url(${FormBg})` } : {}}
      >
        <div className="flex flex-col items-center w-full p-10 lg:w-1/2 bg-opacity-70">
          <img src={logo} alt="Logo" className="h-32 w-32" />
          <h3 className="text-[22px] font-semibold uppercase tracking-[2px] text-[#333] mb-8">
            Enter OTP
          </h3>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4 flex justify-between space-x-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  placeholder="-"
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-[#ae3c33] text-xl font-semibold"
                />
              ))}
            </div>
            <div className="flex flex-col items-center mt-6">
              <button
                type="submit"
                className="w-40 h-10 bg-[#ae3c33] text-white rounded-full uppercase font-semibold relative overflow-hidden
                before:absolute before:inset-0 before:bg-[#f11a09] before:scale-x-0 hover:before:scale-x-100 before:origin-left before:transition-transform before:duration-500"
              >
                <span className="relative z-10">Verify</span>
              </button>
              {message && (
                <p className="mt-4 text-center text-sm font-semibold text-red-600">{message}</p>
              )}
              <div className="mt-6 flex items-center justify-center">
                {!canResend ? (
                  <div className="flex items-center space-x-4">
                    <p className="text-gray-700 text-lg font-semibold">
                      You can request a new OTP in
                    </p>
                    <div className="relative w-12 h-12">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="18" stroke="#ae3c33" strokeWidth="3" fill="none" />
                        <circle
                          cx="20"
                          cy="20"
                          r="18"
                          stroke="#d1d5db"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="113"
                          strokeDashoffset={(113 * timer) / 45}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-linear"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-black text-lg font-semibold">
                        {timer}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-gray-700">
                    Didn’t receive an OTP?{" "}
                    <button
                      type="button"
                      className="font-semibold text-[#ae3c33] hover:underline"
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </button>
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
