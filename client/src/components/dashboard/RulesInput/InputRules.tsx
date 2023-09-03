
import { ClusterScore } from '../../../../typing';

type Props = {
    name: string;
    onChange: (inputType: string, newValue: number) => void
    value: ClusterScore
    
}

const InputRules = ({name, value, onChange}: Props) => {
    function checkName(name: string) {
        switch (name) {
            case "Inflation Rate %":
                return "inflation"
                break;
            case "Unemployment Rate %":
                return "unemployment"
                break;
            case "Real GDP %":
                return "gdp"
                break;
            case "Budget Surplus (Deficit) %":
                return "budget_surplus"
                break;
            default:
                return 'inflation'
                break;
        }
    }
    const factorName: keyof ClusterScore  = checkName(name)
    const factorData = value[factorName]
    return (
    <>
        <div className="flex items-center justify-between mr-20">
        <h3 className="text-white ml-10">{name}</h3>
        <div className='flex flex-row'>
            {name === 'Inflation Rate %' &&'second_min' in factorData && (
            <div className="flex items-center mr-20">
                <label className="text-white mr-2 ml-3">2nd Min:</label>
                <input value={factorData.second_min} className="w-14 text-center p-1 bg-gray-800 text-white rounded" onChange={(e) => onChange("second_min",parseFloat(e.target.value))}/>
            </div>
            )}
            <div className="flex items-center mr-10">
            <label className="text-white mr-2">Min:</label>
            <input value={factorData.min} className="w-14 text-center p-1 bg-gray-800 text-white rounded" onChange={(e) => onChange("min",parseFloat(e.target.value))}/>
            </div>

            <div className="flex items-center">
            <label className="text-white mr-2 ml-3">Max:</label>
            <input value={factorData.max} className="w-14 text-center p-1 bg-gray-800 text-white rounded" onChange={(e) => onChange("max",parseFloat(e.target.value))}/>
            </div>
        </div>
        </div>
        <hr className="h-px bg-gray-200 border-0 mx-10 "></hr>
    </>
    )
}

export default InputRules