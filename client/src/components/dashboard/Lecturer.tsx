import React, { useState } from 'react';

interface RoomSetting {
  [key: string]: number;
}

const Lecturer: React.FC = () => {
  const [values, setValues] = useState([
    { label: 'Real GDP %', value: 50 },
    { label: 'Unemployment Rate %', value: 30 },
    { label: 'Inflation Rate %', value: 70 },
    { label: 'Budget Surplus (Deficit) %', value: 20 },
  ]);

  const handleChangeValue = (index: number, newValue: number) => {
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index].value = newValue;
      return updatedValues;
    });
  };

  const [roomSettings, setRoomSettings] = useState({});
  const handleCreateRoom = () => {
    const roomSettingsObject = values.reduce((acc, item) => {
      acc[item.label] = item.value;
      return acc;
    }, {} as RoomSetting);

    setRoomSettings(roomSettingsObject);

    // Now you can use the roomSettingsObject for further processing
    console.log('Room Settings:', roomSettingsObject);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="rounded-t-lg p-4">
        <h1 className="text-3xl pl-2 font-semibold text-white">Room Setting</h1>
      </div>

      <div className="flex flex-col p-4">
        {values.map((item, index) => (
          <div key={index} className="flex items-center m-14">
            <p className="text-white w-40">{item.label}</p>
            <input
              type="range"
              min={0}
              max={100}
              value={item.value}
              onChange={(e) => handleChangeValue(index, Number(e.target.value))}
              className="slider h-8 w-full appearance-none"
              style={{
                background: `linear-gradient(to right, #FF7100 0%, #f59e0b ${item.value}%, #4a5568 ${item.value}%, #4a5568 100%)`
              }}
            />
             <div className="w-14 text-right">
             <input
                type="text"
                inputMode="numeric"
                value={item.value}
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value);
                  const updatedValue = isNaN(newValue) ? 0 : Math.min(newValue, 100);

                  handleChangeValue(index, updatedValue);
                }}
                className="w-14 text-center p-1 bg-gray-800 text-white rounded"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-4">
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCreateRoom}>
          Create Room
        </button>
      </div>
    </div>
  );
};

export default Lecturer;