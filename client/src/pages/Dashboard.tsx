import Logo from '../components/Logo'
import Avatar from '../assets/logo/vn.png'
import { useState } from 'react'
import AdminIcon from '../components/AdminIcon'
import LecturerIcon from '../components/LecturerIcon'
import Administrator from '../components/dashboard/Admin'
import Lecturer from '../components/dashboard/Lecturer'
function Dashboard() {
const [selectedComponent, setSelectedComponent] = useState('admin');

const renderComponent = () => {
    if (selectedComponent === 'admin') {
      return <Administrator />;
    } else if (selectedComponent === 'lecturer') {
      return <Lecturer />;
    } else {
      // Return some default component or null if nothing is selected
      return null;
    }
  };
  return (
    <div className="relative">
        <div className="h-screen bg-[#A9A9A9] ">
            <div className="w-[220px] h-screen bg-[#282C35] absolute left-0 "/>
            <div className="w-screen h-[10%] bg-[#282C35] absolute left-0 "/>
            <Logo/>
            {/* Admin/Lecturer selection */}
            <div className= 'w-[220px] h-[100px] absolute top-[20%] flex flex-col gap-10 '>
                <div className='flex flex-row items-center gap-4 text-white pl-4 hover:cursor-pointer'
                onClick={() => setSelectedComponent('admin')}>
                    <AdminIcon color={selectedComponent === 'admin' ? '#FF7100' : '#A9A9A9'}/>
                    <h1 className={`text-xl font-bold ${selectedComponent === 'admin' ? 'text-orange-500' : ''}`}>{"Administrator"}</h1>
                </div>
                <div className='flex flex-row items-center gap-4 text-white pl-4 hover:cursor-pointer'
                onClick={() => setSelectedComponent('lecturer')}>
                    <LecturerIcon color={selectedComponent === 'lecturer' ? '#FF7100' : '#A9A9A9'}/>
                    <h1 className={`text-xl font-bold ${selectedComponent === 'lecturer' ? 'text-orange-500' : ''}`}>{"Lecturer"}</h1>
                </div>
            </div>
         
            <div className="flex w-screen h-[10%] justify-between items-center pl-60 pr-10 absolute">
        {/* Username */}
                <div className="flex flex-col">
                    <h1 className="text-gray-300" >{"Welcome"}</h1>
                    <h1 className="text-lg text-white font-semibold" >{"Daniel Borer"}</h1>
                </div>
        {/* Searchbar */}
            <div className="relative w-[400px] mr-[10%]">
                <input type="search" id="location-search" className="block rounded-l-lg p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="" />
                <button type="submit" className="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border  hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 ">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
        {/* Avatar */}
                <div className="flex w-14 h-14 bg-black rounded-full hover:cursor-pointer">
                    <img src={Avatar} alt="Avatar" className="object-cover rounded-full " />
                </div>
            </div>
            
        {/*Main Content */} 
            <div className="absolute left-[220px] right-0 top-[10%] bottom-0 bg-gray-600">
                <div className="absolute top-[3%] left-[2%] right-[2%] bottom-[3%] bg-[#282C35] rounded-lg">
                {renderComponent()}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard