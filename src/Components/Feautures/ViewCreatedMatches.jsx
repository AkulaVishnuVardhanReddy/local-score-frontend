import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewCreatedMatches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/matches/user/${localStorage.getItem("id")}`);
        const fetchedMatches = response.data.data;
        setMatches(fetchedMatches);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      }
    };

    fetchMatches();
  }, []);

  const handleUpdateScore = (matchId) => {
    navigate(`/update-score/${matchId}`);
  };

  const handleCreateMatch = () => {
    navigate('/create-match');
  };

  return (
    <div className="min-h-screen py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-[#ae3c33] mb-10">
        Your Created Matches
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Create New Match Card */}
        <div
          onClick={handleCreateMatch}
          className="cursor-pointer flex flex-col justify-center items-center bg-white rounded-2xl shadow-md border p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="text-[#ae3c33] text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
            ＋
          </div>
          <p className="text-lg font-semibold text-[#ae3c33]">Create New Match</p>
        </div>

        {/* Render Matches from API */}
        {matches.map((match, index) => {
          const dateObj = new Date(match.matchDate);
          const date = dateObj.toLocaleDateString();
          const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <div
              key={match.id}
              className="relative bg-white rounded-2xl shadow-md p-6 border hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1"
              style={{ animation: `fadeIn 0.5s ease-in ${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-[#ae3c33]">{match.team1Name} vs {match.team2Name}</h2>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  {match.totalOvers+" Overs" || 'Unknown'}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Venue:</span> {match.address2}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Date:</span> {date}
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <span className="font-medium">Time:</span> {time}
              </p>

              <div className="flex justify-between items-center">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full
                    ${match.matchStatus === 'Live'
                      ? 'bg-green-100 text-green-700'
                      : match.matchStatus === 'SCHEDULED'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-200 text-gray-700'
                    }`}
                >
                  {match.matchStatus || 'Status Pending'}
                </span>

                {match.matchStatus !== 'Completed' && (
                  <button
                    onClick={() => handleUpdateScore(match.id)}
                    className="bg-[#ae3c33] text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-[#912c27] transition-all duration-300"
                  >
                    Start / Update Score
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ViewCreatedMatches;
