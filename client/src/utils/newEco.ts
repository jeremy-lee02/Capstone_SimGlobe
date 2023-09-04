import { CountryCluster, InputValue, Room } from "../../typing"




interface UserInput {
    name: string,
    input: InputValue
}






function global_interestRate (userInput: Array<UserInput>) {
    let total_interestRate = 0
    userInput.forEach(i => {
      total_interestRate = total_interestRate + i.input.interest_rate
    })
    return parseFloat((total_interestRate/ userInput.length).toFixed(2))
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
  
function trade_balance(country: CountryCluster){
    return country.other_value.export_value - country.other_value.import_value
}
  
function income_tax(country:CountryCluster){
    return country.preset_value.initial_consumption * (country.input_value.vat_rate/100)
}
  
function corporate_tax(country:CountryCluster){
    return country.preset_value.initial_investment * (country.input_value.corporate_tax_rate/100)
}

function import_pre_tariff(country: CountryCluster){
    return 10 * (1 + country.input_value.import_tariff_rate/100)
}

function govDebtUs(country: CountryCluster) {
    if(country.other_value.gov_debt - budget_surplus_billion(country) > 0) return country.other_value.gov_debt - budget_surplus_billion(country)
    return 0 
}

function tariff_revanue(country:CountryCluster){
    return parseFloat((import_pre_tariff(country) - import_value(country)).toFixed(1))
}

function import_value(country: CountryCluster){
    return import_pre_tariff(country) * (1- country.input_value.import_tariff_rate/100)
}
function debt_to_gdp(country: CountryCluster){
    return govDebtUs(country)/nominal_gdp(country) * 100
} //Government Debt as % of GDP


function export_value(room: Room){
    // Calculate average exchange rate.
     const updateRoom = {...room}
     let sum_of_exchangeRate = -100
     console.log(sum_of_exchangeRate)
     room.team.forEach(team => {
         sum_of_exchangeRate = sum_of_exchangeRate + team.country.cluster.other_value.exchage_rate
     });
     const average_exchageRate = sum_of_exchangeRate / (room.team.length - 1)
     // Calculate the percentages of export in that country
     const country_export = room.team.map((t)=>{
         return {
             country: t.country.name,
             export_value: t.country.cluster.other_value.import_value / (room.team.length - 1),
             exchange_rate: t.country.cluster.other_value.exchage_rate
         }
     }) 
     // [{country: Vietnam, export: 9.9}, {country: Us, export: 9.9}]
 
     // Calculate other countries export to that country
     const export_to = country_export.map(c => {
         const new_country = {
             country: c.country,
         }
         let import_countries = []
         for (let index = 0; index < room.team.length; index++) {
             if(room.team[index].country.name === new_country.country) continue
             let imported = {
                 country: room.team[index].country.name,
                 export: c.export_value + c.export_value * ((c.exchange_rate - average_exchageRate)/100)
             }
             import_countries.push(imported)
         }
 
         return {... new_country, imported_country: import_countries}
     })
     // Calculate the sum of that country export to other countries
 
     updateRoom.team.forEach(t => {
         let sum_export = 0
         export_to.forEach(element => {
             element?.imported_country.forEach(c =>{
                 if (c.country !== t.country.name) return
                 sum_export = sum_export + c.export
             })
         });
         t.country.cluster.other_value = {
             ...t.country.cluster.other_value,
         export_value: sum_export
     }
     })
     console.log(export_to)
     console.log(country_export)
     
     return updateRoom
}


//budget_surplus_billion

function budget_surplus_billion(country:CountryCluster){
    return income_tax(country) + corporate_tax(country) + tariff_revanue(country) - country.input_value.government_expenditure_us
}

//budget_surplus_percent
function budget_surplus_percent(country:CountryCluster){
    return budget_surplus_billion(country)/nominal_gdp(country) * 100
}


// Initial consumption pre-tax

function consumption_pre_tax(country: CountryCluster, newInput: InputValue) {
    const last_year_Y_percent = country.other_value.nominal + country.elasticity.perpetual_growth
    const inflation = Math.abs(country.preset_value.inflation) * country.elasticity.impact_of_inflation_on_induced_consumption
    const interestRate_change = country.elasticity.impact_of_interest_rate_on_induced_consumption_change * (-country.input_value.interest_rate + newInput.interest_rate)
    const interest_rate_level =  country.elasticity.impact_of_interest_rate_on_induced_consumption_level * (-country.input_value.interest_rate + newInput.interest_rate)

    return country.preset_value.initial_consumption  * (1 + (last_year_Y_percent - inflation - interestRate_change - interest_rate_level)/100)
}
function investment_pre_tax(country: CountryCluster, newInput: InputValue) {
    const last_year_Y_percent = country.other_value.nominal
    const r_percent = country.elasticity.impact_of_interest_rate_on_induced_investment_change * (-country.input_value.interest_rate + newInput.interest_rate)
    const r =  country.elasticity.impact_of_interest_rate_on_induced_investment_level * country.input_value.interest_rate
    const new_gov_debt_percent = debt_to_gdp(country)
    const sigmoid = country.elasticity.height_of_sigmoid * Math.exp(country.elasticity.height_of_sigmoid * (new_gov_debt_percent -country.elasticity.position_of_sigmoid))/ (Math.exp(country.elasticity.height_of_sigmoid * (new_gov_debt_percent -country.elasticity.position_of_sigmoid))+ 1) + country.elasticity.size_of_rewards
    return country.preset_value.initial_investment + Math.abs(country.preset_value.initial_investment) * (last_year_Y_percent - r_percent - r + parseFloat(sigmoid.toFixed(2)) * country.preset_value.impact_of_government_debt_on_investment_growth)/100

    
}

function capital_stock(country: CountryCluster){
    return country.preset_value.initial_capital_stock - country.preset_value.depreciation + investment(country)
}

function capital_growth(country: CountryCluster){
    return (capital_stock(country) - country.other_value.capital_growth) / country.preset_value.initial_capital_stock * 100
}
function supply(country:CountryCluster){
    let product_function = 1;
    const growth = [capital_growth(country), country.other_value.labor, country.other_value.technological] // labor and technological might growth 2% annually
    growth.forEach(g => {
        product_function *= 1 + g/100 
    });
    return country.other_value.supply * product_function
}  

// function consumer_price_index (country:CountryCluster){
    
// }







// Calculate the rest value based on the preset value
function updateCountry(room : Room, userInput: Array<UserInput>): Room {
  const updatedRoom: Room = {...room}


  const calculatedGlobalInterestRate = global_interestRate(userInput);

  updatedRoom.team.forEach(team => {
    const newInput = userInput.find(i => i.name === team.country.name)!
    team.country.cluster.preset_value = {
        ...team.country.cluster.preset_value,
        initial_consumption: consumption_pre_tax(team.country.cluster, newInput.input),
        initial_investment: investment_pre_tax(team.country.cluster, newInput.input)
    }
    // Update capital stock 
    team.country.cluster.preset_value = {
        ...team.country.cluster.preset_value,
        initial_capital_stock: capital_stock(team.country.cluster)
    }
    team.country.cluster.other_value = {
      consumption: consumption(team.country.cluster),
      investment: investment(team.country.cluster), 
      demand: demand(team.country.cluster),
      supply: team.country.cluster.other_value.supply,
      nominal: nominal_gdp(team.country.cluster),
      real_gdp: nominal_gdp(team.country.cluster),
      capital_growth: capital_growth(team.country.cluster),
      labor: 1,
      technological: 2,
      consumer_price_index: team.country.cluster.other_value.consumer_price_index,
      income_tax: income_tax(team.country.cluster),
      corporate_tax: corporate_tax(team.country.cluster),
      tariff_revanue: tariff_revanue(team.country.cluster),
      gov_debt: govDebtUs(team.country.cluster), 
      debt_to_gdp: debt_to_gdp(team.country.cluster),
      exchage_rate: team.country.cluster.other_value.exchage_rate,
      export_value: 0,
      import_value: import_value(team.country.cluster),
      import_preTariff: import_pre_tariff(team.country.cluster),
      trade_balance: trade_balance(team.country.cluster),
      net_capital: net_capital(team.country.cluster, calculatedGlobalInterestRate),
      global_interestRate: calculatedGlobalInterestRate,
      budget_surplus_billion: budget_surplus_billion(team.country.cluster),
      budget_surplus_percent: budget_surplus_percent(team.country.cluster)
    }
    // Update consumption pre-tax, investment pre-tax
  })
  const newUpdateRoom = export_value(updatedRoom)
  return newUpdateRoom
}


export function useUpdateRoom (room: Room, userInput: Array<UserInput>) : Room {
    return updateCountry(room, userInput)
}

