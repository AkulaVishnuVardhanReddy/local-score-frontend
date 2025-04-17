import { useState } from "react";

const CreateMatch = () => {
  const [match, setMatch] = useState({
    name: "",
    matchDate: "",
    totalOvers: "",
    tournamentId: "1", // Hardcoded for now
    team1: "Team A", // Hardcoded for now
    team2: "Team B", // Hardcoded for now
    addressId: "101", // Hardcoded for now
  });

  // Hardcoded tournament, teams, and address suggestions
  const tournaments = [
    { id: "1", name: "IPL 2025" },
    { id: "2", name: "World Cup 2025" },
  ];

  const teams = [
    { id: "T1", name: "Team A" },
    { id: "T2", name: "Team B" },
    { id: "T3", name: "Team C" },
  ];

  const addresses = [
    { id: "101", name: "Eden Gardens, Kolkata" },
    { id: "102", name: "Wankhede Stadium, Mumbai" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Match Created:", match);
    // API call can be added later
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          ⚡ Create a New Match
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Match Name</label>
            <input type="text" name="name" placeholder="Enter match name" className="input" onChange={handleChange} />
          </div>

          <div>
            <label className="label">Match Date</label>
            <input type="date" name="matchDate" className="input" onChange={handleChange} />
          </div>

          <div>
            <label className="label">Total Overs</label>
            <input type="number" name="totalOvers" placeholder="Enter total overs" className="input" onChange={handleChange} />
          </div>

          <div>
            <label className="label">Select Tournament</label>
            <select name="tournamentId" className="input" onChange={handleChange}>
              {tournaments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Team 1</label>
            <select name="team1" className="input" onChange={handleChange}>
              {teams.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Team 2</label>
            <select name="team2" className="input" onChange={handleChange}>
              {teams.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Match Location</label>
            <select name="addressId" className="input" onChange={handleChange}>
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary">
            🚀 Create Match
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMatch;
