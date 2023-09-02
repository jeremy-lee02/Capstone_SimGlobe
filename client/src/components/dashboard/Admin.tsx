import axios from 'axios';
import React, { useEffect, useState}from 'react';
import toast from 'react-hot-toast';

const Administrator: React.FC = () => {
  const initialElasticitiesData = [
    { label: 'Perpetual Growth (%)', value: 0 },
    { label: 'Impact of Inflation on Induced Consumption', value: 0 },
    { label: 'Impact of Interest Rate (Change) on Induced Consumption', value: 0 },
    { label: 'Impact of Interest Rate (Level) on Induced Consumption', value: 0 },
    { label: 'Impact of Interest Rate (Change) on Induced Investment', value: 0 },
    { label: 'Impact of Interest Rate (Level) on Induced Investment', value: 0 },
    { label: 'Impact of Interest Rate (Level) on Inflation', value: 0 },
    { label: 'Impact of Inflation Expectation on Inflation', value: 0 },
    { label: 'Impact of Supply and Demand change on Inflation', value: 0 },
    { label: 'Impact of Interest Rate Differential on Capital Flow', value: 0 },
    { label: 'Autonousmous Import (Billion $USD)', value: 0 },
    { label: 'Impact of FX Rate on Induced Import', value: 0 },
    { label: 'Height of Sigmoid', value: 0 },
    { label: 'Width of Sigmoid', value: 0 },
    { label: 'Position of Sigmoid', value: 0 },
    { label: 'Size of Rewards', value: 0 },
  ];
  const [elasticitiesData, setElasticitiesData] = useState(initialElasticitiesData);

  const handleSaveChanges = () => {
    const updatedElasticitiesData = elasticitiesData.map((data) => ({
      label: data.label,
      value: data.value,
    }));
    saveSetting(updatedElasticitiesData)
  };

  const saveSetting = async (data: any) => {
    try {
      const url = "http://localhost:9000/api/setting";
      const { data: res } = await axios.post(url, data);
      toast.success(res.message)
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message)
      }
    }
  }

  const config  = (res: any) => {
    const setting = [...elasticitiesData]
    setting[0].value = res.perpetualGrowth,
    setting[1].value = res.inflation,
		setting[2].value = res.IRC,
    setting[3].value = res.IIRIC,
    setting[4].value = res.IIRII,
    setting[5].value = res.IRLII,
    setting[6].value = res.IIRI,
    setting[7].value = res.IIEI,
    setting[8].value = res.SDI,
    setting[9].value = res.IIRD,
    setting[10].value = res.IFRII,
    setting[11].value = res.AI,
    setting[12].value = res.HS,
    setting[13].value = res.WS,
    setting[14].value = res.PS,
    setting[15].value = res.SR
    setElasticitiesData(setting)
    return;
  }

  const getSetting = async () => {
    try {
      const url = "http://localhost:9000/api/setting/getter";
      const { data: res } = await axios.post(url);
      config(res)
      console.log(res)
      return;
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message)
      }
    }
  }
  useEffect(()=> {
    getSetting();
  }, [])

  return (
    <div className="flex flex-col h-full">
      {/* Top Part */}
      <div className="rounded-t-lg p-4">
        <h1 className="text-3xl pl-2 font-semibold text-white">Game Configuration</h1>
      </div>

      {/* Bottom Part */}
      <div className="flex flex-col ml-11 mr-9 mt-4">
        <div className="flex justify-between items-center pb-2 pr-10">
          <p className="text-xl font-semibold text-white">Elasticities</p>
          <p className="text-xl font-semibold text-white">Value</p>
        </div>

        <div className="lg:max-h-[400px] xl:max-h-[590px] max-h-[20rem] mb-5 pr-6 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-700">
          <div className="grid divide-y divide-gray-600">
            {elasticitiesData.map((data, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <p className="text-white">{data.label}</p>
                <input
                  type="text"
                  className="bg-gray-800 rounded p-2 w-16 text-white text-center"
                  value={data.value}
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