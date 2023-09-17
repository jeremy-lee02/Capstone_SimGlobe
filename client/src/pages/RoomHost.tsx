import React, { useState, useEffect, useRef} from 'react';
import TeamCard from '../components/TeamCard';
import DeleteIcon from '../components/icons/DeleteIcon';
import "../index.css"
import Logo from '../components/Logo';
import Username from '../components/Username';
import { doc, getDoc, onSnapshot, query, updateDoc, where, collection, setDoc } from 'firebase/firestore';
import db from '../firebase';
import { updateCountry } from '../utils/economic';
import { Team } from '../../typing';
import toast from 'react-hot-toast';

type TeamLocal = {
  teamNumber: number;
  teamMembers: number;
};

const RoomHost: React.FC = () => {
  const [teams, setTeams] = useState<TeamLocal[]>([]);
  const [updatedTeam, setUpdatedTeam] = useState<Team[]>([]);
  const handleDeleteRoom = () => {
    // Handle delete room functionality here
  };

  const initialRemainingTime = { days: '00', hours: '00', minutes: '00', seconds: '00' };
  const [remainingTime, setRemainingTime] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState(false); // Set to false initially
  const [cyclesRemaining, setCyclesRemaining] = useState(7);
  const [rounds, setRounds] = useState(1);
  // Function to handle number changes
  const handleNumberChange = (field: string, value: number) => {
    let adjustedValue = value;
  
    if (field === 'days') {
      adjustedValue = Math.min(value, 31);
      adjustedValue = Math.max(adjustedValue, 0);
      setRemainingTime((prevState) => ({
        ...prevState,
        days: adjustedValue.toString().padStart(2, '0'),
      }));
  

    } else if (field === 'hours') {
      adjustedValue = Math.min(value, 24);
      adjustedValue = Math.max(adjustedValue, 0);
      setRemainingTime((prevState) => ({
        ...prevState,
        hours: adjustedValue.toString().padStart(2, '0'),
      }));
      
    } else if (field === 'minutes') {
      adjustedValue = Math.min(value, 60);
      adjustedValue = Math.max(adjustedValue, 0);
      setRemainingTime((prevState) => ({
        ...prevState,
        minutes: adjustedValue.toString().padStart(2, '0'),
      }));
      
    
    } else if (field === 'seconds') {
      adjustedValue = Math.min(value, 60);
      adjustedValue = Math.max(adjustedValue, 0);
      setRemainingTime((prevState) => ({
        ...prevState,
        seconds: adjustedValue.toString().padStart(2, '0'),
      }));
    }
  };

  // Function to start the countdown
  const startCountdown = () => {
    toast("Starting round "+ rounds);
    const initialCountdownValues = {
      days: remainingTime.days,
      hours: remainingTime.hours,
      minutes: remainingTime.minutes,
      seconds: remainingTime.seconds,
    };
    setIsRunning(true); // Set the countdown to running
    // Calculate the total time in seconds
    let totalSeconds =
      parseInt(remainingTime.days) * 24 * 60 * 60 +
      parseInt(remainingTime.hours) * 60 * 60 +
      parseInt(remainingTime.minutes) * 60 +
      parseInt(remainingTime.seconds);

    // Create a countdown timer
    const interval = setInterval(() => {
      if (totalSeconds > 0) {
        // Update the remaining time
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        setRemainingTime({
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0'),
        });

        totalSeconds -= 1;
      } else {
        setRemainingTime(initialRemainingTime);
        clearInterval(interval); // Clear the interval when the countdown reaches 0
        setIsRunning(false); // Set the countdown to not running
        // Reduce the remaining cycles and check if there are more to go
        setCyclesRemaining((cycles) => cycles - 1);
        setRounds((rounds)=> rounds + 1);
        updateInput();
        if (cyclesRemaining > 0) {
            toast("Cooldown starts!");
            toast.success("Finish round " + rounds);
            
            
          // Set a 10-second cooldown and start the next cycle
          setTimeout(() => {
            setRemainingTime(initialCountdownValues);
            setIsRunning(true);
          }, 10000);
        } else {
          // All cycles are completed
          toast("Game Over!");
          toast("All rounds has finished!");
          
        }
      }
    }, 1000);

    setCountdownInterval(interval);
  };

  // Function to stop the countdown
  const stopCountdown = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    setIsRunning(false);
  };



  const params = window.location.href;

  const getTeamList = async () => {
    const docRef = doc(db, "rooms", params.split("room=")[1]);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      const teamData = docSnap.data();
      const newTeams: TeamLocal[] = [];
      for ( let j = 0; j <  teamData.team.length; j++) {
          newTeams.push({ teamNumber: j, teamMembers: teamData.team[j].user.length });
      }
      setTeams(newTeams)
    }
  }

  const updateGame = async () => {
    const docRef = doc(db, "rooms", params.split("room=")[1]);
    const docSnap = await getDoc(docRef);
    const gameData = docSnap.data();
    if (gameData){
      await updateDoc(docRef, {
        status: true
      })
    }
  }

  const updateInput = async () => {
    const roomRef = doc(db, "rooms", params.split("room=")[1]);
    const roomSnap = await getDoc(roomRef);
    const roomData = roomSnap.data();
    const docRef = doc(db, "rounds", params.split("room=")[1] + "-" + rounds);
    const docSnap = await getDoc(docRef);
    const gameData = docSnap.data();
    let newInput =[]
    let roomSize = 0
    if (gameData && roomData){
      newInput = [...gameData.input]
      console.log(rounds + " " +gameData.team, roomData.room_size-1)
      const missingTeam = findMissingElements(gameData.team, roomData.room_size);
      roomSize = roomData.room_size;
      console.log(missingTeam);
      for (let i = 0; i < missingTeam.length; i++) {
          console.log(roomData.team[missingTeam[i]].country.cluster.input_value + " " + missingTeam[i]);
          newInput.push({'input': roomData.team[missingTeam[i]].country.cluster.input_value,
                          'team': missingTeam[i]})
      }
      await updateDoc(docRef, {
        input: newInput,
      })
    }
    updateRound();
    updateTurn(roomSize)
  }
  
  function findMissingElements(arr: any, size: any) {
    // Create a set to store the elements in the array
    const elementSet = new Set(arr);
  
    // Initialize an array to store missing elements
    const missingElements = [];
  
    // Iterate through numbers from 0 to (size-1)
    for (let i = 0; i < size; i++) {
      // If the current number is not in the set, it's missing
      if (!elementSet.has(i)) {
        missingElements.push(i);
      }
    }
  
    // Return the array of missing elements
    return missingElements;
  }

  const updateRound = async () => {
    const docRef = doc(db, "rooms", params.split("room=")[1]);
    const docSnap:any = await getDoc(docRef);
    const gameData = docSnap.data();
    if (gameData && gameData.status < 7){
      //todo generate new room here
      const newInputs = await getRoomValue(docSnap.data())
      const value = updateCountry(gameData, newInputs);
      //console log update team value + score
      console.log(`Updated team value: ${value.team}`)
      console.log(`Updated team score: ${value.team[0].score}`)
      setTimeout( async ()=> {
        await setDoc(doc(db, "rooms", params.split("room=")[1]), value);
      }, 1000)
      setTimeout( async() => {
        await updateDoc(docRef, {
          round: gameData.round + 1,
        })
      }, 1000)
    }
  }

  //todo 
  const getRoomValue = async (gameData: any) => {
    const inputRef = doc(db, "rounds", params.split("room=")[1] + "-" + gameData.round);
    const inputSnap = await getDoc(inputRef);
    const inputData = inputSnap.data();
    if(inputData) {
      const newInputs = inputData.input.map((e: { team: any; input: any; }) => {
        return {
          name: e.team,
          input: e.input,
        }
      })
      return newInputs
    }
  }

  const updateTurn = async (teams: number) => {
    for (let i = 0; i < teams ; i++) {
      const docRef = doc(db, "rooms", params.split("room=")[1]);
        const docSnap = await getDoc(docRef);
        const teamInputValue = docSnap.data();
        if (teamInputValue) {
          const oldMap = teamInputValue.team
          if (teamInputValue.team[i].turn < teamInputValue.team[i].user.length - 1) {
            oldMap[i].turn = oldMap[i].turn + 1;
            await updateDoc(docRef, {
              team: oldMap
            })
          } else {
            oldMap[i].turn = 0
            await updateDoc(docRef, {
              team: oldMap
            })
          }
        }
    }
  }

  useEffect(() => {
    //Listening onchanged of teams
  // Listening onchanged of game round
    const realTimeGameStatus = onSnapshot(doc(db, "rooms", params.split("room=")[1]), (doc) => {
      getTeamList();
    });
    return () => {
      realTimeGameStatus;
      // Clear any active timers when the component unmounts

    };
  });

    // Start the countdown when isRunning becomes true
    useEffect(() => {
      if (isRunning) {
        startCountdown();
      } else {
        stopCountdown();
      }
    }, [isRunning]);
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
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8">CodeRoom: {params.split("room=")[1]}</h1>
          <div className="grid grid-cols-2 ml-4 gap-10 max-h-96 pr-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-700">
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
                  onClick={() => {
                    updateGame();
                    setIsRunning(prev => !prev)}}
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