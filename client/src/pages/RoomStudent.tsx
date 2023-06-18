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
    { teamNumber: 4, teamMembers: 0 },
  ]);

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between w-full p-4">
        <div className="flex items-center">
          <img src={simGlobe_logo} alt="Logo" width={150} height={60} className="object-contain" />
        </div>
        <h1 className="text-2xl font-bold">Daniel Borer</h1>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">CodeRoom</h2>
        <div className="grid grid-cols-2 gap-4">
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
  );
};

export default RoomStudent;