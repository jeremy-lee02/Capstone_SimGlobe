import React, { useState, useEffect } from 'react';
import {ClusterScore} from "../../../typing"

import DropboxArrowIcon from '../icons/DropboxArrowIcon';
import { score1, score2, score3, score4, score5, score6, score7, score8, score9 } from '../../utils/score';

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
          <DropboxArrowIcon className="w-10 h-10 fill-current text-white absolute top-1/2 right-1 transform -translate-y-1/2 pointer-events-none" />
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
const Rules2: React.FC = () => {
    const [selectedPopulation, setSelectedPopulation] = useState('SMALL');
    const [selectedGDP, setSelectedGDP] = useState('SMALL');
    const populations = ['BIG', 'MEDIUM', 'SMALL'];
    const gdps = ['BIG', 'MEDIUM', 'SMALL'];
    const handlePopulationChange = (value: string) => {
        setSelectedPopulation(value);
      };
    
      const handleGDPChange = (value: string) => {
        setSelectedGDP(value);
      };

      const getSelectedScore = (selectedGDP: string, selectedPopulation: string): ClusterScore => {
        switch (`${selectedGDP}_${selectedPopulation}`) {
          case 'SMALL_SMALL':
            return score1;
          case 'SMALL_MEDIUM':
            return score2;
          case 'SMALL_BIG':
            return score3;
          case 'MEDIUM_SMALL':
            return score4;
          case 'MEDIUM_MEDIUM':
            return score5;
          case 'MEDIUM_BIG':
            return score6;
          case 'BIG_SMALL':
            return score7;
          case 'BIG_MEDIUM':
            return score8;
          case 'BIG_BIG':
            return score9;
          default:
            // Return a default score or handle the case if needed
            return score1;
        }
      };
      const SelectedValueInfo: React.FC<{ selectedPopulation: string, selectedGDP: string }> = ({ selectedPopulation, selectedGDP }) => {
        const selectedScore = getSelectedScore(selectedPopulation, selectedGDP); // Define this function to return the appropriate score based on selected values
        const combinationName = `${selectedGDP.toLowerCase()}GDP_${selectedPopulation.toLowerCase()}Pop`;
        const selectedInfo = {
            combinationName,
            selectedScore,
          };
        // Log the selected info object to the console
        console.log('Selected Info:', selectedInfo);

        return (
            <div className="mt-6">
            {/* Display information in the component */}
            </div>
        );
        };
    return(
        <div className='flex flex-col justify-center h-full bg-gray-900'>
            <div className="rounded-t-lg p-4">
                <h1 className="text-3xl pl-2 font-semibold text-white">Room Setting</h1>
            </div>

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
            {/* Display Selected Score Object */}
        <SelectedValueInfo selectedPopulation={selectedPopulation} selectedGDP={selectedGDP} />
        </div>
    );

}

export default Rules2;