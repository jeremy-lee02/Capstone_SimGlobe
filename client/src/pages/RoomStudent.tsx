import React, { useState } from 'react';
import { simGlobe_logo } from '../assets';
import TeamCard from '../components/TeamCard';
import LeaveIcon from '../components/LeaveIcon';
import "../index.css"
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
    { teamNumber: 10, teamMembers: 0 },
    { teamNumber: 11, teamMembers: 3 },
    { teamNumber: 12, teamMembers: 0 },
    { teamNumber: 13, teamMembers: 0 },
    { teamNumber: 14, teamMembers: 4 },
    { teamNumber: 15, teamMembers: 0 },
    { teamNumber: 16, teamMembers: 0 },
    { teamNumber: 17, teamMembers: 4 },
    { teamNumber: 18, teamMembers: 0 },
    { teamNumber: 19, teamMembers: 0 },
    { teamNumber: 20, teamMembers: 0 },
    { teamNumber: 21, teamMembers: 3 },
    { teamNumber: 22, teamMembers: 0 },
    { teamNumber: 23, teamMembers: 0 },
    { teamNumber: 24, teamMembers: 4 },
    { teamNumber: 25, teamMembers: 0 },
    { teamNumber: 26, teamMembers: 0 },
    { teamNumber: 27, teamMembers: 4 },
    { teamNumber: 28, teamMembers: 0 },
    { teamNumber: 29, teamMembers: 0 },
  ]);

  const handleLeaveRoom = () => {
    
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
        <div className="max-h-[34rem] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-700">
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
      </div>
      <button
        className="fixed bottom-4 right-4 bg-red-500 text-white rounded-lg p-3 shadow-lg border border-red-500 hover:bg-white hover:text-red-500 transition-colors"
        onClick={handleLeaveRoom}
      >
        <div className="flex items-center">
          <LeaveIcon className="w-4 h-4 fill-current mr-2" />
          <span className="font-bold">Leave Room</span>
        </div>
      </button>
    </div>
  );
};

export default RoomStudent;