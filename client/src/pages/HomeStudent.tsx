import React, { useContext, useState } from 'react';
import { simGlobe_logo } from '../assets';
import "../index.css";
import gameContext from '../gameContext';
import gameService from '../services/gameService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import socketService from '../services/socketService';
import roomService from '../services/teamService';


const HomeStudent: React.FC = () => {
  const {setInRoom, isInRoom} = useContext(gameContext);
  const [room, setRoom] = useState('');

  const handleChange = event => {
    setRoom(event.target.value);
  };

  const navigate = useNavigate();
  const handleSinglePlayer = () => {
  };
  
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
      navigate(`/join/${room}`);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				toast.error(error.response.data.message)
			}
		}
	};

  return (
    <>
      <img src={simGlobe_logo} alt="Logo" width={150} height={60} className="object-contain absolute left-6 top-6" />
      <h1 className=" flex flex-col font-bold absolute right-6 top-6">
          <span className="text-gray-500 text-xl">Welcome,</span> 
          <span className="text-2xl text-white">Daniel Borer</span>
      </h1>

      <div className="flex flex-col justify-center items-center background text-white min-h-screen">
        <div className="flex flex-col items-center w-screen gap-5">
          <div className="flex flex-row justify-center space-x-20">
            <div className="flex flex-col items-center gap-10 ">
              <h1 className='font-bold text-4xl'>Single player</h1>
                <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 py-[50px] px-[132px] rounded-lg text-xl text-white font-bold" onClick={handleSinglePlayer}>
                  Play
                </button>
            </div>
            <div className="flex flex-col items-center gap-10 ">
              <h1 className='font-bold text-4xl'>Multiplayer</h1>
              <div className="flex flex-col items-center bg-purple-500 text-white font-bold py-4 px-8 rounded-lg">
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