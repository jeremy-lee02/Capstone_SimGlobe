

type Props = {}

const Economy = [
    {
    name: "Approval Index",
    number: "90"
    },
    {
    name: "Nominal GDP",
    number: "3.1%"
    },
    {
    name: "Real GDP",
    number: "3.1%"
    },
    {
    name: "Unemployment Rate",
    number: "3.1%"
    },
    {
    name: "Inflation Rate",
    number: "0.3%"
    },
    {
    name: "Budget Surplus (Deficit) as % of GDP",
    number: "0.0%"
    },
    {
    name: "Government Debt as % of GDP",
    number: "60%"
    },
    {
    name: "Consumption © pre-tax",
    number: "150"
    },
    {
    name: "Consumption (C)",
    number: "127.5"
    },
    {
    name: "Trade balance",
    number: "0"
    },
    {
    name: "Exchange Rate",
    number: "100%"
    },
    {
    name: "Average Global Interest Rate",
    number: "10"
    },
]

const CurrentEconomy = (props: Props) => {
  return (
    <div className="bg-[#282C35] text-white flex flex-col justify-center items-center w-[1/2] px-10">
        <h2 className="font-bold text-2xl mt-3 mx-auto">Current Economy</h2>
        <ul className="px-2 py-7 list-disc pl-7 text-lg">
            {Economy.map((e,index) =>(
                <li className="mb-2 font-semibold" key={e.name + index}>{e.name}: <span className="font-normal">{e.number}</span></li>
            ))}
        </ul>
    </div>
  )
}

export default CurrentEconomy