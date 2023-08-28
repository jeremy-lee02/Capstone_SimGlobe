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

interface RoomSettingItem {
  label: string;
  minValue: number;
  maxValue: number;
  secondMinValue?: number; // Only for "Inflation Rate %"
}

const Rules: React.FC<{ onMoveToPreset: () => void }> = ({ onMoveToPreset }) => {
  const [selectedPopulation, setSelectedPopulation] = useState('SMALL');
  const [selectedGDP, setSelectedGDP] = useState('SMALL');
  const [name, setName] = useState("small_small")
  const populations = ['BIG', 'MEDIUM', 'SMALL'];
  const gdps = ['BIG', 'MEDIUM', 'SMALL'];


  const handlePopulationChange = (value: string) => {
    setSelectedPopulation(value);
  };

  const handleGDPChange = (value: string) => {
    setSelectedGDP(value);
  };

  const [values, setValues] = useState<RoomSettingItem[]>([
    {
      label: 'Real GDP %',
      minValue: 10,
      maxValue: 100,
    },
    {
      label: 'Unemployment Rate %',
      minValue: 10,
      maxValue: 100,
    },
    {
      label: 'Inflation Rate %',
      minValue: 10,
      maxValue: 100,
      secondMinValue: 1,
    },
    {
      label: 'Budget Surplus (Deficit) %',
      minValue: 10,
      maxValue: 100,
    },
  ]);

  const handleChangeValue = (
    index: number,
    field: 'minValue' | 'maxValue' | 'secondMinValue',
    newValue: number
  ) => {
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index][field] = newValue;
      return updatedValues;
    });
  };
  const mapLabelToClusterScoreKey = (label: string): keyof ClusterScore | null => {
    switch (label) {
      case 'Real GDP %':
        return 'gdp';
      case 'Unemployment Rate %':
        return 'unemployment';
      case 'Inflation Rate %':
        return 'inflation';
      case 'Budget Surplus (Deficit) %':
        return 'budget_surplus';
      default:
        return null;
    }
  };

  const handleNextbutton = () => {
    const roomSettingsObject: ClusterScore = values.reduce((acc, item) => {
      const key = mapLabelToClusterScoreKey(item.label);
      if (key !== null) {
        switch (key) {
          case 'gdp':
            acc[key] = {
              min: item.minValue,
              max: item.maxValue,
            };
            break;
          case 'unemployment':
            acc[key] = {
              min: item.minValue,
              max: item.maxValue,
            };
            break;
          case 'inflation':
            acc[key] = {
              min: item.minValue,
              second_min: item.secondMinValue || 0,
              max: item.maxValue,
            };
            break;
          case 'budget_surplus':
            acc[key] = {
              min: item.minValue,
              max: item.maxValue,
            };
            break;
          default:
            break;
        }
      }
  
      return acc;
    }, {} as ClusterScore);
    
    console.log('Room Settings:', roomSettingsObject);
  };

  
  return (
    <div className='flex flex-col justify-center h-full'>
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
      <div className="flex flex-col p-4">
        {values.map((item, index) => (
          <>
          <div key={index} className="flex items-center 2xl:m-12 m-6">
            <p className="text-white w-60">{item.label}</p>
            {item.secondMinValue !== undefined && (
                <div className="flex items-center mr-20">
                  <label className="text-white mr-2 ml-3">2nd Min:</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={item.secondMinValue}
                    onChange={(e) => handleChangeValue(index, 'secondMinValue', Number(e.target.value))}
                    className="w-14 text-center p-1 bg-gray-800 text-white rounded"
                  />
                </div>
              )}
              {item.secondMinValue === undefined && (
                <div className="w-[220px]">
                  
                </div>
              )}
              <div className="flex items-center mr-10">
                <label className="text-white mr-2">Min:</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={item.minValue}
                  onChange={(e) => handleChangeValue(index, 'minValue', Number(e.target.value))}
                  className="w-14 text-center p-1 bg-gray-800 text-white rounded"
                />
              </div>
              
              <div className="flex items-center">
                <label className="text-white mr-2 ml-3">Max:</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={item.maxValue}
                  onChange={(e) => handleChangeValue(index, 'maxValue', Number(e.target.value))}
                  className="w-14 text-center p-1 bg-gray-800 text-white rounded"
                />
              </div>
          </div>
          <hr className="h-px bg-gray-200 border-0 mx-10 "></hr>
          </>
        ))}
      </div>
      <div className="flex justify-end mr-10">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onMoveToPreset}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Rules;