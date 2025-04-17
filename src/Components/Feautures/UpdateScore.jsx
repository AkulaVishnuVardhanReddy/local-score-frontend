import React, { useState } from "react";
import { XCircle, RotateCcw } from "lucide-react";

const UpdateScore = ({ isCreator }) => {
  const initialScore = { runs: 70, wickets: 1, overs: 6.4 };
  const [score, setScore] = useState(initialScore);
  const [prevScore, setPrevScore] = useState(null);
  const [selectedRuns, setSelectedRuns] = useState(null);
  const [isInningsOver, setIsInningsOver] = useState(false);

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
    setPrevScore(score); // Save previous state for undo

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
      setIsInningsOver(false); // Allow updates again after undo
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#faf5f5] to-[#ffe9e9] flex flex-col md:flex-row font-sans">
      {/* Scoreboard */}
      <div className="md:w-1/2 w-full p-10 flex flex-col justify-center items-center bg-white shadow-xl rounded-r-3xl transition-all duration-500">
        <div className="text-center w-full max-w-sm">
          <h1 className="text-4xl font-extrabold text-[#ae3c33] mb-2 tracking-wide transition-all">
            🏏 Match Centre
          </h1>
          <h3 className="text-2xl font-semibold text-gray-800">PHOENIX XI</h3>
          <p className="text-sm text-gray-500 mb-4">2nd Innings</p>
          <div className="text-7xl font-extrabold text-[#ae3c33] my-4 transition-all duration-300">
            {score.runs}-{score.wickets}
          </div>
          <p className="text-base text-gray-700 mb-1">Overs: {score.overs}/20</p>
          <p className="text-base text-gray-700 mb-2">CRR: 10.5</p>
          
          <div className="mt-8 grid grid-cols-3 gap-4 rounded-xl p-4 text-sm font-medium">
            <div className="text-center">🏏 Runs: {score.runs}</div>
            <div className="text-center">❌ Wickets: {score.wickets}</div>
            <div className="text-center">⚡ Overs: {score.overs}</div>
          </div>
        </div>
      </div>

      {/* Update Panel */}
      <div className="md:w-1/2 w-full p-10 flex flex-col justify-center items-center transition-all bg-[#fff0f0]">
        {!isCreator ? (
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-[#ae3c33] mb-6 text-center transition-all">
              Update the Score
            </h2>

            <div className="grid grid-cols-6 gap-3 mb-8">
              {[1, 2, 3, 4, 6, 0].map((runs) => (
                <button
                  key={runs}
                  onClick={() => updateScore(runs)}
                  className={`py-2 rounded-xl font-semibold transition-all duration-300 text-lg shadow-md ${
                    selectedRuns === runs
                      ? "bg-[#ae3c33] text-white scale-105"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-[#f6dede] hover:scale-105"
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
                Innings over!
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
