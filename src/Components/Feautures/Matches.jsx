import React, { useState } from "react";
import { MapPin, Calendar, Trophy, Flag } from "lucide-react";

const Matches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const matches = [
    {
      name: "Final • ICC Champions Trophy, 2025",
      matchDate: "March 14, 2025",
      totalOvers: 50,
      targetRuns: 252,
      targetOvers: 50,
      superOver: false,
      tossDecision: "BAT",
      matchStatus: "ONGOING",
      tournament: "ICC Champions Trophy 2025",
      team1: { name: "NZ", score: "251-7 (50)", flag: "🇳🇿" },
      team2: { name: "IND", score: "220-5 (40)", flag: "🇮🇳" },
      tossWinner: "NZ",
      matchWinner: null,
      playerOfMatch: null,
      location: "Eden Gardens, Kolkata",
    },
    {
      name: "1st Test • The Ashes, 2025",
      matchDate: "March 12, 2025",
      totalOvers: 90,
      targetRuns: null,
      targetOvers: null,
      superOver: false,
      tossDecision: "BOWL",
      matchStatus: "SCHEDULED",
      tournament: "The Ashes 2025",
      team1: { name: "AUS", flag: "🇦🇺" },
      team2: { name: "ENG", flag: "🏴" },
      tossWinner: "ENG",
      matchWinner: null,
      playerOfMatch: null,
      location: "Lord’s, London",
    },
  ];

  const categories = ["ALL", "ONGOING", "SCHEDULED", "COMPLETED", "ABANDONED"];
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredMatches = matches.filter(
    (match) =>
      (selectedCategory === "ALL" || match.matchStatus === selectedCategory) &&
      (match.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.team1.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.team2.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.tournament.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-center text-3xl font-bold text-[#ae3c33] mb-6">
        🏏 Live Cricket Matches
      </h1>

      {/* Search Bar */}
      <div className="w-full max-w-lg flex items-center bg-white border border-gray-300 rounded-full overflow-hidden shadow-md focus-within:shadow-lg transition-all duration-300 min-h-[45px] mb-6 px-4">
        <MapPin className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by team, location, or tournament"
          className="w-full pl-2 py-2 text-sm text-gray-700 border-none focus:outline-none focus:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#457b9d] text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-[#a8dadc] hover:text-black"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-5 transition-transform duration-300 transform hover:-translate-y-2 border-l-4 border-[#ae3c33]"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-500">
                  {match.tournament}
                </span>
                <span className="text-xs bg-[#ae3c33] text-white px-2 py-1 rounded">
                  {match.totalOvers ? `${match.totalOvers} Overs` : "Test Match"}
                </span>
              </div>

              <div className="text-lg font-semibold text-gray-800">
                <div className="flex justify-between items-center">
                  <span>
                    {match.team1.flag} {match.team1.name}
                  </span>
                  <span className="text-gray-700">{match.team1.score || "Yet to Bat"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>
                    {match.team2.flag} {match.team2.name}
                  </span>
                  <span className="text-gray-700">{match.team2.score || "Yet to Bat"}</span>
                </div>
              </div>

              <div className="mt-3 text-gray-700 text-sm">
                <p>
                  <Flag className="inline-block mr-1 text-gray-500" size={16} />
                  <b>{match.tossWinner}</b> won the toss, elected to <b>{match.tossDecision}</b>
                </p>
                <p className="text-[#ae3c33] font-medium">
                  <Trophy className="inline-block mr-1 text-gray-500" size={16} />
                  Status: <b>{match.matchStatus}</b>
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2 text-gray-600 text-sm">
                <Calendar size={16} />
                <span>
                  {match.matchDate} • {match.location}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No matches available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Matches;
