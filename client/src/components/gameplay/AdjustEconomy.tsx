
import React, {useState} from 'react';
import RangeSlider from './RangeSlider';
type Props = {}

const AdjustEconomy = (props: Props) => {
    const [interestRate, setInterestRate] = useState(10)
    const [vatRate, setVatRate] = useState(20)
    const [corporateTax, setCorporateTax] = useState(20)
    const [importTariff, setImportTariff] = useState(50)
    const [govExpenditure, setGovExpenditure] = useState(45)
  return (
    <div className="bg-[#282C35] text-white flex flex-col w-[70%]">
        <h2 className="font-bold text-2xl mt-3 mx-auto pb-10">Adjust Economy</h2>
        <form>
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