import React, { useEffect, useState } from "react";
import axios from "axios";
import FormBg from "../../assets/registration-form-2.png";
import logo from "../../assets/logo.png";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [timer, setTimer] = useState(45); // Timer state
  const [canResend, setCanResend] = useState(false); // Controls the visibility of the resend button
  const [timerInterval, setTimerInterval] = useState(null); // Store the interval ID to clear when needed

  useEffect(() => {
    // Set up media query listener
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup the media query listener
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const startTimer = () => {
    setCanResend(false); // Disable resend button
    setTimer(45); // Reset the timer to 45 seconds
    // Clear any existing timer intervals to prevent multiple intervals running simultaneously
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    // Start the countdown timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval); // Stop the interval when timer reaches 0
          setCanResend(true); // Enable resend button after timer reaches 0
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    setTimerInterval(interval); // Store the interval ID to clear it later if needed
  };

  useEffect(() => {
    // Start the timer when the component mounts
    startTimer();

    // Cleanup the interval when the component unmounts
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    
    // Move to the next field automatically
    if (e.target.value.length === 1 && index < 5) {
      document.getElementById(`otp-field-${index + 1}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-field-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    const otpString = otp.join(""); // Join OTP array to a string for submission
    try {
      console.log(otpString);
      const { data } = await axios.post("http://localhost:8080/api/verify-otp", { otp: otpString });
      setMessage("OTP Verified Successfully!");
      console.log("Success:", data);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "OTP verification failed! Try again.";
      setMessage(errorMsg);
      console.error("Error:", errorMsg);
    }
  };

  const handleResendOtp = () => {
    // Call the API to resend OTP
    console.log("Resend OTP");
    // Reset OTP fields
    setOtp(["", "", "", "", "", ""]);
    // Restart the timer by calling startTimer function
    startTimer();
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
            <div className="mb-4 flex justify-between space-x-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-field-${index}`}
                  type="text"
                  maxLength="1"
                  placeholder="-"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-[#ae3c33] text-xl font-semibold"
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
              <div className="mt-6 flex items-center justify-center">
                {!canResend && (
                  <div className="timer-container flex items-center space-x-4">
                    <p className="text-gray-700 text-lg font-semibold">You can request a new OTP in</p>
                    <div className="timer-circle p-1 w-12 h-12 flex items-center justify-center rounded-full border-1 border-black text-black text-lg">
                      {timer}
                    </div>
                  </div>
                )}
                {canResend && (
                  <p className="mt-4 text-gray-700">
                    Didn’t receive an OTP?{" "}
                    <button
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
