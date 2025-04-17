import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // for password toggle icons
import FormBg from "../../assets/registration-form-2.png";
import logo from "../../assets/logo.png";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const { data } = await axios.post(`${process.env.API_URL}/login`, formData);
      setMessage("Login successful!");
      console.log("Success:", data);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed! Try again.";
      setMessage(errorMsg);
      console.error("Error:", errorMsg);
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
            Login Form
          </h3>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 px-4 border border-gray-300 rounded-full focus:outline-none focus:border-[#ae3c33]"
                required
                autoComplete="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block mb-2 text-gray-600">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-10 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-[#ae3c33]"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10.5 right-5 text-gray-600 hover:text-[#ae3c33] focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex flex-col items-center mt-6">
              <button
                type="submit"
                className="w-40 h-10 bg-[#ae3c33] text-white rounded-full uppercase font-semibold transition duration-500 relative overflow-hidden flex items-center justify-center
                before:absolute before:inset-0 before:bg-[#f11a09] before:scale-x-0 before:origin-left before:transition-transform before:duration-500 hover:before:scale-x-100"
              >
                <span className="relative z-10">Login</span>
              </button>
              {message && (
                <p className="mt-4 text-center text-sm font-semibold text-red-600">{message}</p>
              )}
              <p className="mt-4 text-gray-700">
                Don’t have an account?{" "}
                <Link to="/register" className="font-semibold text-[#ae3c33] hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
