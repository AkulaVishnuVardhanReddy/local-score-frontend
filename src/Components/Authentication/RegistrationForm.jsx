import React, { useEffect, useState } from "react";
import axios from "axios";
import FormBg from "../../assets/registration-form-2.png";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      });
      setMessage("Registration successful!");
      console.log("Success:", response.data);
    } catch (error) {
      setMessage("Registration failed! Try again.");
      console.error("Error:", error.response ? error.response.data : error);
    }
  };

  const formFields = [
    { label: "First Name", name: "firstName", type: "text", placeholder: "First name" },
    { label: "Last Name", name: "lastName", type: "text", placeholder: "Last name" },
    { label: "Email", name: "email", type: "email", placeholder: "Email address" },
    { label: "Password", name: "password", type: "password", placeholder: "Create Password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
  ];

  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div
        className="relative w-full max-w-4xl lg:shadow-lg lg:rounded-lg overflow-hidden flex flex-col lg:flex-row"
        style={{
          backgroundImage: isLargeScreen ? `url(${FormBg})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center w-full p-10 lg:w-1/2 bg-opacity-70">
          <img src={logo} alt="Logo" className="h-30 w-30" />
          <h3 className="text-center text-[22px] font-semibold uppercase tracking-[2px] text-[#333] mb-8">
            Registration Form
          </h3>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              {formFields.slice(0, 2).map(({ label, name, type, placeholder }) => (
                <div className="w-full" key={name}>
                  <label className="block mb-2 text-gray-600">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full h-10 px-4 border border-gray-300 rounded-full focus:outline-none focus:border-[#ae3c33]"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full h-10 px-4 border border-gray-300 rounded-full focus:outline-none focus:border-[#ae3c33]"
                required
              />
            </div>

            <div className="flex gap-4 mt-4">
              {formFields.slice(3).map(({ label, name, type, placeholder }) => (
                <div className="w-full" key={name}>
                  <label className="block mb-2 text-gray-600">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full h-10 px-4 border border-gray-300 rounded-full focus:outline-none focus:border-[#ae3c33]"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center mt-6">
              <button
                type="submit"
                className="w-40 h-10 bg-[#ae3c33] text-white rounded-full uppercase font-semibold transition duration-500 relative overflow-hidden flex items-center justify-center before:absolute before:inset-0 before:bg-[#f11a09] before:scale-x-0 before:origin-left before:transition-transform before:duration-500 hover:before:scale-x-100"
              >
                <span className="relative z-10">Register</span>
              </button>

              {message && (
                <p className="mt-4 text-center text-sm font-semibold text-red-600">
                  {message}
                </p>
              )}
              <p className="mt-4">
                Have an account? <Link to="/login" className="font-semibold text-[#ae3c33] hover:underline">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;