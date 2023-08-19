import React, { useState, useEffect, useMemo }from 'react';
import DropboxArrowIcon from '../DropboxArrowIcon';
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

const clusterValues = [
  {
    gdp: { min: 0, max: 6 },
    unemployment: { min: 5, max: 15 },
    inflation: { '2ndMin': 0, min: 0, max: 12 },
    budgetSurplus: { min: -5, max: 5 }
  },
  {
    gdp: { min: 2, max: 8 },
    unemployment: { min: 3, max: 12 },
    inflation: { '2ndMin': 0, min: 0, max: 15 },
    budgetSurplus: { min: -5, max: 5 }
  },
  {
    gdp: { min: 1, max: 6 },
    unemployment: { min: 5, max: 15 },
    inflation: { '2ndMin': 0, min: 0, max: 18 },
    budgetSurplus: { min: -5, max: 5 }
  },
  {
    gdp: { min: 0, max: 6 },
    unemployment: { min: 6, max: 18 },
    inflation: { '2ndMin': 0, min: 0, max: 12 },
    budgetSurplus: { min: -10, max: 2 }
  },
  {
    gdp: { min: 0, max: 8 },
    unemployment: { min: 3, max: 12 },
    inflation: { '2ndMin': 0, min: 0, max: 12 },
    budgetSurplus: { min: -8, max: 0 }
  },
  {
    gdp: { min: 2, max: 8 },
    unemployment: { min: 1, max: 10 },
    inflation: { '2ndMin': -2, min: 0, max: 6 },
    budgetSurplus: { min: -10, max: -2 }
  },
  {
    gdp: { min: 0, max: 5 },
    unemployment: { min: 1, max: 10 },
    inflation: { '2ndMin': -4, min: 0, max: 5 },
    budgetSurplus: { min: -6, max: 2 }
  },
  {
    gdp: { min: 0, max: 5 },
    unemployment: { min: 2, max: 12 },
    inflation: { '2ndMin': -1, min: 0, max: 7 },
    budgetSurplus: { min: -10, max: -3 }
  },
  {
    gdp: { min: -1, max: 3 },
    unemployment: { min: 2, max: 8 },
    inflation: { '2ndMin': -4, min: 0, max: 5 },
    budgetSurplus: { min: -10, max: -3 }
  }
];

const Administrator: React.FC = () => {
  const [selectedPopulation, setSelectedPopulation] = useState('SMALL');
  const [selectedGDP, setSelectedGDP] = useState('SMALL');
  const [selectedCluster, setSelectedCluster] = useState(clusterValues[0]);


  const initialElasticitiesData = [
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
  ];
  const [elasticitiesData, setElasticitiesData] = useState(initialElasticitiesData);

  const populations = ['BIG', 'MEDIUM', 'SMALL'];
  const gdps = ['BIG', 'MEDIUM', 'SMALL'];
  
  const handleSaveChanges = () => {
    const updatedElasticitiesData = elasticitiesData.map((data) => ({
      label: data.label,
      value: data.value,
    }));
    
    console.log("Updated Elasticities Data:", updatedElasticitiesData);
  };
  useEffect(() => {
    console.log("Selected GDP:", selectedGDP);
    console.log("Selected Population:", selectedPopulation);
  
    let newSelectedCluster = null;
  
    if (selectedGDP === 'SMALL' && selectedPopulation === 'SMALL') {
      newSelectedCluster = clusterValues[0];
    } else if (selectedGDP === 'SMALL' && selectedPopulation === 'MEDIUM') {
      newSelectedCluster = clusterValues[1];
    } else if (selectedGDP === 'SMALL' && selectedPopulation === 'BIG') {
      newSelectedCluster = clusterValues[2];
    } else if (selectedGDP === 'MEDIUM' && selectedPopulation === 'SMALL') {
      newSelectedCluster = clusterValues[3];
    } else if (selectedGDP === 'MEDIUM' && selectedPopulation === 'MEDIUM') {
      newSelectedCluster = clusterValues[4];
    } else if (selectedGDP === 'MEDIUM' && selectedPopulation === 'BIG') {
      newSelectedCluster = clusterValues[5];
    } else if (selectedGDP === 'BIG' && selectedPopulation === 'SMALL') {
      newSelectedCluster = clusterValues[6];
    } else if (selectedGDP === 'BIG' && selectedPopulation === 'MEDIUM') {
      newSelectedCluster = clusterValues[7];
    } else if (selectedGDP === 'BIG' && selectedPopulation === 'BIG') {
      newSelectedCluster = clusterValues[8];
    }
  
    if (newSelectedCluster !== null) {
      setSelectedCluster(newSelectedCluster);
      console.log("Selected Cluster:", newSelectedCluster);
    }  
  }, [selectedGDP, selectedPopulation]);
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
      <div className="flex flex-col mx-11 mt-4">
        <div className="flex justify-between items-center pb-2 pr-5">
          <p className="text-xl font-semibold text-white">Elasticities</p>
          <p className="text-xl font-semibold text-white">Value</p>
        </div>

        <div className="max-h-[29rem] mb-5 pr-1 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-700">
          <div className="grid divide-y divide-gray-600">
            {elasticitiesData.map((data, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <p className="text-white ml-4">{data.label}</p>
                <input
                  type="text"
                  className="bg-gray-800 rounded p-2 w-16 text-white text-center"
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const parsedValue = parseFloat(inputValue);
                    const updatedData = [...elasticitiesData];
                    if (isNaN(parsedValue)) {
                      updatedData[index].value = 0;
                    } else {
                      updatedData[index].value = parsedValue;
                    }
        
                    setElasticitiesData(updatedData); // Update state to reflect changes
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Save Changes Button */}
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
      </div>
    </div>
  );
};

export default Administrator;