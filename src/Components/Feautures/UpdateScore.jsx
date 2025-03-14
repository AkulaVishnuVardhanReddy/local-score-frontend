import React, { useState } from "react";
import { CheckCircle, XCircle, PlusCircle, MinusCircle } from "lucide-react";

const UpdateScore = ({ isCreator }) => {
  const [score, setScore] = useState({ runs: 0, wickets: 0, overs: 0.0 });
  const [ballType, setBallType] = useState("Normal");

  const ballOptions = ["Normal", "Wide", "No Ball", "Bye", "Leg Bye", "Dot"];

  const updateScore = (runs) => {
    setScore((prev) => ({
      runs: prev.runs + runs,
      wickets: prev.wickets,
      overs: parseFloat((prev.overs + 0.1).toFixed(1)),
    }));
  };

  const addWicket = () => {
    setScore((prev) => ({ ...prev, wickets: prev.wickets + 1 }));
  };

  const undo = () => {
    setScore({ runs: 0, wickets: 0, overs: 0.0 });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg border">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Match Score</h2>

      {/* Score Display */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-4">
        <div className="text-lg font-semibold text-gray-800">🏏 Runs: {score.runs}</div>
        <div className="text-lg font-semibold text-gray-800">❌ Wickets: {score.wickets}</div>
        <div className="text-lg font-semibold text-gray-800">⚡ Overs: {score.overs}</div>
      </div>

      {/* Ball Type Selection */}
      <div className="mb-4">
        <label className="text-gray-600 font-medium">Select Ball Type:</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {ballOptions.map((option) => (
            <button
              key={option}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                ballType === option ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setBallType(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Update Buttons */}
      {isCreator ? (
        <>
          <div className="flex flex-wrap gap-3 mb-4">
            {[1, 2, 3, 4, 6].map((runs) => (
              <button
                key={runs}
                onClick={() => updateScore(runs)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex items-center gap-1"
              >
                <PlusCircle size={16} /> {runs} Runs
              </button>
            ))}
          </div>

          <button
            onClick={addWicket}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center gap-1 mb-3"
          >
            <XCircle size={16} /> Add Wicket
          </button>

          <button
            onClick={undo}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md flex items-center gap-1"
          >
            <MinusCircle size={16} /> Reset Score
          </button>
        </>
      ) : (
        <p className="text-red-500 font-medium text-sm">Only the match creator can update the score.</p>
      )}
    </div>
  );
};

export default UpdateScore;
