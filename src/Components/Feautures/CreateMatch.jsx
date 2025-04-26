import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../assets/logo.png";
import { Navigate, useNavigate } from "react-router-dom";

export default function CreateMatch() {
  const [form, setForm] = useState({
    name: "",
    matchDate: "",
    matchTime: "",
    totalOvers: "",
    team1Id: "",
    team2Id: "",
    addressId: "",
    team1Name: "",
    team2Name: "",
    addressName: "",
    team1NameSuggestions: [],
    team2NameSuggestions: [],
    addressSuggestions: [],
  });

  const [teams, setTeams] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get-all-teams`);
        const data = await response.json();
        if (data.message === "All teams fetched") {
          const teamsData = data.data.map((team) => ({
            id: team.id,
            name: team.name,
          }));
          setTeams(teamsData);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        toast.error("Failed to load teams");
      }
    };

    const fetchAddresses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/address/all`);
        const data = await response.json();
        if (data?.data && Array.isArray(data.data)) {
          const addressesData = data.data.map((address) => ({
            id: address.id,
            name: address.address2,
          }));
          setAddresses(addressesData);
        } else {
          toast.error("Failed to load addresses: Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error("Failed to load addresses");
      }
    };

    fetchTeams();
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "team1Name" || name === "team2Name") {
      const filteredTeams = teams.filter((team) =>
        team.name.toLowerCase().includes(value.toLowerCase())
      );
      setForm((prev) => ({
        ...prev,
        [`${name}Suggestions`]: filteredTeams,
      }));
    }

    if (name === "addressName") {
      const filteredAddresses = addresses.filter((address) =>
        address.name.toLowerCase().includes(value.toLowerCase())
      );
      setForm((prev) => ({
        ...prev,
        addressSuggestions: filteredAddresses,
      }));
    }
  };

  const handleSelectTeam = (teamId, teamName, teamFieldName) => {
    const idField = teamFieldName === "team1Name" ? "team1Id" : "team2Id";
    setForm((prev) => ({
      ...prev,
      [teamFieldName]: teamName,
      [idField]: teamId,
      [`${teamFieldName}Suggestions`]: [],
    }));
  };

  const handleSelectAddress = (addressId, addressName) => {
    setForm((prev) => ({
      ...prev,
      addressName,
      addressId,
      addressSuggestions: [],
    }));
  };

  const handleSubmit = async () => {
    const { name, matchDate, matchTime, totalOvers, team1Id, team2Id, addressId } = form;

    if (!name || !matchDate || !matchTime || !totalOvers || !team1Id || !team2Id || !addressId) {
      toast.error("Please fill all required fields");
      return;
    }

    const matchDateTime = new Date(`${matchDate}T${matchTime}`);
    if (isNaN(matchDateTime)) {
      toast.error("Invalid match date or time");
      return;
    }

    const matchPayload = {
      name,
      matchDate: matchDateTime.toISOString(),
      totalOvers: Number(totalOvers),
      team1Id,
      team2Id,
      addressId,
      ownerId: Number(localStorage.getItem("id")),
      matchStatus: "SCHEDULED"
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/matches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matchPayload),
      });

      if (!response.ok) throw new Error("Failed to create match");
      

      toast.success("🏏 Match created successfully!");
      navigate("/view-created-matches");
    } catch (err) {
      console.error("Error submitting match:", err);
      toast.error("Error submitting match");
    }
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
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Local Score Logo" className="h-30 mb-4" />
        </div>

        <h1 className="text-3xl font-semibold text-center text-black mb-4">Create Match</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Match Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter match name"
          />
          <InputField
            label="Match Date"
            name="matchDate"
            type="date"
            value={form.matchDate}
            onChange={handleChange}
            placeholder="Select date"
          />
          <InputField
            label="Match Time"
            name="matchTime"
            type="time"
            value={form.matchTime}
            onChange={handleChange}
            placeholder="Select time"
          />
          <InputField
            label="Total Overs"
            name="totalOvers"
            type="number"
            value={form.totalOvers}
            onChange={handleChange}
            placeholder="Enter total overs"
          />
          <AutoSuggestInput
            label="Team 1"
            name="team1Name"
            value={form.team1Name}
            suggestions={form.team1NameSuggestions}
            onChange={handleChange}
            placeholder="Search for team 1"
            onSelect={(id, name) => handleSelectTeam(id, name, "team1Name")}
          />
          <AutoSuggestInput
            label="Team 2"
            name="team2Name"
            value={form.team2Name}
            suggestions={form.team2NameSuggestions}
            onChange={handleChange}
            placeholder="Search for team 2"
            onSelect={(id, name) => handleSelectTeam(id, name, "team2Name")}
          />
        </div>

        {/* Full-width Address Field */}
        <div className="mt-4">
          <AutoSuggestInput
            label="Address"
            name="addressName"
            value={form.addressName}
            suggestions={form.addressSuggestions}
            onChange={handleChange}
            placeholder="Search for address"
            onSelect={(id, name) => handleSelectAddress(id, name)}
            fullWidth
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#ae3c33] text-white py-3 px-4 rounded-xl mt-6 font-semibold"
        >
          Create Match
        </button>
      </motion.div>
    </div>
  );
}

function AutoSuggestInput({ label, name, value, suggestions, onChange, onSelect, placeholder, fullWidth }) {
  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`}>
      <label className="block text-gray-700 mb-1 font-medium">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-xl border"
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-40 overflow-auto z-10">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(item.id, item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function InputField({ label, name, type, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-gray-700 mb-1 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ae3c33] shadow-sm"
      />
    </div>
  );
}
