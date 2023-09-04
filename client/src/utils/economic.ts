
import { CountryCluster, InputValue, Room, OtherValue, Team } from "../../typing"
import { budget, gpd, inflation, unemployment } from "./score"




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
  
  
function net_capital (country: CountryCluster, global_interestRate: number, newInput: InputValue) {
    return newInput.interest_rate - global_interestRate
}
  
  
function consumption (country: CountryCluster, newInput: InputValue){
    return country.preset_value.initial_consumption * (1 - newInput.vat_rate/100)
}
  
function investment(country: CountryCluster, newInput: InputValue){
    return country.preset_value.initial_investment * (1 - newInput.corporate_tax_rate/100)
}
  
function demand(country: CountryCluster, newInput: InputValue, room: Room, countryName:string){
    return newInput.government_expenditure_us + consumption(country, newInput) + investment(country, newInput) + trade_balance(country, newInput, room, countryName)
}
  
function nominal_gdp(country: CountryCluster, newInput: InputValue, room: Room, countryName:string){
    return (demand(country, newInput, room, countryName) + country.other_value.supply)/2
}
function nominal_growth(country: CountryCluster, newInput: InputValue, room: Room, countryName:string){
    // console.log(country.other_value.nominal_gdp)
    // console.log(nominal_gdp(country, newInput, room, countryName))
    return (nominal_gdp(country, newInput, room, countryName) - country.other_value.nominal_gdp)/ country.other_value.nominal_gdp * 100

}
function trade_balance(country: CountryCluster, newInput: InputValue, room: Room, countryName:string){
    return export_value(room, countryName) - import_value(country, newInput)
}



// function exchange_rate(country: CountryCluster, newInput: InputValue, room: Room) {
//     return country.other_value.exchage_rate * (1 - ())
// }
  
function income_tax(country:CountryCluster, newInput: InputValue){
    return country.preset_value.initial_consumption * (newInput.vat_rate/100)
}
  
function corporate_tax(country:CountryCluster, newInput: InputValue){
    return country.preset_value.initial_investment * (newInput.corporate_tax_rate/100)
}

function import_pre_tariff(country: CountryCluster, newInput: InputValue){
    return 10 * (1 + newInput.import_tariff_rate/100)
}

function govDebtUs(country: CountryCluster, newInput: InputValue) {
    if(country.other_value.gov_debt - budget_surplus_billion(country, newInput) > 0) return country.other_value.gov_debt - budget_surplus_billion(country, newInput)
    return 0 
} //TODO: Recheck the formula

function tariff_revanue(country:CountryCluster, newInput: InputValue){
    return parseFloat((import_pre_tariff(country, newInput) - import_value(country, newInput)).toFixed(1))
}

function import_value(country: CountryCluster, newInput: InputValue){
    return import_pre_tariff(country, newInput) * (1- newInput.import_tariff_rate/100)
}
function debt_to_gdp(country: CountryCluster, newInput: InputValue, room: Room, countryName:string){
    return govDebtUs(country, newInput)/nominal_gdp(country, newInput, room, countryName) * 100
} //Government Debt as % of GDP


function export_value(room: Room, countryName: string){
    // Calculate average exchange rate.
     const updateRoom = {...room}
     let sum_of_exchangeRate = -100
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
     // Return the country value
     const country_value = updateRoom.team.find(t => t.country.name === countryName)!
     return country_value?.country.cluster.other_value.export_value
}


//budget_surplus_billion

function budget_surplus_billion(country:CountryCluster, newInput: InputValue){
    return income_tax(country, newInput) + corporate_tax(country, newInput) + tariff_revanue(country, newInput) - newInput.government_expenditure_us
}

//budget_surplus_percent
function budget_surplus_percent(country:CountryCluster, newInput: InputValue, room: Room, countryName:string){
    return budget_surplus_billion(country, newInput)/nominal_gdp(country, newInput, room, countryName) * 100
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
    const new_gov_debt_percent = country.other_value.debt_to_gdp
    const sigmoid = country.elasticity.height_of_sigmoid * Math.exp(country.elasticity.height_of_sigmoid * (new_gov_debt_percent -country.elasticity.position_of_sigmoid))/ (Math.exp(country.elasticity.height_of_sigmoid * (new_gov_debt_percent -country.elasticity.position_of_sigmoid))+ 1) + country.elasticity.size_of_rewards
    return country.preset_value.initial_investment + Math.abs(country.preset_value.initial_investment) * (last_year_Y_percent - r_percent - r + parseFloat(sigmoid.toFixed(2)) * country.preset_value.impact_of_government_debt_on_investment_growth)/100

    
}

function capital_stock(country: CountryCluster, newInput: InputValue){
    return country.preset_value.initial_capital_stock - country.preset_value.depreciation + investment(country, newInput)
}

function capital_growth(country: CountryCluster, newInput: InputValue){
    return (capital_stock(country, newInput) - country.other_value.capital_growth) / country.preset_value.initial_capital_stock * 100
}
function supply(country:CountryCluster, newInput: InputValue){
    let product_function = 1;
    const growth = [capital_growth(country, newInput), country.other_value.labor, country.other_value.technological] // labor and technological might growth 2% annually
    growth.forEach(g => {
        product_function *= 1 + g/100 
    });
    return country.other_value.supply * product_function
}  

// function consumer_price_index (country:CountryCluster){
    
// }



// function handle_score(team : Team): number{
//     const score_gdp = gpd(team.country.cluster.other_value.real_gdp, team.country.cluster.score.gdp.min, team.country.cluster.score.gdp.max);
//     const score_inflation = inflation(team.country.cluster.preset_value.inflation, team.country.cluster.score.inflation.min, team.country.cluster.score.inflation.max, team.country.cluster.score.inflation.second_min);
//     const score_budget = budget(team.country.cluster.other_value.budget_surplus_billion, team.country.cluster.score.budget_surplus.min, team.country.cluster.score.budget_surplus.max);
//     const score_unemployment = unemployment(team.country.cluster.preset_value.unemployment, team.country.cluster.score.unemployment.min, team.country.cluster.score.unemployment.max);
//     return team.score + score_gdp + score_budget+ score_inflation + score_unemployment
// }



// Calculate the rest value based on the preset value
function updateCountry(room : Room, userInput: Array<UserInput>): Room {
    const updatedRoom: Room = {...room, round: room.round++}


    const calculatedGlobalInterestRate = global_interestRate(userInput);

    updatedRoom.team.forEach(team => {
        const cloneCluster = team.country.cluster
        const newInput = userInput.find(i => i.name === team.country.name)!
        //Calculate other_value
        console.log(cloneCluster.preset_value.initial_consumption)
        cloneCluster.preset_value = {
            ...cloneCluster.preset_value,
            initial_consumption: consumption_pre_tax(cloneCluster, newInput.input),
            initial_investment: investment_pre_tax(cloneCluster, newInput.input)
        }
        // console.log(team.country.cluster.preset_value.initial_consumption)
        // Update capital stock 
        cloneCluster.preset_value = {
            ...cloneCluster.preset_value,
            initial_capital_stock: capital_stock(cloneCluster, newInput.input)
        }
        cloneCluster.other_value = {
        consumption: consumption(cloneCluster, newInput.input),
        investment: investment(cloneCluster, newInput.input), 
        demand: demand(cloneCluster, newInput.input, room, team.country.name),
        supply: supply(team.country.cluster, newInput.input),
        nominal: nominal_growth(cloneCluster, newInput.input, room, team.country.name),
        real_gdp: 0,
        capital_growth: capital_growth(cloneCluster, newInput.input),
        labor: cloneCluster.other_value.labor + 1,
        technological: cloneCluster.other_value.technological + 2,
        consumer_price_index: cloneCluster.other_value.consumer_price_index,
        income_tax: income_tax(cloneCluster, newInput.input),
        corporate_tax: corporate_tax(cloneCluster, newInput.input),
        tariff_revanue: tariff_revanue(cloneCluster, newInput.input),
        gov_debt: govDebtUs(cloneCluster, newInput.input), 
        debt_to_gdp: debt_to_gdp(cloneCluster, newInput.input, room, team.country.name),
        exchage_rate: 85,
        export_value: export_value(room, team.country.name),
        import_value: import_value(cloneCluster, newInput.input),
        import_preTariff: import_pre_tariff(cloneCluster, newInput.input),
        trade_balance: trade_balance(cloneCluster, newInput.input, room, team.country.name),
        net_capital: net_capital(cloneCluster, calculatedGlobalInterestRate, newInput.input),
        global_interestRate: calculatedGlobalInterestRate,
        budget_surplus_billion: budget_surplus_billion(cloneCluster, newInput.input),
        budget_surplus_percent: budget_surplus_percent(cloneCluster, newInput.input, room, team.country.name),
        nominal_gdp: nominal_gdp(cloneCluster, newInput.input, room, team.country.name),
        real: 0
        }
    })
        // const prevCluster = {...team.country.cluster}
        // team.country.cluster = {
        //     ...team.country.cluster,
        //     input_value: newInput.input,
        //     preset_value:{
        //         initial_consumption: consumption_pre_tax(prevCluster, newInput.input),
        //         initial_investment: investment_pre_tax(prevCluster, newInput.input),
        //         initial_spending: 15, 
        //         initial_growth: 5,
        //         initial_capital_stock: 80,
        //         initial_autonomous_imports: 3,
        //         max_gDP_score: 8,
        //         depreciation: 20,
        //         impact_of_government_debt_on_investment_growth: 1,
        //         impact_of_real_gdp_on_unemployment: 1,
        //         portion_of_gdp_as_induced_import: 0.1,
        //         inflation: 3,
        //         unemployment: 10,
        //     },
        //     other_value: {
        //         consumption: consumption(prevCluster, newInput.input),
        //         investment: investment(prevCluster, newInput.input), 
        //         demand: demand(prevCluster, newInput.input, room, team.country.name),
        //         supply: supply(prevCluster, newInput.input),
        //         nominal: nominal_growth(prevCluster, newInput.input, room, team.country.name),
        //         real_gdp: 0,
        //         capital_growth: capital_growth(prevCluster, newInput.input),
        //         labor: prevCluster.other_value.labor + 1,
        //         technological: prevCluster.other_value.technological + 2,
        //         consumer_price_index: prevCluster.other_value.consumer_price_index,
        //         income_tax: income_tax(prevCluster, newInput.input),
        //         corporate_tax: corporate_tax(prevCluster, newInput.input),
        //         tariff_revanue: tariff_revanue(prevCluster, newInput.input),
        //         gov_debt: govDebtUs(prevCluster, newInput.input), 
        //         debt_to_gdp: debt_to_gdp(prevCluster, newInput.input, room, team.country.name),
        //         exchage_rate: prevCluster.other_value.exchage_rate,
        //         export_value: export_value(room, team.country.name),
        //         import_value: import_value(prevCluster, newInput.input),
        //         import_preTariff: import_pre_tariff(prevCluster, newInput.input),
        //         trade_balance: trade_balance(prevCluster, newInput.input, room, team.country.name),
        //         net_capital: net_capital(prevCluster, calculatedGlobalInterestRate, newInput.input),
        //         global_interestRate: calculatedGlobalInterestRate,
        //         budget_surplus_billion: budget_surplus_billion(prevCluster, newInput.input),
        //         budget_surplus_percent: budget_surplus_percent(prevCluster, newInput.input, room, team.country.name),
        //         nominal_gdp: nominal_gdp(prevCluster, newInput.input, room, team.country.name),
        //         real: 0
        //     }
        // }

//   })

    console.log(updatedRoom.team[1])
  return updatedRoom
}


export function useUpdateRoom (room: Room, userInput: Array<UserInput>) : Room {
    return updateCountry(room, userInput)
}

