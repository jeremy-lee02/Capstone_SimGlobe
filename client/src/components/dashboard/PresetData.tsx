import React, { useState}from 'react';
import DropboxArrowIcon from '../icons/DropboxArrowIcon';
import usePresetData from '../../hooks/usePresetData';

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

const initialPresetData = [
  { label: 'Initial Consumption', value: 0 },
  { label: 'Initial Investment', value: 0 },
  { label: 'Initial Spending', value: 0 },
  { label: 'Initial Growth', value: 0 },
  { label: 'Initial Capital Stock', value: 0 },
  { label: 'Initial Autonomous Imports', value: 0 },
  { label: 'Max GDP Score', value: 0 },
  { label: 'Depreciation', value: 0 },
  { label: 'Impact of Government Debt on Investment Growth', value: 0 },
  { label: 'Impact of Real GDP on Unemployment', value: 0 },
  { label: 'Portion of GDP as Induced Import', value: 0 },
  { label: 'Unemployment', value: 0 },
  { label: 'Inflation', value: 0 },
];

const PresetData: React.FC<{
  onMoveToNumberofTeam: () => void;
  onMoveToRules: () => void;
}> = ({ onMoveToNumberofTeam, onMoveToRules }) => {
    const [selectedPopulation, setSelectedPopulation] = useState('SMALL');
    const [selectedGDP, setSelectedGDP] = useState('SMALL');
    const [name, setName] = useState("small_small")
    const {data} = usePresetData(name, initialPresetData)
  

    const [presetData, setpresetData] = useState(initialPresetData);
  
    const populations = ['BIG', 'MEDIUM', 'SMALL'];
    const gdps = ['BIG', 'MEDIUM', 'SMALL'];
    
    const handleSaveChanges = () => {
      const updatedpresetData = presetData.map((data) => ({
        label: data.label,
        value: data.value,
      }));
      
      console.log("Updated Elasticities Data:", updatedpresetData);
      console.log(data)
    };
    const handlePopulationChange = (value: string) => {
      setSelectedPopulation(value);
      setName(selectedGDP.toLowerCase()+"_" + value.toLowerCase())
    };
  
    const handleGDPChange = (value: string) => {
      setSelectedGDP(value);
      setName(value.toLowerCase()+"_" + selectedPopulation.toLowerCase())
    };


    // useEffect(()=>{

    // }, [])
  
    return (
      <div className="flex flex-col h-fit">
        {/* Top Part */}
        <div className="rounded-t-lg p-4">
          {/* Add any content you want for the top part */}
          <h1 className="text-3xl pl-2 font-semibold text-white">Preset Data</h1>
  
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
        <div className="flex flex-col ml-11 mr-9 mt-4">
          <div className="flex justify-between items-center pb-2 pr-10">
            <p className="text-xl font-semibold text-white">Lables</p>
            <p className="text-xl font-semibold text-white">Value</p>
          </div>
  
          <div className="lg:max-h-[310px] xl:max-h-[490px] max-h-[20rem] mb-5 pr-6 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-700">
            <div className="grid divide-y divide-gray-600">
              {data.map((e, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <p className="text-white">{e.label}</p>
                  <input
                    type="number"
                    value={e.value}
                    className="bg-gray-800 rounded p-2 w-16 text-white text-center"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const parsedValue = parseFloat(inputValue);
                      const updatedData = [...data];
                      if (isNaN(parsedValue)) {
                        updatedData[index].value = 0;
                      } else {
                        updatedData[index].value = parsedValue;
                      }
          
                      setpresetData(updatedData); // Update state to reflect changes
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Button */}
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                onClick={onMoveToRules}
              >
                Back
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                onClick={onMoveToNumberofTeam}
              >
                Next
              </button>
            </div>
        </div>
      </div>
    );
}

export default PresetData;