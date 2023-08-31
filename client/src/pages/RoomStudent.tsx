import React, { useState, useEffect, useContext } from 'react';
import TeamCard from '../components/TeamCard';
import LeaveIcon from '../components/icons/LeaveIcon';
import "../index.css"
import {useNavigate} from 'react-router-dom';

import Username from '../components/Username';
import Logo from '../components/Logo';
import db from '../firebase';
import { doc, getDoc, onSnapshot, query, updateDoc, where, collection } from 'firebase/firestore';

export type Team = {
  teamNumber: number;
  teamMembers: number;
};


const RoomStudent: React.FC = () => {
  const navigate = useNavigate();
  const [joinedTeam, setJoinedTeam] = useState<number | null>(null);

  const handleJoinTeam = (teamNumber: number) => {
    if (teamNumber !== joinedTeam) {
      const updatedTeams = teams.map((team) => {
        if (team.teamNumber === joinedTeam) {
          removeTeam(joinedTeam)
        }
        if (team.teamNumber === teamNumber) {
          updateTeam(teamNumber)
          sessionStorage.setItem('team', teamNumber.toString())
        }
        return team;
      });
      setJoinedTeam(teamNumber);
      setTeams(updatedTeams);
    }
  };

  const [teams, setTeams] = useState<Team[]>([]);
  const params = window.location.href;

  const getTeamList = async () => {
    const roomCode =  params.split("room=")[1];
    const docRef = doc(db, "rooms", params.split("room=")[1]);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      const teamData = docSnap.data();
      getTeamMembers(roomCode, teamData.team.length)
    }
  }

  const getTeamMembers = async (roomCode: string, roomSize: number) => {
    const newTeams: Team[] = [];
    for ( let j = 1; j < roomSize+1; j++) {
      const teamRef = doc(db, "teams", roomCode + "-" + j.toString());
      const teamSnap = await getDoc(teamRef);
      if (teamSnap.exists()) {
        const teamData = teamSnap.data();
        newTeams.push({ teamNumber: j, teamMembers: teamData.userList.length });
      }
    }
    setTeams(newTeams)
  }

  const checkIfGameStart = async () => {
    const docRef = doc(db, "rooms", params.split("room=")[1]);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      const teamData = docSnap.data();
      if (teamData.status) {
        navigate(`/play?room=${params.split("room=")[1]}&team=${sessionStorage.getItem("team")}`)
      }
    }
  }

  //Listening onchanged of teams
  const q = query(collection(db, "teams"), where("roomId", "==", params.split("room=")[1]));
  onSnapshot(q, (doc) => {
    getTeamList();
  })

  // Listening onchanged of game round
  onSnapshot(doc(db, "rooms", params.split("room=")[1]), (doc) => {
    checkIfGameStart()
  });

  const setUserInfo = () => {
    //suppose to get the user from req
    sessionStorage.setItem("users", "Thomas")
  }

  const updateTeam = async (teamNum: any) => {
    const docRef = doc(db, "teams", params.split("room=")[1] + "-" + teamNum);
    const docSnap = await getDoc(docRef);
    const teamData = docSnap.data();
    var userInfo = sessionStorage.getItem("users");
    if (teamData){
      const updatedTeam = [...teamData.userList]
      updatedTeam.push(userInfo)
      await updateDoc(docRef, {
        userList: updatedTeam
      })
    }
  }

  const removeTeam = async (teamNum: any) => {
    const docRef = doc(db, "teams", params.split("room=")[1] + "-" + teamNum);
    const docSnap = await getDoc(docRef);
    const teamData = docSnap.data();
    var userInfo = sessionStorage.getItem("users");
    if (teamData){
      const updatedTeam = [...teamData.userList]
      for ( let i = 0; i < updatedTeam.length; i++) {
        if ( updatedTeam[i] == userInfo) {
          updatedTeam.splice(i,1);
        }
      }
      await updateDoc(docRef, {
        userList: updatedTeam
      })
    }
  }

  const handleLeaveRoom = () => {
    navigate('/homestudent')
  };

  useEffect(() => {
    getTeamList();
    setUserInfo();
  }, []);


  return (
    <>
      <Logo/>
      <Username name="Daniel Borer"/>
      <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen">
        <div className="flex flex-col justify-center items-center flex-grow">
          <h1 className="text-3xl font-bold mb-8">CodeRoom: {params.split("room=")[1]}</h1>
          <div className="max-h-[34rem] ml-4 pr-4 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-700">
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
    </>
  );
};

export default RoomStudent;