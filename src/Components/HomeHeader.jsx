import React from "react";
import { Link } from "react-router-dom";

const HomeHeader = () => {
  return (
    <nav className="w-full h-20 px-6 py-4 bg-transparent text-black transition-all duration-300 shadow-md shadow-gray-300/50">
        
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex">
        {/* Mobile Menu Button */}
        <button className="md:hidden text-3xl transition-transform duration-300 hover:text-[#ae3c33]">
          ☰
        </button>
        {/* Website Name */}
        <div className="text-2xl font-bold">Local Score</div>
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-8 font-semibold">
          {["Product", "Features", "Marketplace", "Company"].map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="relative px-3 py-1 text-lg transition-all duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-[#ae3c33] before:rounded-full before:transition-all before:duration-300 hover:before:w-full hover:text-[#ae3c33]"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        

        <Link to="/login" className="w-28 h-10 bg-[#ae3c33] text-white rounded-full font-semibold transition duration-500 relative overflow-hidden flex items-center justify-center before:absolute before:inset-0 before:bg-[#f11a09] before:scale-x-0 before:origin-left before:transition-transform before:duration-500 hover:before:scale-x-100"
              >
                <span className="relative z-10">Login →</span>
              </Link>

        
      </div>
    </nav>
  );
};

export default HomeHeader;
