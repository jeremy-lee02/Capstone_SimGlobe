import React, { useState, useEffect} from 'react';
import Ranking from '../components/Ranking';
import Logo from '../components/Logo'


type Rank = {
    id: number;
    teamRank: string;
    countryName: string;
    points: number;
  };
  
  const Leaderboard: React.FC = () => {

    const [teams, setTeams] = useState<Rank[]>([
      { id: 1, teamRank: "1st", countryName: "Vietnam", points: 50 },
      { id: 2, teamRank: "2nd", countryName: "China", points: 40},
      { id: 3, teamRank: "3rd", countryName: "Vanuatu", points: 30 },
      { id: 4, teamRank: "4th", countryName: "Cambodia", points: 25 },
      { id: 5, teamRank: "5th", countryName: "USA", points: 23 },
      { id: 6, teamRank: "6th", countryName: "Vietnam", points: 50 },
      { id: 7, teamRank: "7th", countryName: "China", points: 40},
      { id: 8, teamRank: "8th", countryName: "Vanuatu", points: 30 },
      { id: 9, teamRank: "9th", countryName: "Cambodia", points: 25 },
      { id: 10, teamRank:"10th", countryName: "USA", points: 23 },
      
    ]);


  return (
    <>
    <Logo/>
        <div className='bg-gray-900 h-screen'>
            <div className='flex flex-col  items-center pt-20 gap-6'>
                <h1 className='text-white text-4xl font-bold '>{"Leader Board"}</h1>
                <div className='flex justify-center items-center 2xl:h-[85vh] h-[75vh] w-[50vw] bg-[#282C35]'>
                    <div className='bg-gray-900 w-[95%] h-[95%] rounded-2xl flex justify-center items-center'>
                        <div className="flex flex-col gap-10 2xl:max-h-[650px] max-h-[400px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-700">
                        {teams.map((team) => (
                        <Ranking
                            key={team.id}
                            teamRank={team.teamRank}
                            countryName={team.countryName}
                            points={team.points}/>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}


export default Leaderboard