import { CountryCluster, Room } from "../../typing"










// const vietnam : Country = {
//     country_id: "1",  
//     name: "Vietnam",
//     cluster: {
//         name: "medium",
//         preset_value: {
//             initial_consumption: 50, // Pre-tax
//             initial_investment: 20, // Pre-tax
//             initial_spending: 15, 
//             initial_growth: 5,
//             initial_capital_stock: 80,
//             initial_autonomous_imports: 3,
//             max_gDP_score: 8,
//             depreciation: 20,
//             impact_of_government_debt_on_investment_growth: 1,
//             impact_of_real_gdp_on_unemployment: 1,
//             portion_of_gdp_as_induced_import: 0.1,
//         },
//         input_value: {
//             interest_rate: 15,
//             vat_rate:	15,
//             corporate_tax_rate:	30,
//             government_expenditure_us: 	15,
//             import_tariff_rate:	10,
//         }, 
//         elasticity: {
//             perpetual_growth: 1,
//             impact_of_inflation_on_induced_consumption:	1.5,
//             impact_of_interest_rate_on_induced_consumption_change:0.75,
//             impact_of_interest_rate_on_induced_consumption_level:	0.25,
//             impact_of_interest_rate_on_induced_investment_change:	0.75,
//             impact_of_interest_rate_on_induced_investment_level:0.25,
//             impact_of_interest_rate_on_inflation:	1,
//             impact_of_inflation_expectation_on_inflation:	0.75,
//             impact_of_supply_and_demand_change_on_inflation:	0.3,
//             impact_of_interest_rate_differential_on_capital_flow:	3,
//             autonousmous_import:3,
//             impact_of_fx_rate_on_induced_import:	0.75,
//             height_of_sigmoid:	22.5,
//             width_of_sigmoid:	0.15,
//             position_of_sigmoid:74,
//             size_of_rewards:	2.5,
//         },
//         other_value: {
//             consumption: 0,
//             investment: 0, 
//             demand: 0,
//             supply: 60,
//             nominal: 0,
//             real_gdp: 0,
//             capital_growth: 0,
//             labor: 0,
//             technological: 0,
//             consumer_price_index: 0,
//             income_tax: 0,
//             corporate_tax: 0,
//             tariff_revanue: 0,
//             gov_debt: 0, 
//             debt_to_gdp: 0,
//             inflation: 3,
//             unemployment: 10,
//             exchage_rate: 100,
//             export_value: 0,
//             import_value: 0,
//             import_preTariff: 0,
//             trade_balance: 0,
//             net_capital: 0,
//             global_interestRate: 0,
//         }
//     }  
// }
// const china : Country = {
//     country_id: "2",  
//     name: "China",
//     cluster: {
//         name: "small",
//         preset_value: {
//             initial_consumption: 100,
//             initial_investment: 40,
//             initial_spending: 30, 
//             initial_growth: 4,
//             initial_capital_stock: 160,
//             initial_autonomous_imports: 4,
//             max_gDP_score: 6,
//             depreciation: 19,
//             impact_of_government_debt_on_investment_growth: .75,
//             impact_of_real_gdp_on_unemployment: 1.25,
//             portion_of_gdp_as_induced_import: .08,
//         },
//         input_value: {
//             interest_rate: 10,
//             vat_rate:	15,
//             corporate_tax_rate:	30,
//             government_expenditure_us: 	30,
//             import_tariff_rate:	10,
//         }, 
//         elasticity: {
//             perpetual_growth: 1,
//             impact_of_inflation_on_induced_consumption:	1.5,
//             impact_of_interest_rate_on_induced_consumption_change:0.75,
//             impact_of_interest_rate_on_induced_consumption_level:	0.25,
//             impact_of_interest_rate_on_induced_investment_change:	0.75,
//             impact_of_interest_rate_on_induced_investment_level:0.25,
//             impact_of_interest_rate_on_inflation:	1,
//             impact_of_inflation_expectation_on_inflation:	0.75,
//             impact_of_supply_and_demand_change_on_inflation:	0.3,
//             impact_of_interest_rate_differential_on_capital_flow:	3,
//             autonousmous_import:3,
//             impact_of_fx_rate_on_induced_import:	0.75,
//             height_of_sigmoid:	22.5,
//             width_of_sigmoid:	0.15,
//             position_of_sigmoid:74,
//             size_of_rewards:	2.5,
//         },
//         other_value: {
//             consumption: 0,
//             investment: 0, 
//             demand: 0,
//             supply: 120,
//             nominal: 0,
//             real_gdp: 0,
//             capital_growth: 0,
//             labor: 0,
//             technological: 0,
//             consumer_price_index: 0,
//             income_tax: 0,
//             corporate_tax: 0,
//             tariff_revanue: 0,
//             gov_debt: 0, 
//             debt_to_gdp: 0,
//             inflation: 3,
//             unemployment: 10,
//             exchage_rate: 100,
//             export_value: 0,
//             import_value: 0,
//             import_preTariff: 0,
//             trade_balance: 0,
//             net_capital: 0,
//             global_interestRate: 0,
//         } 
//   }  
// }
// const us : Country = {
//     country_id: "3",  
//     name: "United State",
//     cluster: {
//         name: "large",
//         preset_value: {
//             initial_consumption: 150,
//             initial_investment: 60,
//             initial_spending: 45, 
//             initial_growth: 3,
//             initial_capital_stock: 240,
//             initial_autonomous_imports: 5,
//             max_gDP_score: 4,
//             depreciation: 18,
//             impact_of_government_debt_on_investment_growth: .5,
//             impact_of_real_gdp_on_unemployment: 1.5,
//             portion_of_gdp_as_induced_import: .06,
//         },
//         input_value: {
//             interest_rate: 10,
//             vat_rate:	15,
//             corporate_tax_rate:	30,
//             government_expenditure_us: 	30,
//             import_tariff_rate:	10,
//         }, 
//         elasticity: {
//             perpetual_growth: 1,
//             impact_of_inflation_on_induced_consumption:	1.5,
//             impact_of_interest_rate_on_induced_consumption_change:0.75,
//             impact_of_interest_rate_on_induced_consumption_level:	0.25,
//             impact_of_interest_rate_on_induced_investment_change:	0.75,
//             impact_of_interest_rate_on_induced_investment_level:0.25,
//             impact_of_interest_rate_on_inflation:	1,
//             impact_of_inflation_expectation_on_inflation:	0.75,
//             impact_of_supply_and_demand_change_on_inflation:	0.3,
//             impact_of_interest_rate_differential_on_capital_flow:	3,
//             autonousmous_import:3,
//             impact_of_fx_rate_on_induced_import:	0.75,
//             height_of_sigmoid:	22.5,
//             width_of_sigmoid:	0.15,
//             position_of_sigmoid:74,
//             size_of_rewards:	2.5,
//         },
//         other_value: {
//             consumption: 0,
//             investment: 0, 
//             demand: 0,
//             supply: 120,
//             nominal: 0,
//             real_gdp: 0,
//             capital_growth: 0,
//             labor: 0,
//             technological: 0,
//             consumer_price_index: 0,
//             income_tax: 0,
//             corporate_tax: 0,
//             tariff_revanue: 0,
//             gov_debt: 0, 
//             debt_to_gdp: 0,
//             inflation: 3,
//             unemployment: 10,
//             exchage_rate: 100,
//             export_value: 0,
//             import_value: 0,
//             import_preTariff: 0,
//             trade_balance: 0,
//             net_capital: 0,
//             global_interestRate: 0,
//         }
//   }  
  
// }


function global_interestRate (room : Room) {
    let total_interestRate = 0
    room.team.forEach(team => {
      total_interestRate = total_interestRate + team.country.cluster.input_value.interest_rate
    })
    return parseFloat((total_interestRate/ room.team.length).toFixed(2))
}
  
  
function net_capital (country: CountryCluster, global_interestRate: number) {
    return country.input_value.interest_rate - global_interestRate
}
  
  
function consumption (country: CountryCluster){
    return country.preset_value.initial_consumption * (1 - country.input_value.vat_rate/100)
}
  
function investment(country: CountryCluster){
    return country.preset_value.initial_investment * (1 - country.input_value.corporate_tax_rate/100)
}
  
function demand(country: CountryCluster){
    return country.input_value.government_expenditure_us + consumption(country) + investment(country) + trade_balance(country)
}
  
function nominal_gdp(country: CountryCluster){
    return (demand(country) + country.other_value.supply)/2
}
  
function trade_balance(country:CountryCluster){
    return country.other_value.export_value - country.other_value.import_value
}
  
function income_tax(country:CountryCluster){
    return country.preset_value.initial_consumption * (country.input_value.vat_rate/100)
}
  
function corporate_tax(country:CountryCluster){
    return country.preset_value.initial_investment * (country.input_value.corporate_tax_rate/100)
}




// // Create room 
// function create_room (): Array<Country>  {
//   return [china, us, vietnam]
// }
// Calculate the rest value based on the preset value
function updateCountry(room : Room): Room {
  const updatedRoom: Room = {...room}


  const calculatedGlobalInterestRate = global_interestRate(updatedRoom);
  const import_and_export_value  = parseFloat((10 / room.team.length).toFixed(2))

  updatedRoom.team.forEach(team => {

    
    
    team.country.cluster.other_value = {
      consumption: consumption(team.country.cluster),
      investment: investment(team.country.cluster), 
      demand: demand(team.country.cluster),
      supply: team.country.cluster.other_value.supply,
      nominal: nominal_gdp(team.country.cluster),
      real_gdp: nominal_gdp(team.country.cluster),
      capital_growth: team.country.cluster.other_value.capital_growth,
      labor: team.country.cluster.other_value.labor,
      technological: team.country.cluster.other_value.technological,
      consumer_price_index: team.country.cluster.other_value.consumer_price_index,
      income_tax: income_tax(team.country.cluster),
      corporate_tax: corporate_tax(team.country.cluster),
      tariff_revanue: 0,
      gov_debt: 0, 
      debt_to_gdp: 0,
      exchage_rate: team.country.cluster.other_value.exchage_rate,
      export_value: import_and_export_value,
      import_value: import_and_export_value,
      import_preTariff: 0,
      trade_balance: trade_balance(team.country.cluster),
      net_capital: net_capital(team.country.cluster, calculatedGlobalInterestRate),
      global_interestRate: calculatedGlobalInterestRate,
      budget_surplus_billion: -0.4,
      budget_surplus_percent: -0.6
    }
  })
  return updatedRoom
}


export function useUpdateRoom (room: Room) : Room {
    return updateCountry(room)
}

// console.log(calculate_initial_value(create_room()))