import React, { useState, useEffect, useRef} from 'react';
import TeamCard from '../components/TeamCard';
import DeleteIcon from '../components/icons/DeleteIcon';
import "../index.css"
import Logo from '../components/Logo';
import Username from '../components/Username';
// import { doc, getDoc, onSnapshot, query, updateDoc, where, collection } from 'firebase/firestore';
import db from '../firebase';
import { useUpdateRoom } from '../utils/economic';
import { Room } from '../../typing';
import { set } from 'mongoose';

type Team = {
  teamNumber: number;
  teamMembers: number;
};

const RoomHost: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [numberOfTeams, setNumbTeams] = useState(0)
  const handleDeleteRoom = () => {
    // Handle delete room functionality here
  };

 
  const [remainingTime, setRemainingTime] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [remainingTime1, setRemainingTime1] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [isRunning, setIsRunning] = useState(false);
  const rounds = useRef(0);
  const cycles = useRef(8);

    if(isRunning){
      setTimeout(()=>{
        const { days, hours, minutes, seconds } = remainingTime;
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
              if(updatedDays === 0){
                updatedDays = 0
              }else{
                updatedDays -= 1;
              }
              
            }
            if (updatedDays === 0 && updatedHours === 0 && updatedMinutes === 0 && updatedSeconds === 0) {
              updatedDays = parseInt(remainingTime1.days, 10);
              updatedHours = parseInt(remainingTime1.hours, 10);
              updatedMinutes = parseInt(remainingTime1.minutes, 10);
              updatedSeconds = parseInt(remainingTime1.seconds, 10);
              setRemainingTime(
                {
                  days: updatedDays.toString().padStart(2, '0'),
                  hours: updatedHours.toString().padStart(2, '0'),
                  minutes: updatedMinutes.toString().padStart(2, '0'),
                  seconds: updatedSeconds.toString().padStart(2, '0'),
                }
              )
              rounds.current++;
              cycles.current--;
              console.log("Round",rounds)
              setIsRunning(false);
            }
            else {
              setRemainingTime(
                {
                  days: updatedDays.toString().padStart(2, '0'),
                  hours: updatedHours.toString().padStart(2, '0'),
                  minutes: updatedMinutes.toString().padStart(2, '0'),
                  seconds: updatedSeconds.toString().padStart(2, '0'),
                }
              )
            }
            
      },1000)
    }
  const handleNumberChange = (field: string, value: number) => {
    let adjustedValue = value;
  
    if (field === 'days') {
      adjustedValue = Math.min(value, 31);
      adjustedValue = Math.max(adjustedValue, 0);
      setRemainingTime((prevState) => ({
        ...prevState,
        days: adjustedValue.toString().padStart(2, '0'),
      }));
      setRemainingTime1((prevState) => ({
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
      setRemainingTime1((prevState) => ({
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
      setRemainingTime1((prevState) => ({
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
      setRemainingTime1((prevState) => ({
        ...prevState,
        seconds: adjustedValue.toString().padStart(2, '0'),
      }));
    }
  };
  const params = window.location.href;

  // const getTeamList = async () => {
  //   const docRef = doc(db, "rooms", params.split("room=")[1]);
  //   const docSnap = await getDoc(docRef);
  //   if(docSnap.exists()) {
  //     const teamData = docSnap.data();
  //     const newTeams: Team[] = [];
  //     for ( let j = 0; j <  teamData.team.length; j++) {
  //         newTeams.push({ teamNumber: j, teamMembers: teamData.team[j].user.length });
  //     }
  //     setTeams(newTeams)
  //   }
  // }

  // const getTeamMembers = async (roomCode: string, roomSize: number) => {
  //   const newTeams: Team[] = [];
  //   for ( let j = 1; j < roomSize+1; j++) {
  //     const teamRef = doc(db, "teams", roomCode + "-" + j.toString());
  //     const teamSnap = await getDoc(teamRef);
  //     if (teamSnap.exists()) {
  //       const teamData = teamSnap.data();
  //       newTeams.push({ teamNumber: j, teamMembers: teamData.userList.length });
  //     }
  //   }
  //   setTeams(newTeams)
  // }

  // const updateGame = async () => {
  //   const docRef = doc(db, "rooms", params.split("room=")[1]);
  //   const docSnap = await getDoc(docRef);
  //   const gameData = docSnap.data();
  //   if (gameData){
  //     await updateDoc(docRef, {
  //       status: true
  //     })
  //   }
  // }

  // const updateInput = async () => {
  //   const roomRef = doc(db, "rooms", params.split("room=")[1]);
  //   const roomSnap = await getDoc(roomRef);
  //   const roomData = roomSnap.data();
  //   const docRef = doc(db, "rounds", params.split("room=")[1] + "-" + rounds);
  //   const docSnap = await getDoc(docRef);
  //   const gameData = docSnap.data();
  //   let newInput =[]
  //   let roomSize = 0
  //   if (gameData && roomData){
  //     newInput = [...gameData.input]
  //     console.log(rounds + " " +gameData.team, roomData.room_size-1)
  //     const missingTeam = findMissingElements(gameData.team, roomData.room_size);
  //     roomSize = roomData.room_size;
  //     console.log(missingTeam);
  //     for (let i = 0; i < missingTeam.length; i++) {
  //         console.log(roomData.team[missingTeam[i]].country.cluster.input_value + " " + missingTeam[i]);
  //         newInput.push({'input': roomData.team[missingTeam[i]].country.cluster.input_value,
  //                         'team': missingTeam[i]})
  //     }
  //     await updateDoc(docRef, {
  //       input: newInput,
  //     })
  //   }
  //   updateRound();
  //   updateTurn(roomSize)
  // }
  
  // function findMissingElements(arr: any, size: any) {
  //   // Create a set to store the elements in the array
  //   const elementSet = new Set(arr);
  
  //   // Initialize an array to store missing elements
  //   const missingElements = [];
  
  //   // Iterate through numbers from 0 to (size-1)
  //   for (let i = 0; i < size; i++) {
  //     // If the current number is not in the set, it's missing
  //     if (!elementSet.has(i)) {
  //       missingElements.push(i);
  //     }
  //   }
  
  //   // Return the array of missing elements
  //   return missingElements;
  // }

  // const updateRound = async () => {
  //   const docRef = doc(db, "rooms", params.split("room=")[1]);
  //   const docSnap = await getDoc(docRef);
  //   const gameData = docSnap.data();
    
  //   if (gameData && gameData.status < 7){
  //   //todo generate new room here
  //     // console.log(await getRoomValue())
  //     // const required_value_to_updateRoom: any = await getRoomValue()
  //     // const newInputs = required_value_to_updateRoom.input.map((e: { team: any; input: any; }) => {
  //     //   return {
  //     //     name: e.team,
  //     //     input: e.input,
  //     //   }
  //     // })
  //     await getRoomValue()
  //     setNumbTeams(gameData.room_size)
  //     await updateDoc(docRef, {
  //       round: gameData.round + 1
  //     })
  //   }
  // }

  // //todo 
  // const getRoomValue = async () => {
  //   const docRef = doc(db, "rooms", params.split("room=")[1]);
  //   const docSnap = await getDoc(docRef);
  //   const gameData:any = docSnap.data();
  //   let data = {}
  //   if (gameData) {
  //     const inputRef = doc(db, "rounds", params.split("room=")[1] + "-" + gameData.round);
  //     const inputSnap = await getDoc(inputRef);
  //     const inputData = inputSnap.data();
  //     if(inputData) {
  //       const newInputs = inputData.input.map((e: { team: any; input: any; }) => {
  //         return {
  //           name: e.team,
  //           input: e.input,
  //         }

  //       })
        
  //       console.log("New Value: ",useUpdateRoom(gameData, newInputs).team[0].country.cluster.preset_value.initial_consumption)
  //     }
  //   }
  // }

  // const updateTurn = async (teams: number) => {
  //   for (let i = 0; i < teams ; i++) {
  //     const docRef = doc(db, "rooms", params.split("room=")[1]);
  //       const docSnap = await getDoc(docRef);
  //       const teamInputValue = docSnap.data();
  //       if (teamInputValue) {
  //         const oldMap = teamInputValue.team
  //         if (teamInputValue.team[i].turn < teamInputValue.team[i].user.length - 1) {
  //           oldMap[i].turn = oldMap[i].turn + 1;
  //           await updateDoc(docRef, {
  //             team: oldMap
  //           })
  //         } else {
  //           oldMap[i].turn = 0
  //           await updateDoc(docRef, {
  //             team: oldMap
  //           })
  //         }
  //       }
  //   }
  // }

  // useEffect(() => {
  //   //Listening onchanged of teams
  // // Listening onchanged of game round
  //   const realTimeGameStatus = onSnapshot(doc(db, "rooms", params.split("room=")[1]), (doc) => {
  //     getTeamList();
  //   });
  //   return () => {
  //     realTimeGameStatus;
  //     // Clear any active timers when the component unmounts
  //     clearInterval(countdownInterval!);
  //   };
  // }, [countdownInterval]);

  // type Username = {
  //   name: string;
  // }



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
              type="number"
              className="text-4xl font-semibold w-12 text-center bg-transparent border-b border-white outline-none"
              value={remainingTime.days}
              onChange={(e) => handleNumberChange('days', parseInt(e.target.value))}
              
            />
            <span className="text-sm ml-1">Days</span>
          </div>

          <span className="text-4xl mx-2">:</span>

          <div className="flex items-center mx-4">
            <input
              type="number"
              className="text-4xl font-semibold w-12 text-center bg-transparent border-b border-white outline-none"
              value={remainingTime.hours}
              onChange={(e) => handleNumberChange('hours', parseInt(e.target.value))}
            />
            <span className="text-sm ml-1">Hours</span>
          </div>

          <span className="text-4xl mx-2">:</span>

          <div className="flex items-center mx-4">
            <input
              type="number"
              className="text-4xl font-semibold w-12 text-center bg-transparent border-b border-white outline-none"
              value={remainingTime.minutes}
              onChange={(e) => handleNumberChange('minutes', parseInt(e.target.value))}
            />
            <span className="text-sm ml-1">Minutes</span>
          </div>

          <span className="text-4xl mx-2">:</span>

          <div className="flex items-center mx-4">
            <input
              type="number"
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
                  onClick={()=> {
                    setIsRunning(!isRunning);
                  }}
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