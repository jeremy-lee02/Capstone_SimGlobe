import { simGlobe_logo} from '../assets'
import AdjustEconomy from '../components/gameplay/AdjustEconomy'
import CurrentEconomy from '../components/gameplay/CurrentEconomy'
import TeamInfo from '../components/gameplay/TeamInfo'

type Props = {}

const GamePlay = (props: Props) => {
  return (
    <div className='bg-[#1A1C22] min-h-screen'>
        <div className='flex justify-between items-start pr-10 pt-4'>
            <img src= {simGlobe_logo} width={200} height={150} className='object-contain' />
            <TeamInfo />
        </div>
        <div className='flex'>
            <h1 className='font-bold text-3xl text-white mx-auto'>Round 1</h1>
        </div>
        <div className='flex gap-10 text-white ml-10 text-lg'>
            <button className='transition hover:scale-105 underline'>View Ranking</button>
            <button className='transition hover:scale-105 underline'>See Event</button>
        </div>
        {/* Game Play during each round */}
        <div className='flex mx-5 my-10 gap-10 items-start justify-between'>
            <CurrentEconomy />
            <AdjustEconomy />
        </div>
    </div>
  )
}

export default GamePlay