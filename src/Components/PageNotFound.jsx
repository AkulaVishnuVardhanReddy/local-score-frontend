import React from 'react';
import bgImage from "../assets/bg-registration-form-2.jpg";

const PageNotFound = () => {
  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className=" p-10 text-center max-w-lg">
        <h1 className="text-7xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-3xl font-semibold text-gray-800 mb-2">Something's missing.</p>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, we can't find that page. You'll find lots to explore on the home page.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 text-white font-semibold bg-[#ae3c33] rounded-full transition-transform transform hover:scale-105 hover:bg-red-800"
        >
          Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
