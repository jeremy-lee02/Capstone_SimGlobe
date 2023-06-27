import React from 'react';
import CheckIcon from './CheckIcon';

type TeamCardProps = {
  teamNumber: number;
  teamMembers: number;
  joined: boolean;
  isFull: boolean;
  onClick?: () => void;
};

const TeamCard: React.FC<TeamCardProps> = ({
  teamNumber,
  teamMembers,
  joined,
  isFull,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick &&!isFull && !joined) {
      onClick();
    }
  };

  const cardClass = `w-96 p-4 rounded-lg cursor-pointer shadow-xl ${
    joined ? 'bg-green-500' : isFull ? 'bg-yellow-400' : 'bg-gray-700'
  } ${!joined && !isFull ? 'hover:bg-teal-500' : ''}`;

  const teamNumberClass = `font-bold ${isFull ? 'text-black' : 'text-white'}`;
  return (
    <div className={cardClass} onClick={!isFull ? handleClick : undefined}>
      <div className="flex justify-between items-center relative">
        <span className={teamNumberClass}>Team {teamNumber}</span>
        {joined && (
          <div className="joined-container">
            <span
              className={`text-sm ${
                isFull ? 'bg-yellow-400 text-black font-bold' : 'bg-green-500 text-white font-bold'
              } px-2 rounded-full flex items-center`}
            >
              <span className="mr-1">{isFull ? 'Joined 4/4' : 'Joined'}</span>
              <CheckIcon className="fill-current w-5 h-4" />
            </span>
          </div>
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