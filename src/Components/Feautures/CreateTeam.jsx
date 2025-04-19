import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [playerData, setPlayerData] = useState([]);

  // Fetch players using axios
  useEffect(() => {
    axios.get("http://localhost:8080/api/get-all-players")
      .then((response) => {
        if (response.data && response.data.data) {
          const formattedPlayers = response.data.data.map((player) => ({
            id: player.id,
            name: player.name,
          }));
          setPlayerData(formattedPlayers);
        }
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
        toast.error("Failed to fetch players.");
      });
  }, []);

  const availablePlayers = playerData.filter(
    (player) => !selectedPlayers.some((p) => p.id === player.id)
  );

  const filteredPlayers = availablePlayers.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePlayerSelect = (player) => {
    setSelectedPlayers([...selectedPlayers, player]);
    setSearch("");
    setHighlightIndex(-1);
  };

  const handleRemovePlayer = (id) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== id));
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

  const handleSubmit = () => {
    const playerIds = selectedPlayers.map((player) => player.id);
    const requestBody = {
      teamName,
      playerIds,
    };
    console.log(requestBody);

    axios.post("http://localhost:8080/api/teams/create", requestBody)
      .then(() => {
        toast.success("Team created successfully!", {
          style: {
            borderRadius: "10px",
            color: "#000",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#ae3c33",
          },
        });
        setTeamName("");
        setSelectedPlayers([]);
      })
      .catch((error) => {
        console.error("Error creating team:", error);
        toast.error("Failed to create team.");
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-white">
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white border border-gray-200 rounded-3xl shadow-2xl grid md:grid-cols-2 gap-10 p-10"
      >
        {/* Left Side */}
        <div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl text-center font-bold text-black mb-6"
          >
            Create Team
          </motion.h1>

          <input
            type="text"
            placeholder="Team Name"
            className="w-full mb-4 px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ae3c33] transition-all duration-300 shadow-sm"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <div className="relative">
            <input
              type="text"
              placeholder="Search Players"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ae3c33] transition-all duration-300 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            {search && filteredPlayers.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border mt-2 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                {filteredPlayers.map((player, index) => (
                  <li
                    key={player.id}
                    className={`px-5 py-2 cursor-pointer transition-all text-gray-800 font-medium ${
                      highlightIndex === index
                        ? "bg-[#ae3c33] text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handlePlayerSelect(player)}
                  >
                    {player.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="mt-6 w-full bg-[#ae3c33] hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-300"
          >
            Create Team
          </motion.button>
        </div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-inner max-h-[500px] overflow-y-auto"
        >
          <h2 className="text-2xl font-semibold text-[#ae3c33] mb-4">Selected Players</h2>
          <AnimatePresence>
            {selectedPlayers.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400 italic"
              >
                No players selected yet.
              </motion.p>
            ) : (
              <ul className="space-y-3">
                {selectedPlayers.map((player) => (
                  <motion.li
                    key={player.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="flex justify-between items-center bg-white p-4 rounded-xl border hover:shadow-md transition-all"
                  >
                    <span className="text-gray-700 font-medium">{player.name}</span>
                    <button
                      onClick={() => handleRemovePlayer(player.id)}
                      className="text-[#ae3c33] hover:text-red-700 font-semibold transition-all"
                    >
                      Remove
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
