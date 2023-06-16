

type Props = {
    inputName: string,
    value: string,
    type: string,
    placeholder: string
}

const Input = ({inputName, value, type, placeholder}: Props) => {
  return (
    <div className="mb-5">
        <label className="ml-2 text-white">{inputName}</label><br />
        <input placeholder ={placeholder} type= {type} value={value} className="placeholder-gray-500 transition-all border-b border-[#1A1C22] focus:border-[#ffffff69] px-4 w-full py-3 text-black rounded-md outline-none" />
    </div>
  )
}

export default Input