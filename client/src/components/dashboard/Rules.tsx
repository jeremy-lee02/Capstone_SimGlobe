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

interface FactorInputProps {
    name: string;
    factor: keyof ClusterScore;
    selectedScore: ClusterScore;
    modifiedSelectedScore: ClusterScore | null;
    setModifiedSelectedScore: React.Dispatch<React.SetStateAction<ClusterScore | null>>;
    hasSecondMin?: boolean;
  }

const Rules: React.FC<{ onMoveToNumberofTeam: () => void }> = ({ onMoveToNumberofTeam }) => {
    const [selectedPopulation, setSelectedPopulation] = useState('SMALL');
    const [selectedGDP, setSelectedGDP] = useState('SMALL');
    const populations = ['BIG', 'MEDIUM', 'SMALL'];
    const gdps = ['BIG', 'MEDIUM', 'SMALL'];
    const [selectedScore, setSelectedScore] = useState<ClusterScore | null>(null);
    const [modifiedSelectedScore, setModifiedSelectedScore] = useState<ClusterScore | null>(null);
    
    useEffect(() => {
        const newSelectedScore = getSelectedScore(selectedGDP, selectedPopulation);
        setSelectedScore(newSelectedScore);
        setModifiedSelectedScore(null); // Clear modifiedSelectedScore when combination changes
      }, [selectedGDP, selectedPopulation]);
    
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
    const FactorInput: React.FC<FactorInputProps> = ({ name, selectedScore, factor, hasSecondMin }) => {
      const factorData = selectedScore[factor];
      const hasSecondMinInput = hasSecondMin && factor === 'inflation';
      return (
        <>
          <div className="flex items-center justify-between mr-20">
            <h3 className="text-white ml-10">{name}</h3>
            <div className='flex flex-row'>
              {hasSecondMinInput && 'second_min' in factorData && (
                <div className="flex items-center mr-20">
                  <label className="text-white mr-2 ml-3">2nd Min:</label>
                  <input
                    type="text"
                    id={`${factor}-second-min`}
                    inputMode='numeric'
                    className="w-14 text-center p-1 bg-gray-800 text-white rounded"
                    defaultValue={factorData.second_min}
                  />
                </div>
              )}
              <div className="flex items-center mr-10">
                <label className="text-white mr-2">Min:</label>
                <input
                  type="text"
                  id={`${factor}-min`}
                  inputMode='numeric'
                  className="w-14 text-center p-1 bg-gray-800 text-white rounded"
                  defaultValue={factorData.min}
                />
              </div>
      
              <div className="flex items-center">
                <label className="text-white mr-2 ml-3">Max:</label>
                <input
                  type="text"
                  id={`${factor}-max`}
                  inputMode='numeric'
                  className="w-14 text-center p-1 bg-gray-800 text-white rounded"
                  defaultValue={factorData.max}
                />
              </div>
            </div>
          </div>
          <hr className="h-px bg-gray-200 border-0 mx-10 "></hr>
        </>
      );
    };

      const handleSave = () => {
        const newSelectedScore: ClusterScore = {
          gdp: {
            min: parseFloat((document.getElementById('gdp-min') as HTMLInputElement).value),
            max: parseFloat((document.getElementById('gdp-max') as HTMLInputElement).value),
          },
          unemployment: {
            min: parseFloat((document.getElementById('unemployment-min') as HTMLInputElement).value),
            max: parseFloat((document.getElementById('unemployment-max') as HTMLInputElement).value),
          },
          inflation: {
            min: parseFloat((document.getElementById('inflation-min') as HTMLInputElement).value),
            max: parseFloat((document.getElementById('inflation-max') as HTMLInputElement).value),
            second_min: parseFloat((document.getElementById('inflation-second-min') as HTMLInputElement).value),
          },
          budget_surplus: {
            min: parseFloat((document.getElementById('budget-surplus-min') as HTMLInputElement).value),
            max: parseFloat((document.getElementById('budget-surplus-max') as HTMLInputElement).value),
          },
        };
    
        setModifiedSelectedScore(newSelectedScore);
      };  
    return(
        <div className='flex flex-col justify-center h-full bg-gray-900'>
            <div className="rounded-t-lg p-4">
                <h1 className="text-3xl pl-2 font-semibold text-white">Score Determinants</h1>
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
            <div className="flex flex-col gap-6 mt-6 ml-10">
                <h2 className="text-xl font-semibold text-white">Input Fields</h2>
                <div className="flex flex-col gap-4">
                    <FactorInput name="Real GDP %" factor="gdp" selectedScore={selectedScore|| score1} modifiedSelectedScore={modifiedSelectedScore} setModifiedSelectedScore={setModifiedSelectedScore} />
                    <FactorInput name="Unemployment Rate %" factor="unemployment" selectedScore={selectedScore|| score1} modifiedSelectedScore={modifiedSelectedScore} setModifiedSelectedScore={setModifiedSelectedScore} />
                    <FactorInput name="Inflation Rate %" factor="inflation" selectedScore={selectedScore|| score1} modifiedSelectedScore={modifiedSelectedScore} setModifiedSelectedScore={setModifiedSelectedScore} hasSecondMin />
                    <FactorInput name="Budget Surplus (Deficit) %" factor="budget_surplus" selectedScore={selectedScore|| score1} modifiedSelectedScore={modifiedSelectedScore} setModifiedSelectedScore={setModifiedSelectedScore} />
                </div>
            </div>
            <div className='flex justify-end pt-10 mr-5'>
              <div className="">
                  <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                      onClick={onMoveToNumberofTeam}
                  >
                      Next
                  </button>
              </div>
            </div>
        </div>
    );

}

export default Rules;