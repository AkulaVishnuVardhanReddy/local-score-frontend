import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewCreatedMatches = () => {
  const navigate = useNavigate();

  // Temporary dummy data for matches
  const [matches, setMatches] = useState([
    {
      id: 1,
      title: 'India vs Australia',
      venue: 'Wankhede Stadium',
      date: '2025-04-17',
      time: '03:00 PM',
      status: 'Upcoming',
    },
    {
      id: 2,
      title: 'England vs South Africa',
      venue: 'Lord’s',
      date: '2025-04-19',
      time: '07:30 PM',
      status: 'Live',
    },
    {
      id: 3,
      title: 'Pakistan vs Sri Lanka',
      venue: 'Gaddafi Stadium',
      date: '2025-04-20',
      time: '06:00 PM',
      status: 'Completed',
    },
  ]);

  // Simulate fetching data
  useEffect(() => {
    // You can replace this later with an API call
    // axios.get('/api/matches?createdBy=userId').then(res => setMatches(res.data));
  }, []);

  const handleUpdateScore = (matchId) => {
    // Redirect to the score update page with the match ID
    navigate(`/update-score/${matchId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fdf3f3] to-[#ffeaea] p-8">
      <h1 className="text-4xl font-bold text-center text-[#ae3c33] mb-8">
        Your Created Matches
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-[#ae3c33] mb-2">
              {match.title}
            </h2>
            <p className="text-gray-600 mb-1"><span className="font-medium">Venue:</span> {match.venue}</p>
            <p className="text-gray-600 mb-1"><span className="font-medium">Date:</span> {match.date}</p>
            <p className="text-gray-600 mb-3"><span className="font-medium">Time:</span> {match.time}</p>

            <div className="flex justify-between items-center">
              <span className={`text-sm px-3 py-1 rounded-full font-medium
                ${match.status === 'Live' ? 'bg-green-100 text-green-600' : 
                  match.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-600' : 
                  'bg-gray-200 text-gray-600'}`}>
                {match.status}
              </span>

              {match.status !== 'Completed' && (
                <button
                  onClick={() => handleUpdateScore(match.id)}
                  className="bg-[#ae3c33] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#912c27] transition"
                >
                  Start / Update Score
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCreatedMatches;
