import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import heroBg from "../assets/hero_bg.jpg"; // Ensure the path is correct

const HeroSection = () => {
  const navigate = useNavigate();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleSeeMatches = () => {
    if (location.trim() !== "") {
      localStorage.setItem("matchLocation", location.trim());
      navigate("/matches");
    } else {
      alert("Please enter a location.");
    }
  };

  return (
    <div>
      <section
        className="min-h-[60vh] flex items-center w-full"
        style={
          isLargeScreen
            ? {
                backgroundImage: `url(${heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 items-center w-full">
          <div className="mr-auto py-8 place-self-center lg:col-span-6 lg:py-16 p-6 rounded-lg lg:bg-transparent lg:p-0 w-full">
            <h1 className="max-w-2xl mb-4 text-3xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
              Create & Watch Live Matches Anytime, Anywhere!
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl">
              Host your own local match and share real-time score updates.
              Follow live matches from anywhere, even if you’re not at the game!
            </p>

            <div className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden shadow-md focus-within:shadow-lg transition-all duration-300 max-w-[450px] min-h-[45px]">
              <div className="relative flex items-center flex-grow">
                <MapPin className="absolute left-4 text-gray-400" size={18} />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter Location"
                  className="w-full pl-10 pr-2 py-2 text-sm text-gray-700 border-none focus:outline-none focus:ring-0"
                />
              </div>

              <button
                onClick={handleSeeMatches}
                className="ml-auto flex items-center min-h-[45px] space-x-1 bg-[#ae3c33] text-white px-4 py-2 font-medium rounded-full hover:bg-[#911f1b] transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-sm">See Matches</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
 