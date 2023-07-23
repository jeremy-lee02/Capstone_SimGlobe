import React, { useState } from 'react';

const selectedBoxStyle = "bg-[#282C35] bg- border border-gray-300 rounded p-2 w-60 max-w-full text-white text-center";
const optionBoxStyle = "dropdown-option bg-gray-700 border border-gray-300 rounded p-2 w-60 max-w-full text-white text-center";

{/*Custom DropBox*/}
const CustomDropdown: React.FC<{ options: string[], selectedValue: string, onSelect: (value: string) => void }> = ({ options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) => option !== selectedValue);

  return (
    <div className="relative">
      <div
        className={selectedBoxStyle}
        onClick={toggleDropdown}
      >
        <div className="selected-option">
          {selectedValue}
        </div>
      </div>
      {isOpen && (
        <div className='absolute' >
          {filteredOptions.map((option) => (
            <div
              key={option}
              className={optionBoxStyle}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const Administrator: React.FC = () => {
  const [selectedPopulation, setSelectedPopulation] = useState('BIG');
  const [selectedGDP, setSelectedGDP] = useState('BIG');

  const populations = ['BIG', 'MEDIUM', 'SMALL'];
  const gdps = ['BIG', 'MEDIUM', 'SMALL'];

  const handlePopulationChange = (value: string) => {
    setSelectedPopulation(value);
  };

  const handleGDPChange = (value: string) => {
    setSelectedGDP(value);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Part */}
      <div className="rounded-t-lg p-4">
        {/* Add any content you want for the top part */}
        <h1 className="text-3xl pl-2 font-semibold text-white">Game Configuration</h1>

        {/* Dropboxes and Labels */}
        <div className="flex justify-center items-center mb-6">
          <div className="mr-8">
            <p className="text-white text-xl text-center font-medium pb-2">Population</p>
            <CustomDropdown
              options={populations}
              selectedValue={selectedPopulation}
              onSelect={handlePopulationChange}
            />
          </div>
          <div>
            <p className="text-white text-xl text-center font-medium pb-2">GDP</p>
            <CustomDropdown
              options={gdps}
              selectedValue={selectedGDP}
              onSelect={handleGDPChange}
            />
          </div>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="flex flex-grow justify-center items-center">
        {/* Add any content you want for the bottom part */}
        <p className="text-white text-lg">Additional content for the Administrator component.</p>
      </div>
    </div>
  );
};

export default Administrator;