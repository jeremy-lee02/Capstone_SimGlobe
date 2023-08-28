import React, { useState } from 'react';


const NumberofTeam: React.FC<{
  onMoveToPreset: () => void;
  onMoveTocountriesSelect: () => void;
}> = ({ onMoveToPreset, onMoveTocountriesSelect }) => {


  // const handleNext = (numTeams: number) => {
  //   localStorage.setItem('numTeams', numTeams.toString());
  //   navigate('/selectCountries');
  // };

  const [numTeams, setNumTeams] = useState(2);

  return (
    <div className="flex justify-center rounded-t-lg p-4">
      
        <div className="bg-white p-8 rounded-lg shadow-md">
          <label className="block mb-2">
            Number of Teams:
            <input
              className="block w-full py-2 px-4 border rounded-md bg-gray-100"
              type="number"
              value={numTeams}
              onChange={(e) => setNumTeams(parseInt(e.target.value, 10))}
            />
          </label>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={onMoveToPreset}
          >
            Back
          </button>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={onMoveTocountriesSelect}
          >
            Next
          </button>
          
        </div>
    </div>
  );
};

export default NumberofTeam;