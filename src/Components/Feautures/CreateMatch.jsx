import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function CreateMatch() {
  const [form, setForm] = useState({
    name: "",
    matchDate: "",
    totalOvers: "",
    targetRuns: "",
    targetOvers: "",
    superOver: "",
    tossDecision: "",
    matchStatus: "",
    tournamentId: "",
    playerOfMatchId: "",
    tossWinnerId: "",
    matchWinnerId: "",
    team1Id: "",
    team2Id: "",
    ownerId: "",
    addressId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Match Created:", form);

    toast.success("🏏 Match created successfully!", {
      style: {
        borderRadius: "10px",
        background: "#ae3c33",
        color: "#fff",
        fontWeight: "bold",
      },
    });

    setForm({
      name: "",
      matchDate: "",
      totalOvers: "",
      targetRuns: "",
      targetOvers: "",
      superOver: "",
      tossDecision: "",
      matchStatus: "",
      tournamentId: "",
      playerOfMatchId: "",
      tossWinnerId: "",
      matchWinnerId: "",
      team1Id: "",
      team2Id: "",
      ownerId: "",
      addressId: "",
    });
  };

  const tossDecisions = ["BAT", "BOWL"];
  const matchStatuses = ["SCHEDULED", "ONGOING", "COMPLETED"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl border border-gray-100 p-10 rounded-3xl max-w-4xl w-full space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-black mb-4">Create Match</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Match Name", name: "name", type: "text" },
            { label: "Match Date", name: "matchDate", type: "date" },
            { label: "Total Overs", name: "totalOvers", type: "number" },
            { label: "Target Runs", name: "targetRuns", type: "number" },
            { label: "Target Overs", name: "targetOvers", type: "number" },
            { label: "Super Over", name: "superOver", type: "number" },
            { label: "Tournament ID", name: "tournamentId", type: "number" },
            { label: "Player of Match ID", name: "playerOfMatchId", type: "number" },
            { label: "Toss Winner ID", name: "tossWinnerId", type: "number" },
            { label: "Match Winner ID", name: "matchWinnerId", type: "number" },
            { label: "Team 1 ID", name: "team1Id", type: "number" },
            { label: "Team 2 ID", name: "team2Id", type: "number" },
            { label: "Owner ID", name: "ownerId", type: "number" },
            { label: "Address ID", name: "addressId", type: "number" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-600 mb-1 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ae3c33] shadow-sm transition-all"
              />
            </div>
          ))}

          {/* Toss Decision Dropdown */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Toss Decision</label>
            <select
              name="tossDecision"
              value={form.tossDecision}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ae3c33] shadow-sm"
            >
              <option value="">Select Decision</option>
              {tossDecisions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Match Status Dropdown */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Match Status</label>
            <select
              name="matchStatus"
              value={form.matchStatus}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ae3c33] shadow-sm"
            >
              <option value="">Select Status</option>
              {matchStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full mt-6 bg-[#ae3c33] hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-300"
        >
          Create Match
        </motion.button>
      </motion.div>
    </div>
  );
}
