
import {useState, useEffect} from 'react';
import RangeSlider from './RangeSlider';
import {InputValue, Room, Team } from '../../../typing';
import { useUpdateRoom } from '../../utils/economic';
import db from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
type Props = {
    input_values: InputValue
    userStatus:boolean
    room: Room
    countryName: string
    onUpdateCountry: () => void;
    countryInput: Array<UserInput>;
    teamInfo: string | null;
    roundInfo: string
}
interface UserInput {
    name: string,
    input: InputValue
}

const AdjustEconomy = ({input_values, onUpdateCountry, room, userStatus, countryName, countryInput, teamInfo, roundInfo}: Props) => {
    const [interestRate, setInterestRate] = useState(input_values.interest_rate)
    const [vatRate, setVatRate] = useState(input_values.vat_rate)
    const [corporateTax, setCorporateTax] = useState(input_values.corporate_tax_rate)
    const [importTariff, setImportTariff] = useState(input_values.import_tariff_rate)
    const [govExpenditure, setGovExpenditure] = useState(input_values.government_expenditure_us)
    const [values, setValues] = useState<InputValue>(input_values)
    const [userInput, setUserInput] = useState<Array<UserInput>>(countryInput || "[]") // Initialize once the create room is triggered
    const [status, setStatus] = useState(userStatus)
    // const [team, setTeam] = useState([])
    // const [input, setInput] = useState([])

    useEffect(()=>{
        //Update values when any of the 5 input changes
        const newValues = {
            interest_rate: interestRate,
            vat_rate: vatRate,
            corporate_tax_rate: corporateTax,
            import_tariff_rate: importTariff,
            government_expenditure_us: govExpenditure,
        }
        setValues(newValues)
        setUserInput(prev => {
            const newUserInput = [...prev]
            newUserInput.forEach(i => {
                if(i.name === countryName){
                    i.input = newValues
                }
            })
            localStorage.setItem("country_inputs", JSON.stringify(newUserInput))
            return newUserInput
        })
    },[interestRate,vatRate,importTariff,govExpenditure,corporateTax])

    function handleSubmit(e:any) {
        e.preventDefault()
        console.log(values)
        updateInput(values)
        // const updatedRoom = useUpdateRoom(room, userInput) // Take in current value Room and all the user's inputs (Including other country)
        onUpdateCountry()
        // console.log(newRoom[2].cluster.other_value.global_interestRate)
    }

    const updateInput = async (values :InputValue) => {
        const teamRef = doc(db, 'rounds', roundInfo )
        const teamDoc = await getDoc(teamRef)
        const teamData = teamDoc.data()
        var input = []
        var team = []
        var newInput = {'input' : values,
                        'team': teamInfo}
        if (teamData) {
            input = [...teamData.input];
            team = [...teamData.team];
            input.push(newInput)
            team.push(parseInt(teamInfo ? teamInfo : ''))
            await updateDoc(teamRef, {
                input: input,
                team: team
            })
        }
    }
  return (
    <div className="bg-[#282C35] text-white flex flex-col w-[70%]">
        <h2 className="font-bold text-2xl mt-3 mx-auto pb-10">Adjust Economy</h2>
        <form onSubmit={handleSubmit}>
            <RangeSlider
            name='Interest Rate'
            min={0}
            value={interestRate}
            max={20}
            status={userStatus}
            onChange={(e)=> setInterestRate(Number(e.target.value))} />
            <RangeSlider
            name='VAT Rate:'
            min={0}
            value={vatRate}
            max={50}
            status={userStatus}
            onChange={(e)=> setVatRate(Number(e.target.value))} />
            <RangeSlider
            name='Corporate Tax Rate'
            min={0}
            value={corporateTax}
            max={50}
            status={userStatus}
            onChange={(e)=> setCorporateTax(Number(e.target.value))} />
            <RangeSlider
            name='Import Tariff Rate'
            min={0}
            value={importTariff}
            max={100}
            status={userStatus}
            onChange={(e)=> setImportTariff(Number(e.target.value))} />
            <div className='ml-16 flex justify-start items-center gap-2 mb-3'>
                <p>{"Government Expenditure in USD (Billion)"}: </p>
                <input disabled={userStatus} type='number' min={0} value={govExpenditure} onChange={(e)=> setGovExpenditure(Number(e.target.value))} className='bg-[#1A1C22] rounded-md pl-2 py-2 outline-[#FF7100]' />
            </div>
            <div className='flex justify-end mx-16 my-10'>
                <button disabled={userStatus} type='submit' className='bg-[#1A1C22] py-2 px-4 transition hover:scale-105 hover:bg-[#FF7100] hover:text-[#1A1C22] rounded-md text-[#FF7100]'>Save Record</button>
            </div>
        </form>


    </div>
  )
}

export default AdjustEconomy