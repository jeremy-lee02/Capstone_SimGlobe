import React, { useEffect, useState } from 'react'
import DropboxArrowIcon from '../icons/DropboxArrowIcon';
import { ClusterScore } from '../../../typing';
import { score1, score2, score3, score4, score5, score6, score7, score8, score9 } from '../../utils/score';
import InputRules from './RulesInput/InputRules';

type Props = {
    onMoveToNumberofTeam: () => void
}


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

const GameRules = ({onMoveToNumberofTeam}: Props) => {
    const [selectedPopulation, setSelectedPopulation] = useState('SMALL');
    const [selectedGDP, setSelectedGDP] = useState('SMALL');
    const populations = ['BIG', 'MEDIUM', 'SMALL'];
    const gdps = ['BIG', 'MEDIUM', 'SMALL'];
    const [name, setName] = useState('small_small')
    const [scoreMap, setScoreMap] = useState<{ [key: string]: ClusterScore }>({
        small_small: score1,
        small_medium: score2,
        small_big: score3,
        medium_small: score4,
        medium_medium: score5,
        medium_big: score6,
        big_small: score7,
        big_medium: score8,
        big_big: score9,
    });

    const handlePopulationChange = (value: string) => {
        setSelectedPopulation(value);
        setName(selectedGDP.toLowerCase()+"_" + value.toLowerCase())
    };
    
    const handleGDPChange = (value: string) => {
        setSelectedGDP(value);
        setName(value.toLowerCase()+"_" + selectedPopulation.toLowerCase())
    };

    function handleChange(fieldName: keyof ClusterScore, type:string, newValue: number) {
        const updatedScoreMap = {
            ...scoreMap,
            [name]: {
              ...scoreMap[name],
              [fieldName]: {
                ...scoreMap[name][fieldName],
                // Update the specific field's value
                [type]: Number.isNaN(newValue)? 0: newValue,
              },
            },
          };
          console.log(updatedScoreMap)
          setScoreMap(updatedScoreMap);
    }

    useEffect(()=>{
        localStorage.setItem('rules', JSON.stringify(scoreMap))
    },[scoreMap])

  return (
    <>
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
                    <InputRules name='Real GDP %' value={scoreMap[name]} onChange={(type, newValue) => handleChange('gdp',type, newValue)} />
                    <InputRules name = 'Unemployment Rate %' value={scoreMap[name]} onChange={(type, newValue) => handleChange('unemployment', type, newValue)} />
                    <InputRules name = 'Budget Surplus (Deficit) %' value={scoreMap[name]} onChange={(type, newValue) => handleChange('budget_surplus', type, newValue)} />
                    <InputRules name = 'Inflation Rate %' value={scoreMap[name]} onChange={(type, newValue) => handleChange('inflation', type, newValue)}/>
                </div>
            </div>
            <div className='flex justify-end pt-10 mr-5'>
              <div className="">
                  <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                      onClick={()=>{
                        alert("Do you want to proceed? Your changes will be reset once you comback")
                        onMoveToNumberofTeam()
                      }}
                  >
                      Next
                  </button>
              </div>
            </div>
        </div>
    
    </>
  )
}

export default GameRules