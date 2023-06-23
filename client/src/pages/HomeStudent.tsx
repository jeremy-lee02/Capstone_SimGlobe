import React from 'react';
import { simGlobe_logo } from '../assets';
import "../index.css"

const HomeStudent: React.FC = () => {
  const handleSinglePlayer = () => {
    
  };

  const handleJoinRoom = () => {
    
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between w-full p-4">
        <div className="flex items-center">
          <img src={simGlobe_logo} alt="Logo" width={150} height={60} className="object-contain" />
        </div>
      </div>
      <div className="flex flex-col items-center w-screen">
        <h1 className="text-4xl font-bold mt-16">
          <span className="text-gray-500">Welcome,</span>
        </h1>
        <h2 className="text-5xl font-bold mb-8">Daniel Borer</h2>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center bg-blue-500 text-white font-bold py-4 px-8 rounded-lg">
            <button className="flex items-center justify-center w-full h-full" onClick={handleSinglePlayer}>
              Single Player
            </button>
          </div>
          <div className="flex flex-col items-center bg-purple-500 text-white font-bold py-4 px-8 rounded-lg">
            <input
              type="text"
              placeholder="Enter Code"
              className="bg-gray-800 text-white py-2 px-4 mb-4 rounded-lg w-full"
            />
            <button className="bg-purple-700 text-white font-bold py-2 px-8 rounded-lg w-full" onClick={handleJoinRoom}>
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStudent;