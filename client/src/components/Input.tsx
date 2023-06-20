

type Props = {
    inputName: string,
    type: string,
    placeholder: string, 
    name: string
}

const Input = ({inputName, name, type, placeholder}: Props) => {
  return (
    <div className="mb-5">
        <label className="ml-2 text-white">{inputName}</label><br />
        <input placeholder ={placeholder} type= {type} name={name} className="placeholder-gray-500 transition-all border-b border-[#1A1C22] focus:border-[#ffffff69] px-4 w-full py-3 text-black rounded-md outline-none" />
    </div>
  )
}

export default Input