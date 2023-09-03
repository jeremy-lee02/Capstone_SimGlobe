
import {useState, useEffect} from 'react';
import RangeSlider from './RangeSlider';
import {InputValue, Room, Team } from '../../../typing';
import { useUpdateRoom } from '../../utils/economic';
type Props = {
    input_values: InputValue

    room: Room
    onUpdateCountry: (updatedValues: Team) => void;
}

const AdjustEconomy = ({input_values, onUpdateCountry, room}: Props) => {
    const [interestRate, setInterestRate] = useState(input_values.interest_rate)
    const [vatRate, setVatRate] = useState(input_values.vat_rate)
    const [corporateTax, setCorporateTax] = useState(input_values.corporate_tax_rate)
    const [importTariff, setImportTariff] = useState(input_values.import_tariff_rate)
    const [govExpenditure, setGovExpenditure] = useState(input_values.government_expenditure_us)
    const [values, setValues] = useState<InputValue>(input_values)

    useEffect(()=>{
        //Update values when any of the 5 input changes
        setValues(prev =>{
            const newValues = {
                ...prev,
                interest_rate: interestRate,
                vat_rate: vatRate,
                corporate_tax_rate: corporateTax,
                import_tariff_rate: importTariff,
                government_expenditure_us: govExpenditure,
            }
            return newValues
        })
    },[interestRate,vatRate,importTariff,govExpenditure,corporateTax])

    function handleSubmit(e:any) {
        e.preventDefault()
        const newRoom = {...room}
        newRoom.team[2].country.cluster.input_value = values
        // const newCountry = {...room[2]}
        // newCountry.cluster.input_value = values
        // function take in values
        const updatedRoom = useUpdateRoom(newRoom, input_values, newRoom.team[2].country.name ) // Take in new Room with updated input, previous Input, country name //Assume country is the second one in the array
        onUpdateCountry(updatedRoom.team[2])
        // console.log(newRoom[2].cluster.other_value.global_interestRate)
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
            onChange={(e)=> setInterestRate(Number(e.target.value))} />
            <RangeSlider
            name='VAT Rate:'
            min={0}
            value={vatRate}
            max={50}
            onChange={(e)=> setVatRate(Number(e.target.value))} />
            <RangeSlider
            name='Corporate Tax Rate'
            min={0}
            value={corporateTax}
            max={50}
            onChange={(e)=> setCorporateTax(Number(e.target.value))} />
            <RangeSlider
            name='Import Tariff Rate'
            min={0}
            value={importTariff}
            max={100}
            onChange={(e)=> setImportTariff(Number(e.target.value))} />
            <div className='ml-16 flex justify-start items-center gap-2 mb-3'>
                <p>{"Government Expenditure in USD (Billion)"}: </p>
                <input type='number' min={0} value={govExpenditure} onChange={(e)=> setGovExpenditure(Number(e.target.value))} className='bg-[#1A1C22] rounded-md pl-2 py-2 outline-[#FF7100]' />
            </div>
            <div className='flex justify-end mx-16 my-10'>
                <button type='submit' className='bg-[#1A1C22] py-2 px-4 transition hover:scale-105 hover:bg-[#FF7100] hover:text-[#1A1C22] rounded-md text-[#FF7100]'>Save Record</button>
            </div>
        </form>


    </div>
  )
}

export default AdjustEconomy