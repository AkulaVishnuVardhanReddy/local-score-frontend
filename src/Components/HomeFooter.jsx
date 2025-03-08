import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const socialLinks = [
  { icon: FaTwitter, url: "https://x.com" },
  { icon: FaInstagram, url: "https://www.instagram.com" },
  { icon: FaLinkedinIn, url: "https://www.linkedin.com/in" },
  { icon: FaFacebookF, url: "https://www.facebook.com/" },
];

const Footer = () => {
  return (
    <footer className="relative bg-white text-gray-900 py-14 px-6 shadow-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Brand & About */}
        <div>
          <h2 className="text-3xl font-bold text-[#ae3c33] tracking-wide">
            Local Score
          </h2>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Local Score provides real-time cricket scores, enabling anyone to
            create matches, update scores live, and stay connected with the
            game effortlessly.
          </p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#ae3c33]">
            Follow Us
          </h3>
          <div className="flex justify-center md:justify-start space-x-4">
            {socialLinks.map(({ icon: Icon, url }, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 p-3 rounded-full transition-all duration-500 hover:bg-[#ae3c33] hover:text-white hover:shadow-lg transform hover:-translate-y-1"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#ae3c33]">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Subscribe to get live scores, match alerts, and updates directly to
            your inbox.
          </p>
          <div className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden shadow-md focus-within:shadow-lg transition-all duration-300">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none"
            />
            <button className="bg-[#ae3c33] text-white px-6 py-2 font-medium rounded-full hover:bg-[#911f1b] transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider & Bottom Footer */}
      <div className="border-t border-gray-300 my-8"></div>
      <div className="text-center text-gray-600 text-sm mt-8">
        <p>© {new Date().getFullYear()} Local Score. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
