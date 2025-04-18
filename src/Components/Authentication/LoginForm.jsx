import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import FormBg from "../../assets/registration-form-2.png";
import logo from "../../assets/logo.png";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();

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
      const { data } = await axios.post(`${import.meta.env.API_URL}/login`, formData);
      console.log("Success:", data);
      setMessage("Login successful!");
      navigate("/view-created-matches");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed! Try again.";
      console.error("Error:", errorMsg);
      setMessage(errorMsg);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-center">
      <div
        className={`relative w-full max-w-4xl flex flex-col lg:flex-row min-h-[500px] overflow-hidden 
        ${isLargeScreen ? "bg-cover bg-center shadow-lg rounded-lg" : ""}`}
        style={isLargeScreen ? { backgroundImage: `url(${FormBg})` } : {}}
      >
        <div className="flex flex-col items-center w-full p-10 lg:w-1/2 bg-opacity-70">
          <img src={logo} alt="Logo" className="h-32 w-32 mb-2" />
          <h3 className="text-xl font-semibold uppercase tracking-widest text-[#333] mb-6">
            Login Form
          </h3>
          <form className="w-full" onSubmit={handleSubmit}>
            {["email", "password"].map((field) => (
              <div className="mb-4 relative" key={field}>
                <label className="block mb-2 text-gray-600 capitalize">{field}</label>
                <input
                  type={field === "password" && !showPassword ? "password" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  required
                  autoComplete={field === "email" ? "email" : "current-password"}
                  className={`w-full h-10 px-4 ${
                    field === "password" ? "pr-10" : ""
                  } border border-gray-300 rounded-full focus:outline-none focus:border-[#ae3c33]`}
                />
                {field === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-10.5 right-4 text-gray-600 hover:text-[#ae3c33]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                )}
              </div>
            ))}
            <div className="flex flex-col items-center mt-6">
              <button
                type="submit"
                className="w-40 h-10 bg-[#ae3c33] text-white rounded-full uppercase font-semibold relative overflow-hidden 
                before:absolute before:inset-0 before:bg-[#f11a09] before:scale-x-0 before:origin-left 
                before:transition-transform before:duration-500 hover:before:scale-x-100"
              >
                <span className="relative z-10">Login</span>
              </button>
              {message && (
                <p className="mt-4 text-sm font-semibold text-red-600 text-center">{message}</p>
              )}
              <p className="mt-4 text-gray-700">
                Don’t have an account?{" "}
                <Link to="/register" className="text-[#ae3c33] font-semibold hover:underline">
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
