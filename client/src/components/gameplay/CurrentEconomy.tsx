import { CountryCluster } from "../../../typing"


type Props = {
  country: CountryCluster
}

// const Economy = [
//     {
//     name: "Approval Index",
//     number: "90"
//     },
//     {
//     name: "Nominal GDP",
//     number: "3.1%"
//     },
//     {
//     name: "Real GDP",
//     number: "3.1%"
//     },
//     {
//     name: "Unemployment Rate",
//     number: "3.1%"
//     },
//     {
//     name: "Inflation Rate",
//     number: "0.3%"
//     },
//     {
//     name: "Budget Surplus (Deficit) as % of GDP",
//     number: "0.0%"
//     },
//     {
//     name: "Government Debt as % of GDP",
//     number: "60%"
//     },
//     {
//     name: "Consumption © pre-tax",
//     number: "150"
//     },
//     {
//     name: "Consumption (C)",
//     number: "127.5"
//     },
//     {
//     name: "Trade balance",
//     number: "0"
//     },
//     {
//     name: "Exchange Rate",
//     number: "100%"
//     },
//     {
//     name: "Average Global Interest Rate",
//     number: "10"
//     },
// ]

const CurrentEconomy = ({country}: Props) => {

  function approvalIndex (gdp: number, unemployment: number, inflation: number, budget:number): number {

    return parseFloat((gdp + unemployment + inflation + budget).toFixed(2))
  }
  return (
    <div className="bg-[#282C35] text-white flex flex-col justify-center items-center w-[1/2] px-10">
        <h2 className="font-bold text-2xl mt-3 mx-auto">Current Economy</h2>
        <ul className="px-2 py-7 list-disc pl-7 text-lg">
            {/* {Economy.map((e,index) =>(
                <li className="mb-2 font-semibold" key={e.name + index}>{e.name}: <span className="font-normal">{e.number}</span></li>
            ))} */}
            <li className="mb-2 font-semibold" >Approval Index: <span className="font-normal">{approvalIndex(country.other_value.real_gdp, country.preset_value.unemployment, country.preset_value.inflation, country.other_value.gov_debt)}</span></li>
            <li className="mb-2 font-semibold" >Nominal GDP: <span className="font-normal">{country.other_value.nominal}</span></li>
            <li className="mb-2 font-semibold" >Real GDP: <span className="font-normal">{country.other_value.real}</span></li>
            <li className="mb-2 font-semibold" >Unemployment Rate: <span className="font-normal">{country.other_value.unemployment}</span></li>
            <li className="mb-2 font-semibold" >Inflation Rate: <span className="font-normal">{country.other_value.inflation}</span></li>
            {/* 2 values below has not finished */}
            <li className="mb-2 font-semibold" >Budget Surplus (Deficit) as % of GDP: <span className="font-normal">{country.other_value.budget_surplus_percent}</span></li>
            <li className="mb-2 font-semibold" >Government Debt as % of GDP: <span className="font-normal">{country.other_value.gov_debt}</span></li>

            <li className="mb-2 font-semibold" >Consumption © pre-tax: <span className="font-normal">{country.other_value.consumption_pre_tax}</span></li>
            <li className="mb-2 font-semibold" >Consumption (C): <span className="font-normal">{country.other_value.consumption}</span></li>
            <li className="mb-2 font-semibold" >Trade balance: <span className="font-normal">{country.other_value.trade_balance}</span></li>
            <li className="mb-2 font-semibold" >Exchange Rate: <span className="font-normal">{country.other_value.exchage_rate}</span></li>
            <li className="mb-2 font-semibold" >Average Global Interest Rate: <span className="font-normal">{country.other_value.global_interestRate}</span></li>
        </ul>
    </div>
  )
}

export default CurrentEconomy