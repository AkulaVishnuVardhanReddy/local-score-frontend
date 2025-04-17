import { useState } from "react";

export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1); // For keyboard navigation

  // Mock player list (replace with API data if needed)
  const allPlayers = ["Virat Kohli", "MS Dhoni", "Rohit Sharma", "Jasprit Bumrah", "Hardik Pandya"];

  // Available players (excluding selected ones)
  const availablePlayers = allPlayers.filter((player) => !selectedPlayers.includes(player));
  
  // Filtered suggestions based on search input
  const filteredPlayers = availablePlayers.filter((player) =>
    player.toLowerCase().includes(search.toLowerCase())
  );

  const handlePlayerSelect = (player) => {
    setSelectedPlayers([...selectedPlayers, player]);
    setSearch(""); // Clear search after selection
    setHighlightIndex(-1); // Reset keyboard selection
  };

  const handleRemovePlayer = (player) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
  };

  const handleKeyDown = (e) => {
    if (filteredPlayers.length === 0) return;

    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) => (prev + 1) % filteredPlayers.length);
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) => (prev - 1 + filteredPlayers.length) % filteredPlayers.length);
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      handlePlayerSelect(filteredPlayers[highlightIndex]);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold text-[#ae3c33] text-center mb-6">Create Your Dream Team</h2>

      {/* Team Name Input */}
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ae3c33] focus:border-[#ae3c33] transition duration-300 mb-4"
        placeholder="Enter team name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      {/* Player Search with Auto-Suggestions */}
      <div className="relative">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ae3c33] focus:border-[#ae3c33] transition duration-300"
          placeholder="Search players..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Suggestions Dropdown */}
        {search && filteredPlayers.length > 0 && (
          <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto transition-opacity duration-300">
            {filteredPlayers.map((player, index) => (
              <li
                key={player}
                className={`cursor-pointer p-3 hover:bg-[#ae3c33] hover:text-white transition duration-300 ${
                  highlightIndex === index ? "bg-[#ae3c33] text-white" : ""
                }`}
                onClick={() => handlePlayerSelect(player)}
              >
                {player}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Players */}
      {selectedPlayers.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-6 text-[#ae3c33]">Selected Players ({selectedPlayers.length})</h3>
          <ul className="border rounded-lg p-3 bg-gray-50 shadow-md transition duration-300">
            {selectedPlayers.map((player) => (
              <li
                key={player}
                className="flex justify-between items-center p-3 bg-white rounded-lg my-2 shadow-sm transition duration-300 hover:bg-gray-100"
              >
                {player}
                <button
                  className="text-red-600 font-bold hover:text-red-800 transition duration-300"
                  onClick={() => handleRemovePlayer(player)}
                >
                  ✖ Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Submit Button */}
      <button className="w-full bg-[#ae3c33] text-white p-3 rounded-lg mt-6 font-semibold text-lg hover:bg-[#911f27] transition duration-300 shadow-md hover:shadow-lg">
        Create Team
      </button>
    </div>
  );
}
