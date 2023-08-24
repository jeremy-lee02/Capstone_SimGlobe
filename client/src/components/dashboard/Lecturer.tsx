import React, { useState } from 'react';
import RoomSetting from './RoomSetting'; // Import the RoomSetting component
import PresetData from './PresetData'; // Import the PresetData component

const Lecturer: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('roomSetting'); // Default to 'roomSetting'

  const renderSelectedOption = () => {
    if (selectedOption === 'roomSetting') {
      return <RoomSetting />;
    } else if (selectedOption === 'presetData') {
      return <PresetData />;
    } else {
      return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Option Selection */}
      <div className="flex justify-center items-center mb-6">
        <button
          className={`text-white font-semibold mx-2 ${
            selectedOption === 'roomSetting' ? 'text-orange-500' : ''
          }`}
          onClick={() => setSelectedOption('roomSetting')}
        >
          Room Setting
        </button>
        <button
          className={`text-white font-semibold mx-2 ${
            selectedOption === 'presetData' ? 'text-orange-500' : ''
          }`}
          onClick={() => setSelectedOption('presetData')}
        >
          Preset Data
        </button>
      </div>

      {/* Render Selected Option */}
      {renderSelectedOption()}

      {/* Other content or components */}
    </div>
  );
};

export default Lecturer;