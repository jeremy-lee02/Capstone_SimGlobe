import React, { useEffect, useState } from 'react';
import { simGlobe_logo } from '../assets';
import "../index.css";
import gameContext from '../gameContext';
import gameService from '../services/gameService';
import "../index.css"
import Logo from '../components/Logo';
import Username from '../components/Username';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import socketService from '../services/socketService';
import roomService from '../services/teamService';


const HomeStudent: React.FC = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setRoom(e.target.value);
  };

  const handleNameChange = (e: any) => {
    sessionStorage.setItem('users', e.target.value);
    setName(e.target.value)
  }

  const setDeviceID = () => {
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = ' ';
      const charactersLength = characters.length;
      for ( let i = 0; i < 5; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      sessionStorage.setItem("device", result);
  }


  const joinRoom = async () => {
    const socket = socketService.socket;
    if(!room || room.trim() === "" || !socket) {
      return;
    }

    await roomService
      .joinGeneralRoom(socket, room)
      .catch((err) => {
        alert(err)
      });
  }

  const handleJoinRoom = async () => {
		try {
			const url = `http://localhost:9000/api/rooms/join/${room}`;
			const { data: res } = await axios.get(url);
      
      joinRoom();
      navigate(`/join/room=${room}`);
		} catch (error: any) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				toast.error(error.response.data.message)
			}
		}
	};

  useEffect(() => {
    setDeviceID();
  },[])
  return (
    <>
      <Logo/>
      <div className="flex flex-col justify-center items-center background text-white min-h-screen">
        <div className="flex flex-col items-center w-screen gap-5">
          <div className="flex flex-row justify-center space-x-20">
            
            <div className="flex flex-col items-center gap-10 ">
              <h1 className='font-bold text-4xl'>Welcome to SimGlobe</h1>
              <div className="flex flex-col items-center bg-purple-500 text-white font-bold py-4 px-8 rounded-lg">
              <input
                  type="text"
                  placeholder="Enter Name"
                  className="bg-gray-800 text-white py-2 px-4 mb-4 rounded-lg w-full"
                  onChange={handleNameChange}
                  value={name}
                />
                <input
                  type="text"
                  placeholder="Enter Code"
                  className="bg-gray-800 text-white py-2 px-4 mb-4 rounded-lg w-full"
                  onChange={handleChange}
                  value={room}
                />
                <button className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-8 rounded-lg w-full" onClick={handleJoinRoom}>
                  Join Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeStudent;