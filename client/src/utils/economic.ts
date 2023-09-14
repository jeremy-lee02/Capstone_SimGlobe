
import { CountryCluster, InputValue, Room, OtherValue, Elasticity, PresetValue, ClusterScore } from "../../typing"
import { budget_score, gpd_score, inflation_score, unemployment_score } from "./score"




interface UserInput {
    name: number, // Country ID
    input: InputValue
}



function check_input_value(
    team_id: number,
    userInput: Array<UserInput>,
    inputValue: InputValue
  ): UserInput {
    let newInput = {
      name: 0,
      input: inputValue,
    };
    userInput.forEach(u => {
      if (u.name === team_id) {
        newInput = { ...newInput, name: u.name, input: u.input };
      }
    });
    return newInput;
  }
  
  // consumption pre-tax
  function consumption_pre_tax_function(
    country: CountryCluster,
    newInput: InputValue
  ) {
    const last_year_Y_percent =
      country.other_value.nominal + country.elasticity.perpetual_growth;
    const inflation =
      Math.abs(country.preset_value.inflation) *
      country.elasticity.impact_of_inflation_on_induced_consumption;
    const interestRate_change =
      country.elasticity.impact_of_interest_rate_on_induced_consumption_change *
      (-country.input_value.interest_rate + newInput.interest_rate);
    const interest_rate_level =
      country.elasticity.impact_of_interest_rate_on_induced_consumption_level *
      (-country.input_value.interest_rate + newInput.interest_rate);
  
    return (
      country.other_value.consumption_pre_tax *
      (1 +
        (last_year_Y_percent -
          inflation -
          interestRate_change -
          interest_rate_level) /
          100)
    );
  }
  
  function investment_pre_tax_function(
    country: CountryCluster,
    newInput: InputValue
  ) {
    const last_year_Y_percent = country.other_value.nominal;
    const r =
      country.elasticity.impact_of_interest_rate_on_induced_investment_change *
      (-country.input_value.interest_rate + newInput.interest_rate);
    const r_percent =
      country.elasticity.impact_of_interest_rate_on_induced_investment_level *
      country.input_value.interest_rate;
    const new_gov_debt_percent = country.other_value.debt_to_gdp;
    const sigmoid =
      (country.elasticity.height_of_sigmoid *
        Math.exp(
          country.elasticity.width_of_sigmoid *
            (new_gov_debt_percent - country.elasticity.position_of_sigmoid)
        )) /
        (Math.exp(
          country.elasticity.width_of_sigmoid *
            (new_gov_debt_percent - country.elasticity.position_of_sigmoid)
        ) +
          1) +
      country.elasticity.size_of_rewards;
    return (
      country.other_value.investment_pre_tax +
      (Math.abs(country.other_value.investment_pre_tax) *
        (last_year_Y_percent -
          r -
          r_percent +
          parseFloat(sigmoid.toFixed(2)) *
            country.preset_value
              .impact_of_government_debt_on_investment_growth)) /
        100
    );
  }
  
  function global_interestRate_function(userInput: Array<UserInput>) {
    let total_interestRate = 0;
    userInput.forEach(i => {
      total_interestRate = total_interestRate + i.input.interest_rate;
    });
    return parseFloat((total_interestRate / userInput.length).toFixed(2));
  }
  
  function income_tax_function(
    newInput: InputValue,
    consumption_pre_tax: number
  ) {
    return (consumption_pre_tax * newInput.vat_rate) / 100;
  }
  function investment_function(newInput: InputValue, investment_pre_tax: number) {
    return investment_pre_tax * (1 - newInput.corporate_tax_rate / 100);
  }
  
  function consumption_function(
    newInput: InputValue,
    consumption_pre_tax: number
  ) {
    return consumption_pre_tax * (1 - newInput.vat_rate / 100);
  }
  
  function import_preTariff_function(country: CountryCluster) {
    const a =
      country.preset_value.initial_autonomous_imports +
      country.preset_value.portion_of_gdp_as_induced_import *
        country.other_value.nominal;
    const b =
      ((country.other_value.exchage_rate - 100) *
        country.elasticity.impact_of_fx_rate_on_induced_import) /
        100 +
      1;
    return a / b;
  }
  
  function import_value_function(newInput: InputValue, import_preTariff: number) {
    return import_preTariff * (1 - newInput.import_tariff_rate / 100);
  }
  
  function gov_tariff_billion_function(
    importTarif: number,
    import_value: number
  ) {
    return importTarif - import_value;
  }
  function corporate_tax_function(
    newInput: InputValue,
    investment_pre_tax: number
  ) {
    return (investment_pre_tax * newInput.corporate_tax_rate) / 100;
  }
  function budget_surplus_billion_function(
    newInput: InputValue,
    corporate_tax_revanue: number,
    vat_revanue: number,
    tariff_revanue: number
  ) {
    return (
      vat_revanue +
      corporate_tax_revanue +
      tariff_revanue -
      newInput.government_expenditure_us
    );
  }
  
  function export_value_function(export_info: Array<any>, countryName: string) {
    // Filter the input country
    const filtered_export_info = export_info.filter(e => e.name !== countryName);
    let result = 0;
    filtered_export_info.forEach(f => {
      f.value.forEach((value: { name: string; export_to: number }) => {
        if (value.name === countryName) {
          result = result + value.export_to;
        }
      });
    });
    return result;
  }
  
  function net_capital_function(
    newInput: InputValue,
    elasticity: Elasticity,
    global_interestRate: number
  ) {
    return (
      (newInput.interest_rate - global_interestRate) *
      elasticity.impact_of_interest_rate_differential_on_capital_flow
    );
  }
  
  function exchage_rate_function(
    export_value: number,
    import_value: number,
    trade_balance: number,
    net_capital: number
  ) {
    return 1 - (trade_balance + net_capital) / (export_value + import_value);
  }
  
  function capital_stock_function(
    investment: number,
    preset: PresetValue,
    other_value: OtherValue
  ) {
    const result =
      other_value.capital_stock -
      (other_value.capital_stock * preset.depreciation) / 100 +
      investment;
    if (result > 0) return result;
    return 0;
  }
  
  function supply_function(
    other_value: OtherValue,
    capital_growth: number,
    labor: number,
    technological: number
  ) {
    const list_value = [capital_growth, labor, technological];
    let product_function = 1;
    list_value.forEach(l => {
      product_function = product_function * (1 + l / 100);
    });
    return other_value.supply * product_function;
  }
  
  function consumer_price_index_function(
    round: number,
    other_value: OtherValue,
    elasticity: Elasticity,
    supply: number,
    demand: number,
    prevInput: InputValue,
    newInput: InputValue
  ) {
    const demand_over_supply =
      (demand / other_value.demand / (supply / other_value.supply) - 1) *
        elasticity.impact_of_supply_and_demand_change_on_inflation +
      1;
    const f_t_1 =
      1 +
      other_value.inflation *
        (elasticity.impact_of_inflation_expectation_on_inflation / 100);
    const interest_rate_calculation =
      1 -
      ((newInput.interest_rate - prevInput.interest_rate) *
        elasticity.impact_of_interest_rate_on_inflation) /
        100;
    const final_result =
      other_value.consumer_price_index *
      demand_over_supply *
      f_t_1 *
      interest_rate_calculation;
    // console.log("demand",other_value.demand)
    // console.log("supply" ,other_value.supply)
    return final_result;
  }
  
  function real_gdp_function(nominal_gdp: number, consumer_price_index: number) {
    return nominal_gdp / (consumer_price_index / 100);
  }
  
  function unemployment_function(
    other_value: OtherValue,
    preset_value: PresetValue
  ) {
    const condition =
      other_value.unemployment +
      0.25 *
        (other_value.inflation -
          preset_value.impact_of_government_debt_on_investment_growth *
            other_value.real);
    if (condition < 0) return 0;
    return (
      other_value.unemployment +
      0.25 *
        (other_value.inflation -
          preset_value.impact_of_government_debt_on_investment_growth -
          other_value.real)
    );
  }

function calculate_score(unemployment: number, inflation: number, budget_value: number, realGDP: number, score:ClusterScore){
    const score1 = unemployment_score(unemployment, score.unemployment.min, score.unemployment.max)
    const score2 = inflation_score(inflation, score.inflation.min, score.inflation.max, score.inflation.second_min)
    const score3 = budget_score(budget_value, score.budget_surplus.min, score.budget_surplus.max)
    const score4 = gpd_score(realGDP, score.gdp.min, score.gdp.max)
    return score1 + score2 + score3 + score4
}
// Calculate the rest value based on the preset value
export function updateCountry(room : Room, userInput: Array<UserInput>): Room {
    const updatedRoom: Room = {...room}
    
    let sum_exchageRate_lastYear = 0;
    // Update value based on formula.
    updatedRoom.team.forEach(team => {
        const newInput = check_input_value(parseFloat(team.team_id) - 1, userInput, team.country.cluster.input_value)
        // Calculate value that does not cotain the current country in this loop
        const global_interestRate = global_interestRate_function(userInput)
        const consumption_pre_tax = consumption_pre_tax_function(team.country.cluster, newInput.input)
        const investment_pre_tax = investment_pre_tax_function(team.country.cluster, newInput.input)
        const income_tax = income_tax_function(newInput.input, consumption_pre_tax)
        const corporate_tax_revanue = corporate_tax_function(newInput.input, investment_pre_tax)
        const investment = investment_function(newInput.input, investment_pre_tax)
        const consumption = consumption_function(newInput.input, consumption_pre_tax)
        const import_preTariff = import_preTariff_function(team.country.cluster)
        const import_value = import_value_function(newInput.input, import_preTariff)
        const tariff_revanue = gov_tariff_billion_function(import_preTariff, import_value)
        const budget_surplus_billion = budget_surplus_billion_function(newInput.input,income_tax, corporate_tax_revanue, tariff_revanue)
        // Calculate export
        sum_exchageRate_lastYear = sum_exchageRate_lastYear + team.country.cluster.other_value.exchage_rate
        const export_info = updatedRoom.team.map(team => {
            const average_exchageRate_lastYear = (sum_exchageRate_lastYear - team.country.cluster.other_value.exchage_rate) / (updatedRoom.team.length - 1)
            const export_percent = import_value/ (room.room_size - 1)
            const otherCountry_value = room.team.filter(t => t.country.name !== team.country.name).map(e => {
                return {
                    name: e.country.name,
                    export_to: export_percent + export_percent * (e.country.cluster.other_value.exchage_rate - average_exchageRate_lastYear)/100
                }
            })
            return {
                name: team.country.name,
                value: otherCountry_value
            }

        })
        const export_value = export_value_function(export_info, team.country.name)
        const trade_balance = export_value - import_value
        const net_capital =  net_capital_function(newInput.input, team.country.cluster.elasticity, global_interestRate)
        const exchage_rate = team.country.cluster.other_value.exchage_rate * exchage_rate_function(export_value,import_value,trade_balance, net_capital)
        const demand = consumption + newInput.input.government_expenditure_us + investment + trade_balance
        const capital_stock = capital_stock_function(investment, team.country.cluster.preset_value, team.country.cluster.other_value)
        const capital_growth = (capital_stock - team.country.cluster.other_value.capital_stock) / team.country.cluster.other_value.capital_stock * 100
        const labor = team.country.cluster.other_value.labor + team.country.cluster.other_value.labor
        const technological = team.country.cluster.other_value.technological + team.country.cluster.other_value.technological
        const supply = supply_function(team.country.cluster.other_value, capital_growth, labor, technological)
        const nominal_gdp = (demand + supply)/2
        const consumer_price_index = consumer_price_index_function(updatedRoom.round,team.country.cluster.other_value,team.country.cluster.elasticity, supply, demand, team.country.cluster.input_value, newInput.input)
        const inflation = (consumer_price_index - team.country.cluster.other_value.consumer_price_index)/ team.country.cluster.other_value.consumer_price_index * 100
        const real_gdp = real_gdp_function(nominal_gdp, consumer_price_index)
        const real = (real_gdp - team.country.cluster.other_value.real_gdp) / team.country.cluster.other_value.real_gdp * 100
        const nominal = (nominal_gdp - team.country.cluster.other_value.nominal_gdp) / team.country.cluster.other_value.nominal_gdp * 100
        const budget_surplus_percent = budget_surplus_billion/nominal_gdp * 100
        const gov_debt = team.country.cluster.other_value.gov_debt - budget_surplus_billion
        const debt_to_gdp = gov_debt/nominal_gdp * 100
        const unemployment = unemployment_function(team.country.cluster.other_value, team.country.cluster.preset_value)

        // Update value:
        team.country.cluster.other_value = {
            ...team.country.cluster.other_value,
            consumption: parseFloat(consumption.toFixed(2)),
            investment: parseFloat(investment.toFixed(2)), 
            demand: parseFloat(demand.toFixed(2)),
            supply: parseFloat(supply.toFixed(2)),
            nominal: parseFloat(nominal.toFixed(2)),
            real_gdp: parseFloat(real_gdp.toFixed(2)),
            capital_growth: parseFloat(capital_growth.toFixed(2)),
            labor: labor,
            technological: technological,
            consumer_price_index: parseFloat(consumer_price_index.toFixed(2)),
            income_tax: parseFloat(income_tax.toFixed(2)),
            corporate_tax: parseFloat(corporate_tax_revanue.toFixed(2)),
            tariff_revanue: parseFloat(tariff_revanue.toFixed(2)),
            gov_debt: parseFloat(gov_debt.toFixed(2)), 
            debt_to_gdp: parseFloat(debt_to_gdp.toFixed(2)),
            exchage_rate: parseFloat(exchage_rate.toFixed(2)),
            export_value: parseFloat(export_value.toFixed(2)),
            import_value: parseFloat(import_value.toFixed(2)),
            import_preTariff: parseFloat(import_preTariff.toFixed(2)),
            trade_balance: parseFloat(trade_balance.toFixed(2)),
            net_capital: parseFloat(net_capital.toFixed(2)),
            global_interestRate: parseFloat(global_interestRate.toFixed(2)),
            budget_surplus_billion: parseFloat(budget_surplus_billion.toFixed(2)),
            budget_surplus_percent: parseFloat(budget_surplus_percent.toFixed(2)),
            nominal_gdp: parseFloat(nominal_gdp.toFixed(2)),
            real: parseFloat(real.toFixed(2)),
            consumption_pre_tax: parseFloat(consumption_pre_tax.toFixed(2)),
            investment_pre_tax: parseFloat(investment_pre_tax.toFixed(2)),
            capital_stock: parseFloat(capital_stock.toFixed(2)),
            inflation: parseFloat(inflation.toFixed(2)),
            unemployment: parseFloat(unemployment.toFixed(2))
        }
    })
    // Update scores and input values.
    updatedRoom.team.forEach(team => {
        const newInput = check_input_value(parseFloat(team.team_id) - 1, userInput, team.country.cluster.input_value)
        const newTeamScore = calculate_score(team.country.cluster.other_value.unemployment, team.country.cluster.other_value.inflation, team.country.cluster.other_value.budget_surplus_percent, team.country.cluster.other_value.real, team.country.cluster.score) 
        team.score = team.score + newTeamScore
        team.country.cluster.input_value = newInput.input
    })

  return updatedRoom
}



