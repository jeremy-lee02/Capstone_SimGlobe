import React, { useState } from 'react';
import { simGlobe_logo } from '../assets';
import TeamCard from '../components/TeamCard';

type Team = {
  teamNumber: number;
  teamMembers: number;
};

const RoomStudent: React.FC = () => {
  const [joinedTeam, setJoinedTeam] = useState<number | null>(null);

  const handleJoinTeam = (teamNumber: number) => {
    if (teamNumber !== joinedTeam) {
      const updatedTeams = teams.map((team) => {
        if (team.teamNumber === joinedTeam) {
          return {
            ...team,
            teamMembers: team.teamMembers > 0 ? team.teamMembers - 1 : 0,
          };
        }
        if (team.teamNumber === teamNumber) {
          return {
            ...team,
            teamMembers: team.teamMembers < 4 ? team.teamMembers + 1 : 4,
          };
        }
        return team;
      });

      setJoinedTeam(teamNumber);
      setTeams(updatedTeams);
    }
  };

  const [teams, setTeams] = useState<Team[]>([
    { teamNumber: 1, teamMembers: 3 },
    { teamNumber: 2, teamMembers: 0 },
    { teamNumber: 3, teamMembers: 0 },
    { teamNumber: 4, teamMembers: 4 },
    { teamNumber: 5, teamMembers: 0 },
    { teamNumber: 6, teamMembers: 0 },
    { teamNumber: 7, teamMembers: 4 },
    { teamNumber: 8, teamMembers: 0 },
    { teamNumber: 9, teamMembers: 0 },
    { teamNumber: 10, teamMembers: 0 }
  ]);

  const handleLeaveRoom = () => {
    // Handle leave room functionality here
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between w-full p-4">
        <div className="flex items-center">
          <img src={simGlobe_logo} alt="Logo" width={150} height={60} className="object-contain" />
        </div>
        <h1 className="text-2xl font-bold">Daniel Borer</h1>
      </div>
      <div className="flex flex-col items-center flex-grow">
        <h1 className="text-3xl font-bold mb-8">CodeRoom: HELLOWORLD</h1>
        <div className="grid grid-cols-2 gap-10">
          {teams.map((team) => (
            <TeamCard
              key={team.teamNumber}
              teamNumber={team.teamNumber}
              teamMembers={team.teamMembers}
              joined={joinedTeam === team.teamNumber}
              isFull={team.teamMembers === 4}
              onClick={() => handleJoinTeam(team.teamNumber)}
            />
          ))}
        </div>
      </div>
      <button
        className="fixed bottom-4 right-4 bg-red-500 text-white rounded-lg p-3 shadow-lg border border-red-500 hover:bg-white hover:text-red-500 transition-colors"
        onClick={handleLeaveRoom}
      >
        <span className="font-bold">Leave Room</span>
      </button>
    </div>
  );
};

export default RoomStudent;