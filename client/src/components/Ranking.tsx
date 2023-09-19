import React from 'react'

type RankingProp = {
  teamRank: string;
  countryName: any;
  points: number;
};

const Ranking: React.FC<RankingProp> = ({
    teamRank, countryName, points
}) => {
  return (

    <div className='flex justify-center items-center gap-10 pr-2'>
        {/* <h1 className='text-2xl font-semibold text-white'> {teamRank} </h1> */}
        <div className='flex items-center justify-start pl-4 w-[35vw] h-16 bg-[#282C35] rounded-lg gap-6 relative'>
          <div className='w-[70px] h-[45px] bg-white rounded-xl'>
            {/* Countries Flag images */}
          </div>
          <h1 className='text-xl font-semibold text-white' >{countryName}</h1>
          <h1 className='absolute right-2 text-[#D2D2D2] text-lg '>{points}{"pts"} </h1>
        </div>
    </div>

  )
}

export default Ranking