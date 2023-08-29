import React, { useState } from 'react';


const NumberofTeam: React.FC<{
  onMoveToRules: () => void;
  onMoveTocountriesSelect: () => void;
}> = ({ onMoveToRules, onMoveTocountriesSelect }) => {


  // const handleNext = (numTeams: number) => {
  //   localStorage.setItem('numTeams', numTeams.toString());
  //   navigate('/selectCountries');
  // };

  const [numTeams, setNumTeams] = useState(2);

  return (
    <div className="bg-gray-900 h-full w-full text-white flex flex-col justify-center items-center">
      <div className="">
        <h1 className="text-3xl font-semibold mb-4">Number of Team</h1>
        <p className="mb-4">Select how many teams:</p>
        <input
          className="text-black block w-full py-2 px-4 border rounded-md bg-gray-100"
          type="number"
          value={numTeams}
          onChange={(e) => setNumTeams(parseInt(e.target.value, 10))}
        />
      </div>
      <div className="pt-4 flex justify-end">
        <button
          className="py-2 px-4 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onMoveToRules}
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