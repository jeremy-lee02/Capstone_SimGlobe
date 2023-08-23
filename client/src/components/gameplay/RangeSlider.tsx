import React from 'react'

type Props = {
    name: string,
    value: number,
    min: number,
    max: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RangeSlider = ({name, value, min, max, onChange}: Props) => {
  return (
    <div className='mb-4'>
        <div className='ml-16 flex justify-start items-center gap-2 mb-3'>
            <p>{name} </p>
            <input type='number'readOnly min={min} max={max} value={value} onChange={onChange} className='bg-[#1A1C22] rounded-md pl-2 py-2 outline-[#FF7100]' />
        </div>
        <div className='px-2 flex justify-center items-center gap-3 '>
            <p className='text-white text-lg'>{min}%</p>
            <input 
            className='w-[85%] accent-[#FF7100] cursor-pointer'
            type='range' 
            min = {min} 
            max= {max}
            step={1} 
            value={value}
            onChange={onChange} />
            <p className='text-white text-lg'>{value}%</p>
        </div>
    </div>
  )
}

export default RangeSlider