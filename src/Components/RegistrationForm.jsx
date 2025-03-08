import React, { useEffect, useState } from "react";
import axios from "axios";
import bgImage from "../assets/bg-registration-form-2.jpg";
import FormBg from "../assets/registration-form-2.png";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    { label: "First Name", name: "firstName", type: "text" },
    { label: "Last Name", name: "lastName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="relative w-full max-w-4xl lg:shadow-lg lg:rounded-lg overflow-hidden flex flex-col lg:flex-row" style={{ backgroundImage: isLargeScreen ? `url(${FormBg})` : "none", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="w-full p-10 lg:w-1/2 lg:bg-transparent md:bg-opacity-100 bg-opacity-70">
          <h3 className="text-center text-[22px] font-muli font-semibold uppercase tracking-[2px] text-[#333] mb-8">Registration Form</h3>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              {formFields.slice(0, 2).map(({ label, name, type }) => (
                <div className="w-full" key={name}>
                  <label className="block mb-2 text-gray-600">{label}</label>
                  <input type={type} name={name} value={formData[name]} onChange={handleChange} className="w-full h-10 px-4 border border-gray-300 rounded-full focus:outline-none focus:border-[#ae3c33]" required />
                </div>
              ))}
            </div>
            {formFields.slice(2).map(({ label, name, type }) => (
              <div className="mt-4" key={name}>
                <label className="block mb-2 text-gray-600">{label}</label>
                <input type={type} name={name} value={formData[name]} onChange={handleChange} className="w-full h-10 px-4 border border-gray-300 rounded-full focus:outline-none focus:border-[#ae3c33]" required />
              </div>
            ))}
            <div className="mt-4 flex items-center">
              <input type="checkbox" className="h-4 w-4 text-red-600" required />
              <label className="ml-2 text-gray-600">I agree to the Terms and Conditions</label>
            </div>
            <div className="flex justify-center mt-6">
              <button type="submit" className="w-40 h-10 bg-[#ae3c33] text-white rounded-full uppercase font-semibold transition duration-500 relative overflow-hidden flex items-center justify-center before:absolute before:inset-0 before:bg-[#f11a09] before:scale-x-0 before:origin-left before:transition-transform before:duration-500 hover:before:scale-x-100">
                <span className="relative z-10">Register</span>
              </button>
            </div>
            {message && <p className="mt-4 text-center text-sm font-semibold text-red-600">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
