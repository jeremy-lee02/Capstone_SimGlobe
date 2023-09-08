import { useEffect } from "react";
import { Country, CountryCluster, Elasticity, Room, Team, ClusterScore, PresetValue } from "../../typing"

import { input1,  input2,  input3 } from "./inputs";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";



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
            budget_surplus_percent: -0.6,
            nominal_gdp: 0,
            real: 0,
            consumption_pre_tax: 0,
            investment_pre_tax: 0,
            unemployment: 0,
            inflation: 0, 
            capital_stock: 0
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

function nominal_growth(country: CountryCluster){
    const prev_nominal = (100 - country.preset_value.initial_growth) /100 * nominal_gdp(country)
    return (nominal_gdp(country) - prev_nominal)/ prev_nominal * 100

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
    return import_value(country) - import_value(country) 
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
export function create_new_room (countries: Array<string>, rules:{[key: string]: ClusterScore}, presets: {[key: string]: PresetValue}, elasticity: any): Room  {
    let team: Array<Team> = []
    let id = 1
    countries.forEach(c => {
        const newTeam: Team = {
            team_id: id.toFixed(0),
            user: [],
            device: [],
            turn: 0,
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
        const elasticities_template: Elasticity = {
            perpetual_growth: elasticity.perpetualGrowth,
            impact_of_inflation_on_induced_consumption:	elasticity.inflation,
            impact_of_interest_rate_on_induced_consumption_change: elasticity.IRC,
            impact_of_interest_rate_on_induced_consumption_level: elasticity.IIRIC,
            impact_of_interest_rate_on_induced_investment_change: elasticity.IIRII,
            impact_of_interest_rate_on_induced_investment_level:elasticity.IRLII,
            impact_of_interest_rate_on_inflation: elasticity.IIRI,
            impact_of_inflation_expectation_on_inflation: elasticity.IIEI,
            impact_of_supply_and_demand_change_on_inflation: elasticity.SDI,
            impact_of_interest_rate_differential_on_capital_flow: elasticity.IIRD,
            autonousmous_import: elasticity.AI,
            impact_of_fx_rate_on_induced_import: elasticity.IFRII,
            height_of_sigmoid: elasticity.HS,
            width_of_sigmoid: elasticity.WS,
            position_of_sigmoid: elasticity.PS,
            size_of_rewards: elasticity.SR,
        } 
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
          consumption: parseFloat(consumption(team.country.cluster).toFixed(2)),
          investment: parseFloat(investment(team.country.cluster).toFixed(2)), 
          demand: parseFloat(demand(team.country.cluster).toFixed(2)),
          supply: parseFloat(team.country.cluster.other_value.supply.toFixed(2)),
          nominal: parseFloat(nominal_growth(team.country.cluster).toFixed(2)),
          real_gdp: parseFloat(nominal_gdp(team.country.cluster).toFixed(2)),
          capital_growth: parseFloat(team.country.cluster.other_value.capital_growth.toFixed(2)),
          labor: 1,
          technological: 2,
          consumer_price_index: parseFloat(team.country.cluster.other_value.consumer_price_index.toFixed(2)),
          income_tax: parseFloat(income_tax(team.country.cluster).toFixed(2)),
          corporate_tax: parseFloat(corporate_tax(team.country.cluster).toFixed(2)),
          tariff_revanue: parseFloat(tariff_revanue(team.country.cluster).toFixed(2)),
          gov_debt: parseFloat(govDebtUs(team.country.cluster).toFixed(2)), 
          debt_to_gdp: parseFloat(debt_to_gdp().toFixed(2)),
          exchage_rate: parseFloat(team.country.cluster.other_value.exchage_rate.toFixed(2)),
          import_value: parseFloat(import_value(team.country.cluster).toFixed(2)), // At the start, export and import equals
          export_value: parseFloat(import_value(team.country.cluster).toFixed(2)), // At the start, export and import equals
          import_preTariff: parseFloat(import_pre_tariff(team.country.cluster).toFixed(2)),
          trade_balance: parseFloat(trade_balance(team.country.cluster).toFixed(2)),
          net_capital: parseFloat(net_capital(team.country.cluster, calculatedGlobalInterestRate).toFixed(2)),
          global_interestRate: parseFloat(calculatedGlobalInterestRate.toFixed(2)),
          budget_surplus_billion: parseFloat(budget_surplus_billion(team.country.cluster).toFixed(2)),
          budget_surplus_percent: parseFloat(budget_surplus_percent(team.country.cluster).toFixed(2)),
          nominal_gdp: parseFloat(nominal_gdp(team.country.cluster).toFixed(2)),
          real: parseFloat(nominal_growth(team.country.cluster).toFixed(2)),
          consumption_pre_tax: team.country.cluster.preset_value.initial_consumption,
          investment_pre_tax: team.country.cluster.preset_value.initial_investment,
          unemployment: team.country.cluster.preset_value.unemployment,
          inflation: team.country.cluster.preset_value.inflation, 
          capital_stock: team.country.cluster.preset_value.initial_capital_stock
        }
    })
    return updatedRoom
}






export function finalizeRoom (countries: Array<string>, rules:{[key: string]: ClusterScore}, presets: {[key: string]: PresetValue}, elasticity: any) : Room {
    const newRoom = calculate_initial_value(create_new_room(countries,rules, presets, elasticity))
    const countryInput = newRoom.team.map(team => {
        return {
            name: team.country.name,
            input: team.country.cluster.input_value
        }
    })
    localStorage.setItem("country_inputs", JSON.stringify(countryInput)) // Set countries inputs 
    return newRoom
}


