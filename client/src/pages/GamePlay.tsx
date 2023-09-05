import { useEffect, useState} from 'react'
import { Room, Team} from '../../typing'
import { simGlobe_logo} from '../assets'
import AdjustEconomy from '../components/gameplay/AdjustEconomy'
import CurrentEconomy from '../components/gameplay/CurrentEconomy'
import TeamInfo from '../components/gameplay/TeamInfo'

import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import db from '../firebase';
import { useNavigate } from 'react-router-dom'


type Props = {}

const GamePlay = (props: Props) => {
    const room: Room = {"team":[{"team_id":"1","user":[],"device":[],"turn":0,"country":{"country_id":"1","name":"Egypt","cluster":{"name":"medium_big","preset_value":{"initial_consumption":100,"initial_investment":40,"initial_spending":30,"initial_growth":4,"initial_capital_stock":160,"initial_autonomous_imports":4,"max_gDP_score":6,"depreciation":19,"impact_of_government_debt_on_investment_growth":0.75,"impact_of_real_gdp_on_unemployment":1.25,"portion_of_gdp_as_induced_import":0.08,"inflation":3,"unemployment":8},"input_value":{"interest_rate":10,"vat_rate":15,"corporate_tax_rate":30,"government_expenditure_us":30,"import_tariff_rate":10},"elasticity":{"perpetual_growth":1,"impact_of_inflation_on_induced_consumption":1.5,"impact_of_interest_rate_on_induced_consumption_change":0.75,"impact_of_interest_rate_on_induced_consumption_level":0.25,"impact_of_interest_rate_on_induced_investment_change":0.75,"impact_of_interest_rate_on_induced_investment_level":0.25,"impact_of_interest_rate_on_inflation":1,"impact_of_inflation_expectation_on_inflation":0.75,"impact_of_supply_and_demand_change_on_inflation":0.3,"impact_of_interest_rate_differential_on_capital_flow":3,"autonousmous_import":3,"impact_of_fx_rate_on_induced_import":0.75,"height_of_sigmoid":22.5,"width_of_sigmoid":0.15,"position_of_sigmoid":74,"size_of_rewards":2.5},"other_value":{"consumption":85,"investment":28,"demand":143,"supply":60,"nominal":4.17,"real_gdp":101.5,"capital_growth":0,"labor":1,"technological":2,"consumer_price_index":100,"income_tax":15,"corporate_tax":12,"tariff_revanue":1.1,"gov_debt":60.9,"debt_to_gdp":60,"exchage_rate":100,"import_value":9.9,"export_value":9.9,"import_preTariff":11,"trade_balance":0,"net_capital":0,"global_interestRate":10,"budget_surplus_billion":-1.9,"budget_surplus_percent":-1.87,"nominal_gdp":101.5,"real":4.17},"score":{"gdp":{"min":2,"max":8},"unemployment":{"min":1,"max":10},"inflation":{"second_min":-2,"min":0,"max":6},"budget_surplus":{"min":-10,"max":-2}}}},"max_player":4,"score":0},{"team_id":"2","user":[],"device":[],"turn":0,"country":{"country_id":"2","name":"Colombia","cluster":{"name":"medium_big","preset_value":{"initial_consumption":100,"initial_investment":40,"initial_spending":30,"initial_growth":4,"initial_capital_stock":160,"initial_autonomous_imports":4,"max_gDP_score":6,"depreciation":19,"impact_of_government_debt_on_investment_growth":0.75,"impact_of_real_gdp_on_unemployment":1.25,"portion_of_gdp_as_induced_import":0.08,"inflation":3,"unemployment":8},"input_value":{"interest_rate":10,"vat_rate":15,"corporate_tax_rate":30,"government_expenditure_us":30,"import_tariff_rate":10},"elasticity":{"perpetual_growth":1,"impact_of_inflation_on_induced_consumption":1.5,"impact_of_interest_rate_on_induced_consumption_change":0.75,"impact_of_interest_rate_on_induced_consumption_level":0.25,"impact_of_interest_rate_on_induced_investment_change":0.75,"impact_of_interest_rate_on_induced_investment_level":0.25,"impact_of_interest_rate_on_inflation":1,"impact_of_inflation_expectation_on_inflation":0.75,"impact_of_supply_and_demand_change_on_inflation":0.3,"impact_of_interest_rate_differential_on_capital_flow":3,"autonousmous_import":3,"impact_of_fx_rate_on_induced_import":0.75,"height_of_sigmoid":22.5,"width_of_sigmoid":0.15,"position_of_sigmoid":74,"size_of_rewards":2.5},"other_value":{"consumption":85,"investment":28,"demand":143,"supply":60,"nominal":4.17,"real_gdp":101.5,"capital_growth":0,"labor":1,"technological":2,"consumer_price_index":100,"income_tax":15,"corporate_tax":12,"tariff_revanue":1.1,"gov_debt":60.9,"debt_to_gdp":60,"exchage_rate":100,"import_value":9.9,"export_value":9.9,"import_preTariff":11,"trade_balance":0,"net_capital":0,"global_interestRate":10,"budget_surplus_billion":-1.9,"budget_surplus_percent":-1.87,"nominal_gdp":101.5,"real":4.17},"score":{"gdp":{"min":2,"max":8},"unemployment":{"min":1,"max":10},"inflation":{"second_min":-2,"min":0,"max":6},"budget_surplus":{"min":-10,"max":-2}}}},"max_player":4,"score":0}],"status":false,"round":1,"room_size":2,"key_time":"1 hour"}
    const initialTeam = room.team[1]
    const searchParams = new URLSearchParams(window.location.search);
    const roomCode =  searchParams.get('room') ? searchParams.get('room') : '';
    const teamCode = searchParams.get('team') ? searchParams.get('team') : '';
    const navigate = useNavigate();
    const params = window.location.href;

    const getValue = async () => {
        if (roomCode && teamCode) {
            const docRef = doc(db, "rooms", roomCode);
            const docSnap = await getDoc(docRef);
            const teamLists = docSnap.data();
            if (teamLists){
                setTeam(teamLists.team[teamCode]);
            }
        }
    }

    const [roomData, setRoomData] = useState<Room>(room)
    // use state and use effect to get the country
    const [team, setTeam] = useState<Team>(initialTeam)
    const [status, setStatus] = useState<boolean>(true)
    const [round, setRound] = useState(1)

    function handleCountryUpdate(updatedRoom: Room){
        console.log(team.country.cluster.input_value)
        setStatus(true)
        // const newRoom = {...updatedRoom}
        // setRoomData(newRoom)
        // setTeam(newRoom.team[1])
    }

    const checkTeam = () => {
        const joinTeam = sessionStorage.getItem('team')
        if (joinTeam && joinTeam !== teamCode) {
            navigate('/homestudent')
        }
    }
    const checkStatusUser = async() => {
        if (roomCode) {
            const teamRef = doc(db, "rooms", roomCode);
            const teamSnap = await getDoc(teamRef);
            const gameInfo = teamSnap.data();
            const deviceId = sessionStorage.getItem("device");
            if (gameInfo && teamCode) {
                if (deviceId == gameInfo.team[teamCode].device[gameInfo.team[teamCode].turn]) {
                    setStatus(false)
                } else {
                    setStatus(true)
                }
                if (gameInfo.round > round) {
                    setRound(gameInfo.round)
                }
            }
        }
    }

    //Handle API logic here to get Team
    useEffect(()=>{
        const statusOfRound = onSnapshot(doc(db, "rooms", params.split("room=")[1].split("&")[0]), (doc) => {
            checkStatusUser();
        });
        getValue();
        checkStatusUser();
        checkTeam();
    return statusOfRound
    },[])
  return (
    <div className='bg-[#1A1C22] min-h-screen'>
        <div className='flex justify-between items-start pr-10 pt-4'>
            <img src= {simGlobe_logo} width={200} height={150} className='object-contain' />
            <TeamInfo team={team} />
        </div>
        <div className='flex'>
            <h1 className='font-bold text-3xl text-white mx-auto'>Round {round}</h1>
        </div>
        <div className='flex gap-10 text-white ml-10 text-lg'>
            <button className='transition hover:scale-105 underline'>View Ranking</button>
            <button className='transition hover:scale-105 underline' onClick={()=> console.log(roomData)}>See Event</button>
        </div>
        {/* Game Play during each round */}
        <div className='flex mx-5 my-10 gap-10 items-start justify-between'>
            <CurrentEconomy country={team.country.cluster}/>
            <AdjustEconomy input_values={team.country.cluster.input_value} room={roomData} onUpdateCountry={handleCountryUpdate} countryName= {team.country.name} userStatus={status} countryInput={[]} roundInfo={roomCode + "-" + round} teamInfo={teamCode} />
        </div>
    </div>
  )
}

export default GamePlay