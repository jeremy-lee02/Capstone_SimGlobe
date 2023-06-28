import React, { useState } from 'react';
import "../index.css"
import Logo from '../components/Logo';
import Username from '../components/Username';

const HomeStudent: React.FC = () => {
  const handleSinglePlayer = () => {
    
  };

  const handleJoinRoom = () => {
  };

  type Username = {
    name: string;
  }



  return (
    <>
      <Logo/>
      <Username name="Daniel Borer"/>
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