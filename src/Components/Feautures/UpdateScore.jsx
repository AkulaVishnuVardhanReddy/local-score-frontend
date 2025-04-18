import React, { useState } from "react";
import { XCircle, RotateCcw } from "lucide-react";

const UpdateScore = ({ isCreator }) => {
  const initialScore = { runs: 70, wickets: 1, overs: 6.4 };
  const [score, setScore] = useState(initialScore);
  const [prevScore, setPrevScore] = useState(null);
  const [selectedRuns, setSelectedRuns] = useState(null);
  const [isInningsOver, setIsInningsOver] = useState(false);

  const [showTossModal, setShowTossModal] = useState(true);
  const [tossWinner, setTossWinner] = useState("");
  const [decision, setDecision] = useState("");

  const updateOvers = (currentOvers) => {
    const oversInt = Math.floor(currentOvers);
    const oversDecimal = (currentOvers * 10) % 10;

    if (oversDecimal < 5) {
      return parseFloat((oversInt + (oversDecimal + 1) / 10).toFixed(1));
    } else {
      return parseFloat((oversInt + 1).toFixed(1));
    }
  };

  const checkInningsOver = (updatedScore) => {
    if (updatedScore.wickets >= 11 || updatedScore.overs >= 20.0) {
      setIsInningsOver(true);
    }
  };

  const updateScore = (runs) => {
    if (isInningsOver) return;
    setPrevScore(score);

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
    setPrevScore(score);

    const updated = {
      ...score,
      wickets: score.wickets + 1,
    };

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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 to-red-100 flex flex-col md:flex-row font-sans">
      {/* Toss Modal */}
      {showTossModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-11/12 max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Toss Details</h2>
            <div className="mb-4">
              <label className="block font-medium mb-1">Toss Winner</label>
              <input
                type="text"
                value={tossWinner}
                onChange={(e) => setTossWinner(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter team name"
              />
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-1">Decision</label>
              <select
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select</option>
                <option value="bat">Bat</option>
                <option value="bowl">Bowl</option>
              </select>
            </div>
            <button
              onClick={() => {
                if (tossWinner && decision) {
                  setShowTossModal(false);
                }
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Scoreboard */}
      <div className="md:w-1/2 w-full p-10 flex flex-col justify-center items-center bg-white shadow-2xl rounded-r-3xl">
        <div className="text-center w-full max-w-sm">
          <h1 className="text-4xl font-extrabold text-red-600 mb-2 tracking-wide animate-bounce">
            🏏 Match Centre
          </h1>
          <h3 className="text-2xl font-semibold text-gray-800">PHOENIX XI</h3>
          <p className="text-sm text-gray-500 mb-1">2nd Innings</p>

          {/* Optional: Toss Info */}
          {tossWinner && decision && (
            <p className="text-sm text-gray-600 mb-2">
              Toss: <span className="font-semibold">{tossWinner}</span> chose to{" "}
              <span className="font-semibold">{decision}</span> first.
            </p>
          )}

          <div className="text-7xl font-extrabold text-red-700 my-4">
            {score.runs}-{score.wickets}
          </div>
          <p className="text-base text-gray-700 mb-1">Overs: {score.overs}/20</p>
          <p className="text-base text-gray-700 mb-2">CRR: 10.5</p>
          <div className="mt-8 grid grid-cols-3 gap-4 rounded-xl p-4 text-sm font-medium bg-red-50 border border-red-200 shadow-sm">
            <div className="text-center">🏏 Runs: {score.runs}</div>
            <div className="text-center">❌ Wickets: {score.wickets}</div>
            <div className="text-center">⚡ Overs: {score.overs}</div>
          </div>
        </div>
      </div>

      {/* Update Panel */}
      <div className="md:w-1/2 w-full p-10 flex flex-col justify-center items-center bg-pink-50">
        {!isCreator ? (
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Update the Score</h2>
            <div className="grid grid-cols-6 gap-3 mb-8">
              {[1, 2, 3, 4, 6, 0].map((runs) => (
                <button
                  key={runs}
                  onClick={() => updateScore(runs)}
                  className={`py-2 rounded-xl font-semibold transition-all duration-300 text-lg shadow-md ${
                    selectedRuns === runs
                      ? "bg-red-600 text-white scale-105"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-red-100 hover:scale-105"
                  }`}
                >
                  {runs}
                </button>
              ))}
            </div>

            <div className="flex gap-4 mb-5">
              <button
                onClick={addWicket}
                className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <XCircle size={18} /> Wicket
              </button>
              <button
                onClick={undo}
                className="w-1/2 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <RotateCcw size={18} /> Undo
              </button>
            </div>

            {isInningsOver && (
              <p className="text-center text-sm text-green-700 font-medium">
                ✅ Innings over!
              </p>
            )}

            <p className="text-center text-sm text-red-600 font-medium">
              Only the match creator can update the score.
            </p>
          </div>
        ) : (
          <p className="text-center text-lg font-semibold text-gray-500">
            You are the match creator. Waiting for live updates...
          </p>
        )}
      </div>
    </div>
  );
};

export default UpdateScore;
