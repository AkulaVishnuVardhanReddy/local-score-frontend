import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewCreatedMatches = () => {
  const navigate = useNavigate();

  const [matches, setMatches] = useState([
    {
      id: 1,
      title: 'India vs Australia',
      addressEntity: {
        name: 'Wankhede Stadium',
        status: 'Available',
      },
      matchDate: '2025-04-17T15:00:00',
      status: 'Upcoming',
    },
    {
      id: 2,
      title: 'England vs South Africa',
      addressEntity: {
        name: 'Lord’s',
        status: 'Booked',
      },
      matchDate: '2025-04-19T19:30:00',
      status: 'Live',
    },
    {
      id: 3,
      title: 'Pakistan vs Sri Lanka',
      addressEntity: {
        name: 'Gaddafi Stadium',
        status: 'Closed',
      },
      matchDate: '2025-04-20T18:00:00',
      status: 'Completed',
    },
  ]);

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

        {/* Existing Matches */}
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
                <h2 className="text-xl font-bold text-[#ae3c33]">{match.title}</h2>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  {match.addressEntity.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Venue:</span> {match.addressEntity.name}
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
                  ${match.status === 'Live'
                      ? 'bg-green-100 text-green-700'
                      : match.status === 'Upcoming'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-200 text-gray-700'
                    }`}
                >
                  {match.status}
                </span>

                {match.status !== 'Completed' && (
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
