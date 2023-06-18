import React from 'react';

type TeamCardProps = {
  teamNumber: number;
  teamMembers: number;
  joined: boolean;
  isFull: boolean;
  onClick: () => void; 
};

const TeamCard: React.FC<TeamCardProps> = ({ teamNumber, teamMembers, joined, isFull, onClick }) => {
  const handleClick = () => {
    if (!isFull && !joined) {
      onClick();
    }
  };

  return (
    <div
    className={`w-96 p-4 rounded-lg cursor-pointer ${
      joined ? 'bg-green-500' : isFull ? 'bg-yellow-400' : 'bg-gray-700'
    }`}
    onClick={!isFull ? handleClick : undefined}
  >
    <div className="flex justify-between items-center">
      <span className="font-bold text-white">Team {teamNumber}</span>
      {joined && (
        <span
        className={`text-sm ${
          isFull ? 'bg-yellow-400 text-black font-bold' : 'bg-green-500 text-white font-bold'
        } px-2 rounded-full`}
      >
        {isFull ? 'Joined 4/4' : 'Joined'}
      </span>
      )}
      {!isFull && <span className="font-bold text-white">{teamMembers}/4</span>}
      {isFull && !joined && (
        <span className="text-sm bg-yellow-400 text-black font-bold rounded-full">FULL</span>
      )}
    </div>
  </div>
  );
};

export default TeamCard;