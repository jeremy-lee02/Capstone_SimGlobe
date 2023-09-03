import { Country, CountryCluster, Elasticity, Room, Team, ClusterScore, PresetValue } from "../../typing"

import { input1,  input2,  input3 } from "./inputs";


const country_template : Country = {
    country_id: "",  
    name: "",
    cluster: {
        name: "",
        preset_value: {
            initial_consumption: 50, // Pre-tax
            initial_investment: 20, // Pre-tax
            initial_spending: 15, 
            initial_growth: 5,
            initial_capital_stock: 80,
            initial_autonomous_imports: 3,
            max_gDP_score: 8,
            depreciation: 20,
            impact_of_government_debt_on_investment_growth: 1,
            impact_of_real_gdp_on_unemployment: 1,
            portion_of_gdp_as_induced_import: 0.1,
            inflation: 3,
            unemployment: 10,
        },
        input_value: {
            interest_rate: 15,
            vat_rate:15,
            corporate_tax_rate:	30,
            government_expenditure_us: 	15,
            import_tariff_rate:	10,
        }, 
        elasticity: {
            perpetual_growth: 1,
            impact_of_inflation_on_induced_consumption:	1.5,
            impact_of_interest_rate_on_induced_consumption_change:0.75,
            impact_of_interest_rate_on_induced_consumption_level:	0.25,
            impact_of_interest_rate_on_induced_investment_change:	0.75,
            impact_of_interest_rate_on_induced_investment_level:0.25,
            impact_of_interest_rate_on_inflation:	1,
            impact_of_inflation_expectation_on_inflation:	0.75,
            impact_of_supply_and_demand_change_on_inflation:	0.3,
            impact_of_interest_rate_differential_on_capital_flow:	3,
            autonousmous_import:3,
            impact_of_fx_rate_on_induced_import:	0.75,
            height_of_sigmoid:	22.5,
            width_of_sigmoid:	0.15,
            position_of_sigmoid:74,
            size_of_rewards:	2.5,
        },
        other_value: {
            consumption: 0,
            investment: 0, 
            demand: 0,
            supply: 60,
            nominal: 0,
            real_gdp: 0,
            capital_growth: 0,
            labor: 1,
            technological: 2,
            consumer_price_index: 100,
            income_tax: 0,
            corporate_tax: 0,
            tariff_revanue: 0,
            gov_debt: 0, 
            debt_to_gdp: 60,
            exchage_rate: 100,
            export_value: 0,
            import_value: 0,
            import_preTariff: 0,
            trade_balance: 0,
            net_capital: 0,
            global_interestRate: 0,
            budget_surplus_billion: -0.4,
            budget_surplus_percent: -0.6
        },
        score: {
            gdp: {
                min: 0,
                max: 6,
            },
            unemployment: {
                min: 5,
                max: 15,
              },
            inflation: {
                second_min: 0,
                min: 0,
                max: 12,
            },
            budget_surplus: {
                min: -5,
                max: 5,
            },
        }

    },
      
}

const elasticities_template: Elasticity = {
    perpetual_growth: 1,
    impact_of_inflation_on_induced_consumption:	1.5,
    impact_of_interest_rate_on_induced_consumption_change:0.75,
    impact_of_interest_rate_on_induced_consumption_level:	0.25,
    impact_of_interest_rate_on_induced_investment_change:	0.75,
    impact_of_interest_rate_on_induced_investment_level:0.25,
    impact_of_interest_rate_on_inflation:	1,
    impact_of_inflation_expectation_on_inflation:	0.75,
    impact_of_supply_and_demand_change_on_inflation:	0.3,
    impact_of_interest_rate_differential_on_capital_flow:	3,
    autonousmous_import:3,
    impact_of_fx_rate_on_induced_import:	0.75,
    height_of_sigmoid:	22.5,
    width_of_sigmoid:	0.15,
    position_of_sigmoid:74,
    size_of_rewards:	2.5,
} 

const countryGroups = [
    {
      title: 'small_small:',
      countries: ['Vanuatu', 'Micronesia', 'Cabo Verde', 'Lesotho'],
    },
    {
      title: 'small_medium',
      countries: ['Cambodia', 'Lao', 'Honduras', 'Zimbabwe', 'Tajikistan'],
    },
    {
      title: 'small_big',
      countries: ['Congo', 'Nepal', 'Bangladesh', 'Nigeria'],
    },
    {
      title: 'medium_small',
      countries: ['Jamaica', 'Kosovo', 'Namibia'],
    },
    {
      title: 'medium_medium',
      countries: ['Uruguay', 'Bulgaria', 'Mongolia', 'Jordan'],
    },
    {
      title: 'medium_big',
      countries: ['Argentina', 'Thailand', 'Vietnam', 'Brazil', 'Mexico', 'Philippines', 'Indonesia', 'China', 'Colombia', 'Egypt'],
    },
    {
      title: 'big_small',
      countries: ['Brunei', 'Luxembourg', 'Malta', 'Singapore', 'Switzerland', 'Norway'],
    },
    {
      title: 'big_medium',
      countries: ['Ireland', 'New Zealand', 'Israel', 'United Arab Emirates', 'India', 'Russia', 'France'],
    },
    {
      title: 'big_big',
      countries: ['USA', 'Japan', 'Germany', 'UK', 'Australia', 'Korea'],
    },
];






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

function import_pre_tariff(country: CountryCluster){
    return 10 * (1 + country.input_value.import_tariff_rate/100)
}

function govDebtUs(country: CountryCluster) {
    return parseFloat((debt_to_gdp() * nominal_gdp(country)/100).toFixed(2))
}

function tariff_revanue(country:CountryCluster){
    return parseFloat((import_pre_tariff(country) - import_value(country)).toFixed(1))
}

function import_value(country: CountryCluster){
    return import_pre_tariff(country) * (1- country.input_value.import_tariff_rate/100)
}
function debt_to_gdp(){
    return 60
} //Government Debt as % of GDP


function export_value(room: Room){
    // Calculate average exchange rate.
     const updateRoom = {...room}
     let sum_of_exchangeRate = -100
     console.log(sum_of_exchangeRate)
     room.team.forEach(team => {
         sum_of_exchangeRate = sum_of_exchangeRate + team.country.cluster.other_value.exchage_rate
     });
     console.log(sum_of_exchangeRate)
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

//Check country cluster
function check_country_cluster(country: string): string {
    let result = ""
    countryGroups.forEach(c => {
        if(c.countries.includes(country)) result= c.title
    });
    return result
}
//Check score cluster
function set_score_range (cluster: CountryCluster, rules:{[key: string]: ClusterScore}) : CountryCluster {
    const updatedCluster = {...cluster}
    switch (updatedCluster.name) {
        case "small_small":
            updatedCluster.score = rules["small_small"]
            break;
        case "small_medium":
            updatedCluster.score = rules["small_medium"]
            break;
        case "small_big":
            updatedCluster.score = rules["small_big"]
            break;
        case "medium_small":
            updatedCluster.score = rules["medium_small"]
            break;
        case "medium_medium":
            updatedCluster.score = rules["medium_medium"]
            break;
        case "medium_big":
            updatedCluster.score = rules["medium_big"]
            break;
        case "big_small":
            updatedCluster.score = rules["big_small"]
            break;
        case "big_medium":
            updatedCluster.score = rules["big_medium"]
            break;
        case "big_big":
            updatedCluster.score = rules["big_big"]
            break;
    
        default:
            break;
    }
    return updatedCluster
}
//Check preset value cluster
function set_preset (cluster: CountryCluster, presets:{[key: string]: PresetValue}) : CountryCluster {
    const updatedCluster = {...cluster}
    switch (updatedCluster.name) {
        case "small_small":
            updatedCluster.preset_value = presets["small_small"]
            break;
        case "small_medium":
            updatedCluster.preset_value = presets["small_medium"]
            break;
        case "small_big":
            updatedCluster.preset_value = presets["small_big"]
            break;
        case "medium_small":
            updatedCluster.preset_value = presets["medium_small"]
            break;
        case "medium_medium":
            updatedCluster.preset_value = presets["medium_medium"]
            break;
        case "medium_big":
            updatedCluster.preset_value = presets["medium_big"]
            break;
        case "big_small":
            updatedCluster.preset_value = presets["big_small"]
            break;
        case "big_medium":
            updatedCluster.preset_value = presets["big_medium"]
            break;
        case "big_big":
            updatedCluster.preset_value = presets["big_big"]
            break;
    
        default:
            break;
    }
    return updatedCluster
}
// Check input value cluster
function set_input (cluster: CountryCluster) : CountryCluster {
    const updatedCluster = {...cluster}
    switch (updatedCluster.name) {
        case "small_small":
            updatedCluster.input_value = input1
            break;
        case "small_medium":
            updatedCluster.input_value = input1
            break;
        case "small_big":
            updatedCluster.input_value = input1
            break;
        case "medium_small":
            updatedCluster.input_value = input2
            break;
        case "medium_medium":
            updatedCluster.input_value = input2
            break;
        case "medium_big":
            updatedCluster.input_value = input2
            break;
        case "big_small":
            updatedCluster.input_value = input3
            break;
        case "big_medium":
            updatedCluster.input_value = input3
            break;
        case "big_big":
            updatedCluster.input_value = input3
            break;
    
        default:
            break;
    }
    return updatedCluster
}
// Create room 
export function create_new_room (countries: Array<string>, rules:{[key: string]: ClusterScore}, presets: {[key: string]: PresetValue}): Room  {
    let team: Array<Team> = []
    let id = 1
    countries.forEach(c => {
        const newTeam: Team = {
            team_id: id.toFixed(0),
            user: [],
            country: country_template,
            max_player: 4,
            score: 0
        }
        const updateTeam: Team = {...newTeam}
        updateTeam.country.country_id = id.toFixed(0)
        // Set country name
        updateTeam.country = {...updateTeam.country, name: c}
        // Check country cluster based on the name
        updateTeam.country.cluster = {...updateTeam.country.cluster, name: check_country_cluster(c)}
        // Update elasticities
        updateTeam.country.cluster = {...updateTeam.country.cluster, elasticity: elasticities_template} // Replace the elasticities_template by input the elasticities object from the client.
        // Update score
        updateTeam.country.cluster = {...updateTeam.country.cluster, score: set_score_range(updateTeam.country.cluster, rules).score}
        // Update preset value
        updateTeam.country.cluster = {...updateTeam.country.cluster, preset_value: set_preset(updateTeam.country.cluster, presets).preset_value}
        //Update input value
        updateTeam.country.cluster = {...updateTeam.country.cluster, input_value: set_input(updateTeam.country.cluster).input_value}

        team.push(updateTeam)
        id++
    })

    const room : Room = {
        team: team, // After finished the above logic, replace this array to team 
        status: false,
        round: 1,
        room_size: countries.length,
        key_time: "1 hour"
    }
    return room
}

// Calculate the rest value based on the preset value
function calculate_initial_value(room : Room): Room {
  const updatedRoom: Room = {... room}


  const calculatedGlobalInterestRate = global_interestRate(updatedRoom);

  updatedRoom.team.forEach(team => {
    team.country.cluster.other_value = {
      consumption: consumption(team.country.cluster),
      investment: investment(team.country.cluster), 
      demand: demand(team.country.cluster),
      supply: team.country.cluster.other_value.supply,
      nominal: nominal_gdp(team.country.cluster),
      real_gdp: nominal_gdp(team.country.cluster),
      capital_growth: team.country.cluster.other_value.capital_growth,
      labor: 1,
      technological: 2,
      consumer_price_index: team.country.cluster.other_value.consumer_price_index,
      income_tax: income_tax(team.country.cluster),
      corporate_tax: corporate_tax(team.country.cluster),
      tariff_revanue: tariff_revanue(team.country.cluster),
      gov_debt: govDebtUs(team.country.cluster), 
      debt_to_gdp: debt_to_gdp(),
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
  })
  const newUpdateRoom = export_value(updatedRoom)
  return newUpdateRoom
}


export function finalizeRoom (countries: Array<string>, rules:{[key: string]: ClusterScore}, presets: {[key: string]: PresetValue}) : Room {
    return calculate_initial_value(create_new_room(countries,rules, presets))
}


