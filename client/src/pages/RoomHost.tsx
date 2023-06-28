import React, { useState, useEffect} from 'react';
import TeamCard from '../components/TeamCard';
import DeleteIcon from '../components/DeleteIcon';
import "../index.css"
import Logo from '../components/Logo';
import Username from '../components/Username';

type Team = {
  teamNumber: number;
  teamMembers: number;
};

const RoomHost: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([
    { teamNumber: 1, teamMembers: 3 },
    { teamNumber: 2, teamMembers: 4 },
    { teamNumber: 3, teamMembers: 1 },
    { teamNumber: 4, teamMembers: 2 },
    { teamNumber: 5, teamMembers: 0 },
    { teamNumber: 6, teamMembers: 4 },
    { teamNumber: 7, teamMembers: 3 },
    { teamNumber: 8, teamMembers: 0 },
    { teamNumber: 9, teamMembers: 0 },
    { teamNumber: 10, teamMembers: 0 },
    { teamNumber: 1, teamMembers: 3 },
    { teamNumber: 2, teamMembers: 4 },
    { teamNumber: 3, teamMembers: 1 },
    { teamNumber: 4, teamMembers: 2 },
    { teamNumber: 5, teamMembers: 0 },
    { teamNumber: 6, teamMembers: 4 },
    { teamNumber: 7, teamMembers: 3 },
    { teamNumber: 8, teamMembers: 0 },
    { teamNumber: 9, teamMembers: 0 },
    { teamNumber: 10, teamMembers: 0 },
  ]);

  const handleDeleteRoom = () => {
    // Handle delete room functionality here
  };

 
  const [remainingTime, setRemainingTime] = useState({ days: '02', hours: '00', minutes: '00', seconds: '00' });
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timeout | null>(null);

  const handleStartGame = () => {
    if (countdownInterval === null) {
      setCountdownInterval(
        setInterval(() => {
          setRemainingTime((prevState) => {
            const { days, hours, minutes, seconds } = prevState;
  
            let updatedSeconds = parseInt(seconds, 10) - 1;
            let updatedMinutes = parseInt(minutes, 10);
            let updatedHours = parseInt(hours, 10);
            let updatedDays = parseInt(days, 10);
  
            if (updatedSeconds < 0) {
              updatedSeconds = 59;
              updatedMinutes -= 1;
            }
            if (updatedMinutes < 0) {
              updatedMinutes = 59;
              updatedHours -= 1;
            }
            if (updatedHours < 0) {
              updatedHours = 23;
              updatedDays -= 1;
            }
  
            return {
              days: updatedDays.toString().padStart(2, '0'),
              hours: updatedHours.toString().padStart(2, '0'),
              minutes: updatedMinutes.toString().padStart(2, '0'),
              seconds: updatedSeconds.toString().padStart(2, '0'),
            };
          });
        }, 1000)
      );
    }
  };

  const handleNumberChange = (field: string, value: number) => {
    let adjustedValue = value;
  
    if (field === 'days') {
      adjustedValue = Math.min(value, 31);
    } else if (field === 'hours') {
      adjustedValue = Math.min(value, 24);
    } else {
      adjustedValue = Math.min(value, 60);
    }
  
    adjustedValue = Math.max(adjustedValue, 0);
  
    setRemainingTime((prevState) => ({
      ...prevState,
      [field]: adjustedValue.toString().padStart(2, '0'),
    }));
  };

  useEffect(() => {
    return () => {
      // Clear any active timers when the component unmounts
      clearInterval(countdownInterval!);
    };
  }, [countdownInterval]);

  type Username = {
    name: string;
  }



  return (
    <>
      {/* HEADER */}
      <Logo/>
      <Username name="Daniel Borer"/>
      <div className="flex flex-col justify-center items-center bg-gray-900 text-white min-h-screen">

        {/* TEAMS */}
        <div className="flex flex-col items-center ">
          <h1 className="text-3xl font-bold mb-8">CodeRoom: HELLOWORLD</h1>
          <div className="grid grid-cols-2 gap-10 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-700">
            {teams.map((team) => (
              <TeamCard
                key={team.teamNumber}
                teamNumber={team.teamNumber}
                teamMembers={team.teamMembers}
                isFull={team.teamMembers === 4}
                joined = {false}
              />
            ))}
          </div>
        </div>

        {/* COUNTDOWN */}
        <div className="flex items-center justify-center mt-8 mb-5 ">
          <div className="flex items-center mx-4">
            <input
              type="text"
              inputMode="numeric"
              className="text-4xl font-semibold w-12 text-center bg-transparent border-b border-white outline-none"
              value={remainingTime.days}
              onChange={(e) => handleNumberChange('days', parseInt(e.target.value))}
              
            />
            <span className="text-sm ml-1">Days</span>
          </div>

          <span className="text-4xl mx-2">:</span>

          <div className="flex items-center mx-4">
            <input
              type="text"
              inputMode="numeric"
              className="text-4xl font-semibold w-12 text-center bg-transparent border-b border-white outline-none"
              value={remainingTime.hours}
              onChange={(e) => handleNumberChange('hours', parseInt(e.target.value))}
            />
            <span className="text-sm ml-1">Hours</span>
          </div>

          <span className="text-4xl mx-2">:</span>

          <div className="flex items-center mx-4">
            <input
              type="text"
              inputMode="numeric"
              className="text-4xl font-semibold w-12 text-center bg-transparent border-b border-white outline-none"
              value={remainingTime.minutes}
              onChange={(e) => handleNumberChange('minutes', parseInt(e.target.value))}
            />
            <span className="text-sm ml-1">Minutes</span>
          </div>

          <span className="text-4xl mx-2">:</span>

          <div className="flex items-center mx-4">
            <input
              type="text"
              inputMode="numeric"
              className="text-4xl font-semibold w-12 text-center bg-transparent border-b border-white outline-none"
              value={remainingTime.seconds}
              onChange={(e) => handleNumberChange('seconds', parseInt(e.target.value))}
            />
            <span className="text-sm ml-1">Seconds</span>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="flex items-center mt-4">
              <button
                  className="bg-green-500 text-white rounded-lg p-3 shadow-lg border border-green-500 hover:bg-white hover:text-green-500 transition-colors"
                  onClick={handleStartGame}
              >
                  <span className="font-bold">Start Game</span>
              </button>

              <button
                  className="fixed bottom-4 right-4 bg-red-500 text-white rounded-lg p-3 shadow-lg border border-red-500 hover:bg-white hover:text-red-500 transition-colors ml-4"
                  onClick={handleDeleteRoom}
              >
                  <div className="flex items-center">
                  <DeleteIcon className="w-4 h-4 fill-current mr-2" />
                  <span className="font-bold">Delete Room</span>
                  </div>
              </button>
          </div>
      </div>
    </>
  );
};

export default RoomHost;