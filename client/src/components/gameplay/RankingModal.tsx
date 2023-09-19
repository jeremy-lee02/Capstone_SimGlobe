import Ranking from '../Ranking';
import { Team } from '../../../typing';

// interface Team {
//   id: string;
//   teamRank: string;
//   countryName: string;
//   points: number;
// }


interface Props {
  teams: Team[];
}

function RankingModal(props: Props) {
  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex justify-center items-center 2xl:max-h-[80vh] max-h-[75vh] max-w-[50vw] bg-[#282C35]'>
        <div className='bg-gray-900 rounded-2xl flex justify-center items-center m-6'>
          <div className="p-10 flex flex-col gap-10 2xl:max-h-[600px] max-h-[400px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-700">
            {props.teams.map((team) => (
              <div key={team.team_id}>
                <Ranking
                  teamRank={''}
                  countryName={team.country.name}
                  points={team.score} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingModal;