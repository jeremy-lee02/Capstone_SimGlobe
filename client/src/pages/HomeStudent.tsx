import React, { useState } from 'react';
import "../index.css"
import Logo from '../components/Logo';
import Username from '../components/Username';
import { useNavigate } from 'react-router-dom';


const HomeStudent: React.FC = () => {
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    navigate('/room')
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
              <h1 className='font-bold text-4xl'>Welcome to SimGlobe</h1>
              <div className="flex flex-col items-center bg-purple-500 text-white font-bold py-4 px-8 rounded-lg">
              <input
                  type="text"
                  placeholder="Enter Name"
                  className="bg-gray-800 text-white py-2 px-4 mb-4 rounded-lg w-full"
                />
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