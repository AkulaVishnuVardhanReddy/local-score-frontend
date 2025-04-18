import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function CreateMatch() {
  const [form, setForm] = useState({
    name: "",
    matchDate: "",
    totalOvers: "",
    team1Id: "",
    team2Id: "",
    addressId: "",
    team1Name: "",
    team2Name: "",
    addressName: "",
  });

  // Hardcoded data for teams and addresses
  const teams = [
    { id: 1, name: "Team A" },
    { id: 2, name: "Team B" },
    { id: 3, name: "Team C" },
    { id: 4, name: "Team D" },
  ];

  const addresses = [
    { id: 1, name: "Stadium 1" },
    { id: 2, name: "Stadium 2" },
    { id: 3, name: "Stadium 3" },
    { id: 4, name: "Stadium 4" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Show suggestions when typing for team or address fields
    if (name === "team1Name" || name === "team2Name") {
      const teamsFiltered = teams.filter((team) =>
        team.name.toLowerCase().includes(value.toLowerCase())
      );
      setForm((prev) => ({ ...prev, [`${name}Suggestions`]: teamsFiltered }));
    }
    if (name === "addressName") {
      const addressesFiltered = addresses.filter((address) =>
        address.name.toLowerCase().includes(value.toLowerCase())
      );
      setForm((prev) => ({ ...prev, addressSuggestions: addressesFiltered }));
    }
  };

  const handleSelectTeam = (teamId, teamName, teamField) => {
    setForm((prev) => ({
      ...prev,
      [teamField]: teamName,
      [`${teamField}Id`]: teamId,
      [`${teamField}Suggestions`]: [],
    }));
  };

  const handleSelectAddress = (addressId, addressName) => {
    setForm((prev) => ({
      ...prev,
      addressName,
      addressId: addressId,
      addressSuggestions: [],
    }));
  };

  const handleSubmit = () => {
    const matchPayload = {
      name: form.name,
      matchDate: form.matchDate,
      totalOvers: Number(form.totalOvers),
      teamEntity1: { id: Number(form.team1Id) },
      teamEntity2: { id: Number(form.team2Id) },
      addressEntity: { id: Number(form.addressId) },
      tossDecision: null,
      matchStatus: null,
      tournamentEntity: null,
      tossWinner: null,
      matchWinner: null,
      owner: null,
    };

    console.log("Submitting Match:", matchPayload);

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
      team1Id: "",
      team2Id: "",
      addressId: "",
      team1Name: "",
      team2Name: "",
      addressName: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl border border-gray-100 p-12 rounded-3xl max-w-3xl w-full space-y-6"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/local-score-logo.png"
            alt="Local Score Logo"
            className="h-20 mb-4"
          />
        </div>

        <h1 className="text-3xl font-semibold text-center text-black mb-4">Create Match</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Match Name", name: "name", type: "text" },
            { label: "Match Date", name: "matchDate", type: "date" },
            { label: "Total Overs", name: "totalOvers", type: "number" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 mb-1 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ae3c33] shadow-sm transition-all"
              />
            </div>
          ))}

          {/* Team 1 */}
          <div className="relative">
            <label className="block text-gray-700 mb-1 font-medium">Team 1</label>
            <input
              type="text"
              name="team1Name"
              value={form.team1Name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ae3c33] shadow-sm"
              placeholder="Start typing team name"
            />
            {form.team1NameSuggestions && (
              <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-40 overflow-auto z-10">
                {form.team1NameSuggestions.map((team) => (
                  <li
                    key={team.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectTeam(team.id, team.name, "team1Name")}
                  >
                    {team.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Team 2 */}
          <div className="relative">
            <label className="block text-gray-700 mb-1 font-medium">Team 2</label>
            <input
              type="text"
              name="team2Name"
              value={form.team2Name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ae3c33] shadow-sm"
              placeholder="Start typing team name"
            />
            {form.team2NameSuggestions && (
              <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-40 overflow-auto z-10">
                {form.team2NameSuggestions.map((team) => (
                  <li
                    key={team.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectTeam(team.id, team.name, "team2Name")}
                  >
                    {team.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Address */}
          <div className="relative">
            <label className="block text-gray-700 mb-1 font-medium">Address</label>
            <input
              type="text"
              name="addressName"
              value={form.addressName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ae3c33] shadow-sm"
              placeholder="Start typing address"
            />
            {form.addressSuggestions && (
              <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-40 overflow-auto z-10">
                {form.addressSuggestions.map((address) => (
                  <li
                    key={address.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectAddress(address.id, address.name)}
                  >
                    {address.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full mt-6 bg-[#ae3c33] hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
        >
          Create Match
        </motion.button>
      </motion.div>
    </div>
  );
}
