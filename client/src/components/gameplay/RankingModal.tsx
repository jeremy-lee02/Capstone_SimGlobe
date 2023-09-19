import Ranking from '../Ranking';

interface Team {
  id: string;
  teamRank: string;
  countryName: string;
  points: number;
}

interface Room {
  team: Team;
}

interface Props {
  Room: Room[];
}

function RankingModal(props: Props) {
  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex justify-center items-center 2xl:max-h-[80vh] max-h-[75vh] max-w-[50vw] bg-[#282C35]'>
        <div className='bg-gray-900 rounded-2xl flex justify-center items-center m-6'>
          <div className="p-10 flex flex-col gap-10 2xl:max-h-[600px] max-h-[400px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-700">
            {props.Room.map(( Room) => (
              <div key={Room.team.id}>
                <Ranking
                  teamRank={Room.team.teamRank}
                  countryName={Room.team.countryName}
                  points={Room.team.points}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingModal;