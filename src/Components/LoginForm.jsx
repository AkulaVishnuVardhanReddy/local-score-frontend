import React, { useEffect, useState } from "react";
import axios from "axios";
import bgImage from "../assets/bg-registration-form-2.jpg";
import FormBg from "../assets/registration-form-2.png";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", formData);
      setMessage("Login successful!");
      console.log("Success:", response.data);
    } catch (error) {
      setMessage("Login failed! Try again.");
      console.error("Error:", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="relative w-full max-w-4xl lg:shadow-lg lg:rounded-lg overflow-hidden flex flex-col lg:flex-row min-h-[500px] flex items-center" style={{ backgroundImage: isLargeScreen ? `url(${FormBg})` : "none", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="w-full p-10 lg:w-1/2 lg:bg-transparent md:bg-opacity-100 bg-opacity-70">
          <h3 className="text-center text-[22px] font-muli font-semibold uppercase tracking-[2px] text-[#333] mb-8">Login</h3>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-10 px-4 border border-gray-300 rounded-full focus:outline-none focus:border-[#ae3c33]" required />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full h-10 px-4 border border-gray-300 rounded-full focus:outline-none focus:border-[#ae3c33]" required />
            </div>
            <div className="flex justify-center mt-6">
              <button type="submit" className="w-40 h-10 bg-[#ae3c33] text-white rounded-full uppercase font-semibold transition duration-500 relative overflow-hidden flex items-center justify-center before:absolute before:inset-0 before:bg-[#f11a09] before:scale-x-0 before:origin-left before:transition-transform before:duration-500 hover:before:scale-x-100">
                <span className="relative z-10">Login</span>
              </button>
            </div>
            {message && <p className="mt-4 text-center text-sm font-semibold text-red-600">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
