import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaChevronDown } from "react-icons/fa";
import bgImage from "../assets/bg-registration-form-2.jpg";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Matches", path: "/matches" },
  { name: "Score Update", path: "/score-update" },
  { name: "Company", path: "/company" },
];

const HomeHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const tokenRef = useRef(localStorage.getItem("token"));
  const sidebarRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!sidebarRef.current?.contains(e.target)) setIsSidebarOpen(false);
      if (!profileRef.current?.contains(e.target)) setIsDropdownOpen(false);
    };

    const checkToken = setInterval(() => {
      const currentToken = localStorage.getItem("token");
      if (tokenRef.current !== currentToken) {
        tokenRef.current = currentToken;
        setIsLoggedIn(!!currentToken);
      }
    }, 500);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(checkToken);
    };
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `relative px-3 py-1 text-lg transition-all duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-[#ae3c33] before:rounded-full before:transition-all before:duration-300 hover:before:w-full hover:text-[#ae3c33] ${
      isActive ? "text-[#ae3c33] before:w-full" : ""
    }`;

  const mobileLinkClasses = ({ isActive }) =>
    `text-lg hover:text-[#ae3c33] hover:underline px-3 py-2 rounded-md transition duration-300 ease-in-out ${
      isActive ? "text-[#ae3c33] underline" : ""
    }`;

  return (
    <nav className="w-full h-20 px-6 py-4 bg-transparent shadow-md shadow-gray-300/50 pt-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="lg:hidden text-xl hover:text-[#ae3c33] transition-transform"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars />
          </button>
          <div className="ml-4 text-2xl font-bold">Local Score</div>
        </div>

        <ul className="hidden lg:flex space-x-3 font-semibold flex-1 justify-end pr-6">
          {NAV_LINKS.map(({ name, path }) => (
            <li key={name}>
              <NavLink to={path} className={navLinkClasses}>
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {isLoggedIn ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 font-semibold focus:outline-none"
            >
              <FaUserCircle className="text-xl" />
              <span>Vishnu</span>
              <FaChevronDown className="text-sm mt-1" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                <Link
                  to="/change-player"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Change as Player
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("email");
                    setIsDropdownOpen(false);
                    setIsLoggedIn(false);
                    window.location.href = "/login";
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="w-28 h-10 bg-[#ae3c33] text-white rounded-full font-semibold transition relative overflow-hidden flex items-center justify-center before:absolute before:inset-0 before:bg-[#f11a09] before:scale-x-0 before:origin-left before:transition-transform before:duration-500 hover:before:scale-x-100"
          >
            <span className="relative z-10">Login →</span>
          </Link>
        )}
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-64 h-full bg-cover bg-center text-black shadow-lg transform transition-transform duration-500 ease-in-out p-6 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-[#ae3c33] transition"
        >
          <FaTimes />
        </button>
        <ul className="space-y-4 mt-10">
          {NAV_LINKS.map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={mobileLinkClasses}
                onClick={() => setIsSidebarOpen(false)}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default HomeHeader;
