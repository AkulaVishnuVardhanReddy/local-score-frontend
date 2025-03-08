import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#ffffff] to-[#f4f4f4] text-gray-900 py-12 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Brand & About */}
          <div>
            <h2 className="text-3xl font-extrabold text-[#ae3c33] tracking-wide">
              Local Score
            </h2>
            <p className="mt-3 text-gray-700 text-sm leading-relaxed">
              Your go-to platform for real-time tracking & analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#ae3c33]">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Contact"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-700 transition-all duration-300 hover:text-[#ae3c33] hover:underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#ae3c33]">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-700 p-2 rounded-full transition-all duration-500 hover:bg-[#ae3c33] hover:text-white hover:shadow-lg"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#ae3c33]">Stay Updated</h3>
            <div className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden shadow-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 focus:outline-none text-sm"
              />
              <button className="bg-[#ae3c33] text-white px-5 py-2 rounded-full hover:bg-[#911f1b] transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Local Score. All rights reserved.</p>
          <ul className="flex space-x-4 mt-2 md:mt-0">
            <li>
              <a href="#" className="hover:text-[#ae3c33] transition-all duration-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ae3c33] transition-all duration-300">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
