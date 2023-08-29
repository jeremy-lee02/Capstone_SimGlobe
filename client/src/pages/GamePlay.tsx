import { useState, useEffect} from 'react'
import { Room, Team} from '../../typing'
import { simGlobe_logo} from '../assets'
import AdjustEconomy from '../components/gameplay/AdjustEconomy'
import CurrentEconomy from '../components/gameplay/CurrentEconomy'
import TeamInfo from '../components/gameplay/TeamInfo'
import { useCloneData } from '../utils/create_room'
// import { calculate_score } from '../utils/score'

type Props = {}

const GamePlay = (props: Props) => {
    // Room clone data
    
    const room: Room = useCloneData()
    const initialTeam = room.team[0]
    // const [roomData, setRoomData] = useState<Array<Country>>(room)
    // use state and use effect to get the country
    const [team, setTeam] = useState<Team>(initialTeam)

    function handleCountryUpdate(updatedCountry: Team){
        const newData = {...updatedCountry}
        setTeam(newData)
    }
    //Handle API logic here to get Team

  return (
    <div className='bg-[#1A1C22] min-h-screen'>
        <div className='flex justify-between items-start pr-10 pt-4'>
            <img src= {simGlobe_logo} width={200} height={150} className='object-contain' />
            <TeamInfo team={team} />
        </div>
        <div className='flex'>
            <h1 className='font-bold text-3xl text-white mx-auto'>Round 1</h1>
        </div>
        <div className='flex gap-10 text-white ml-10 text-lg'>
            <button className='transition hover:scale-105 underline'>View Ranking</button>
            <button className='transition hover:scale-105 underline' onClick={()=> console.log(room)}>See Event</button>
        </div>
        {/* Game Play during each round */}
        <div className='flex mx-5 my-10 gap-10 items-start justify-between'>
            <CurrentEconomy country={team.country.cluster}/>
            <AdjustEconomy input_values={team.country.cluster.input_value} room={room} onUpdateCountry={handleCountryUpdate} />
        </div>
    </div>
  )
}

export default GamePlay