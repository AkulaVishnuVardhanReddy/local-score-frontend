import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing Hamburger and Cross (X) icons
import bgImage from "../assets/bg-registration-form-2.jpg";

const HomeHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close the sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full h-20 px-6 py-4 bg-transparent text-black transition-all duration-300 shadow-md shadow-gray-300/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-xl transition-transform duration-500 hover:text-[#ae3c33]" // Slower transition for button
            onClick={toggleSidebar} // Toggle sidebar on click
          >
            <FaBars /> {/* Hamburger icon from React Icons */}
          </button>

          {/* Add some space between the icon and website name */}
          <div className="ml-4 text-2xl font-bold">Local Score</div> {/* Added margin-left for spacing */}
        </div>

        {/* Sidebar: Display on mobile */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 w-64 h-full bg-cover bg-center text-black shadow-lg transform transition-transform duration-500 ease-in-out p-6 z-50 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`} // Sidebar only visible on smaller screens (md:hidden)
          style={{
            backgroundImage: `url(${bgImage})`, // Set your background image URL here
          }}
        >
          <button
            onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicked
            className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-[#ae3c33] transition duration-500"
          >
            <FaTimes /> {/* Cross button (X) */}
          </button>
          <ul className="space-y-4 mt-10">
            {["Product", "Features", "Marketplace", "Company"].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-lg text-black hover:text-[#ae3c33] hover:underline px-3 py-2 rounded-md transition duration-300 ease-in-out"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Nav Links: Display only on medium and larger screens */}
        <ul className="hidden lg:flex space-x-8 font-semibold">
          {["Product", "Features", "Marketplace", "Company"].map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="relative px-3 py-1 text-lg transition-all duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-[#ae3c33] before:rounded-full before:transition-all before:duration-300 hover:before:w-full hover:text-[#ae3c33]" // Underline on hover
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <Link
          to="/login"
          className="w-28 h-10 bg-[#ae3c33] text-white rounded-full font-semibold transition duration-500 relative overflow-hidden flex items-center justify-center before:absolute before:inset-0 before:bg-[#f11a09] before:scale-x-0 before:origin-left before:transition-transform before:duration-500 hover:before:scale-x-100"
        >
          <span className="relative z-10">Login →</span>
        </Link>
      </div>
    </nav>
  );
};

export default HomeHeader;
