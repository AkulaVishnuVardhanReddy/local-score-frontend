import React, { useState, useEffect, useCallback } from "react";
import { RotateCcw } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Initial fields setup
const initialMatchFields = {
  id: "",
  team1Score: "",
  team1wickets: "",
  team1Overs: "",
  team2Score: "",
  team2wickets: "",
  team2Overs: "",
  name: "",
  matchDate: "",
  totalOvers: "",
  tossDecision: "",
  matchStatus: "",
  tournamentEntity: null,
  tossWinner: null,
  matchWinner: null,
  teamEntity1: { id: "", name: "" },
  teamEntity2: { id: "", name: "" },
  addressEntity: { address2: "" },
};

const UpdateScore = ({ isCreator }) => {
  const [prevScore, setPrevScore] = useState(null);
  const [isInningsOver, setIsInningsOver] = useState(false);
  const [fields, setFields] = useState(initialMatchFields);
  const [score, setScore] = useState({ runs: 0, wickets: 0, overs: 0 });
  const [selectedRuns, setSelectedRuns] = useState(null);
  const { matchId } = useParams();

  const updateOvers = useCallback((currentOvers) => {
    const oversInt = Math.floor(currentOvers);
    const oversDecimal = (currentOvers * 10) % 10;
    return oversDecimal < 5
      ? parseFloat((oversInt + (oversDecimal + 1) / 10).toFixed(1))
      : parseFloat((oversInt + 1).toFixed(1));
  }, []);

  const checkInningsOver = (updatedScore) => {
    if (
      updatedScore.wickets >= 11 ||
      updatedScore.overs >= Number(fields.totalOvers)
    ) {
      setIsInningsOver(true);
    }
  };

  const updateScore = (runs) => {
    if (isInningsOver) return;
    const updatedOvers = updateOvers(score.overs);
    const updated = {
      runs: score.runs + runs,
      wickets: score.wickets,
      overs: updatedOvers,
    };
    setScore(updated);
    setSelectedRuns(runs);
    checkInningsOver(updated);
  };

  const addWicket = () => {
    if (isInningsOver || score.wickets >= 11) return;
    const updated = { ...score, wickets: score.wickets + 1 };
    setScore(updated);
    checkInningsOver(updated);
  };

  const undo = () => {
    if (prevScore) {
      setScore(prevScore);
      setPrevScore(null);
      setSelectedRuns(null);
      setIsInningsOver(false);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value, type } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: type === "number" && value !== "" ? Number(value) : value,
    }));
  };

  const fetchMatchDetails = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/matches/${matchId}`);
      const res = await response.json();
      if (res?.data) {
        const m = res.data;
        setFields({
          ...initialMatchFields,
          ...m,
          matchDate: m.matchDate ? m.matchDate.split("T")[0] : "",
          teamEntity1: { ...initialMatchFields.teamEntity1, ...m.teamEntity1 },
          teamEntity2: { ...initialMatchFields.teamEntity2, ...m.teamEntity2 },
          addressEntity: {
            ...initialMatchFields.addressEntity,
            ...m.addressEntity,
          },
        });
      }
    } catch (err) {
      console.error("Failed to fetch match:", err);
    }
  }, []);

  const teamOptions = [
    { id: fields.teamEntity1.id, name: fields.teamEntity1.name, value: fields.teamEntity1.id },
    { id: fields.teamEntity2.id, name: fields.teamEntity2.name, value: fields.teamEntity2.id },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = { ...fields };
    const currentTeam =
      fields.inningBy == fields.teamEntity1.name ? "team1" : "team2";
    updatedFields[`${currentTeam}Score`] = score.runs;
    updatedFields[`${currentTeam}wickets`] = score.wickets;
    updatedFields[`${currentTeam}Overs`] = score.overs;

    try {
      const response = await axios.put(
        `http://localhost:8080/match/${matchId}`,
        updatedFields,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Response from server:", response.data);
      setScore({ runs: 0, wickets: 0, overs: 0 });
      fetchMatchDetails();
    } catch (error) {
      console.error("Error submitting match details:", error);
    }
  };

  useEffect(() => {
    fetchMatchDetails();
  }, [fetchMatchDetails]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 to-red-100 flex flex-col md:flex-row font-sans">
      <div className="md:w-1/2 w-full p-10 flex flex-col justify-center items-center bg-white shadow-2xl rounded-r-3xl">
        <div className="text-center w-full max-w-sm transition duration-500 ease-in-out">
          <h1 className="text-4xl font-extrabold text-red-700 mb-2">
            {fields.name}
          </h1>
          <h3 className="text-2xl font-semibold text-gray-800">
            {
              teamOptions.find((team) => team.id === parseInt(fields.inningBy))
                ?.name
            }
          </h3>
          {fields.tossWinner && fields.tossDecision && (
            <p className="text-sm text-gray-600 mb-2">
              Toss:{" "}
              <span className="font-semibold">
                {
                  fields.tossWinner
                }
              </span>{" "}
              choose to{" "}
              <span className="font-semibold">{fields.tossDecision}</span>{" "}
              first.
            </p>
          )}

          <div className="text-7xl font-extrabold text-red-700 my-4 transition-all duration-300 hover:scale-110">
            {score.runs}-{score.wickets}
          </div>
          <p className="text-base text-gray-700 mb-1">
            Overs: {score.overs}/{fields.totalOvers}
          </p>
          <p className="text-base text-gray-700 mb-2">
            Match Status:{" "}
            <span className="font-bold">{fields.matchStatus}</span>
          </p>

          <div className="mt-6 space-y-2 text-sm text-left bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm transition duration-300 ease-in-out hover:shadow-md">
            <p>
              <strong>Match Date:</strong> {fields.matchDate || "Not Set"}
            </p>
            <p>
              <strong>Total Overs:</strong> {fields.totalOvers}
            </p>
            <p>
              <strong>{fields.teamEntity1.name}:</strong>{" "}
              {fields.team1Score || 0} / {fields.team1wickets || 0} (
              {fields.team1Overs})
            </p>
            <p>
              <strong>{fields.teamEntity2.name}:</strong>{" "}
              {fields.team2Score || 0} / {fields.team2wickets || 0} (
              {fields.team2Overs})
            </p>
          </div>

          <div className="flex gap-2 mt-6 justify-center flex-wrap">
            {[0, 1, 2, 3, 4, 6].map((run) => (
              <button
                key={run}
                onClick={() => updateScore(run)}
                className="bg-red-500 hover:bg-red-600 transition transform hover:scale-105 text-white px-4 py-2 rounded-md shadow"
              >
                +{run}
              </button>
            ))}
            <button
              onClick={addWicket}
              className="bg-yellow-500 hover:bg-yellow-600 transition transform hover:scale-105 text-white px-4 py-2 rounded-md shadow"
            >
              Wicket
            </button>
            <button
              onClick={undo}
              className="bg-gray-400 hover:bg-gray-500 transition transform hover:rotate-12 text-white px-3 py-2 rounded-full"
              title="Undo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 w-full p-10 flex flex-col justify-center items-center bg-pink-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 rounded-2xl bg-white shadow-xl space-y-5 animate-fade-in"
        >
          <h2 className="text-3xl font-bold text-red-600 text-center mb-4">
            🎯 Update Match Info
          </h2>
          {[
            { label: "Toss Winner", name: "tossWinner", options: teamOptions },
            {
              label: "Toss Decision",
              name: "tossDecision",
              options: [
                { id: "BAT", name: "BAT" },
                { id: "BOWL", name: "BOWL" },
              ],
            },
            {
              label: "Match Status",
              name: "matchStatus",
              options: [
                { id: "SCHEDULED", name: "Scheduled" },
                { id: "ONGOING", name: "Ongoing" },
                { id: "COMPLETED", name: "Completed" },
                { id: "ABANDONED", name: "Abandoned" },
              ],
            },
            { label: "Inning By", name: "inningBy", options: teamOptions },
          ].map(({ label, name, options }) => (
            <div key={name} className="transition-all duration-300">
              <label className="block text-gray-700 font-semibold mb-1">
                {label}
              </label>
              <select
                name={name}
                value={ fields[name]}
                onChange={handleFieldChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition duration-300 ease-in-out"
              >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                  <option key={opt.id} value={opt.name}>
                    {opt.name}
                  </option> // Send 'id' as value here
                ))}
              </select>
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Update Match
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateScore;
