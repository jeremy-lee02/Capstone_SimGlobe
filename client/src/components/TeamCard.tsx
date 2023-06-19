import React from 'react';

type TeamCardProps = {
  teamNumber: number;
  teamMembers: number;
  joined: boolean;
  isFull: boolean;
  onClick: () => void;
};

const TeamCard: React.FC<TeamCardProps> = ({
  teamNumber,
  teamMembers,
  joined,
  isFull,
  onClick,
}) => {
  const handleClick = () => {
    if (!isFull && !joined) {
      onClick();
    }
  };

  const cardClass = `w-96 p-4 rounded-lg cursor-pointer shadow-xl ${
    joined ? 'bg-green-500' : isFull ? 'bg-yellow-400' : 'bg-gray-700'
  } ${!joined && !isFull ? 'hover:bg-teal-500' : ''}`;

  return (
    <div className={cardClass} onClick={!isFull ? handleClick : undefined}>
      <div className="flex justify-between items-center relative">
        <span className="font-bold text-white">Team {teamNumber}</span>
        {joined && (
          <span
            className={`text-sm ${
              isFull ? 'bg-yellow-400 text-black font-bold' : 'bg-green-500 text-white font-bold'
            } px-2 rounded-full absolute -top-8 left-1/2 transform -translate-x-1/2`}
          >
            {isFull ? 'Joined 4/4' : 'Joined'}
          </span>
        )}
        {!isFull && <span className="font-bold text-white">{teamMembers}/4</span>}
        {isFull && !joined && (
          <span className="text-sm bg-yellow-400 text-black font-bold rounded-full">FULL</span>
        )}
        {joined && (
          <span className="tooltip absolute text-xs -top-6 left-1/2 transform -translate-x-1/2 text-white bg-black px-2 py-1 rounded opacity-0 pointer-events-none transition-opacity duration-300">
            {isFull ? 'Joined 4/4' : 'Joined'}
          </span>
        )}
      </div>
    </div>
  );
};

export default TeamCard;