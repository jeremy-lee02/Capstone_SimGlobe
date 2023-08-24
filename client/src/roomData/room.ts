export const roomTemplate = {
    room_id: "",
    team: [],
    status: true,
    round: 1,
    room_size: 4,
    key_time: ""
}
 
export const presetValue1 = {

}
export const presetValue2 = {

}
export const presetValue3 = {

}
export const presetValue4 = {

}

export const countryClusterTemplate = {
    name: "",
    // Create fixed 9 preset value for 9 cluster
    preset_value: presetValue1,
    input_value: {
        interest_rate: 15,
        vat_rate:	15,
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
}

// export const teamTemplate = {
//     team_id: "",
//     user: [],
//     country: {
//         country_id: "",  
//         name: "",
//         cluster: {
//             name: "",
//             preset_value: {
//                 initial_consumption: 50, // Pre-tax
//                 initial_investment: 20, // Pre-tax
//                 initial_spending: 15, 
//                 initial_growth: 5,
//                 initial_capital_stock: 80,
//                 initial_autonomous_imports: 3,
//                 max_gDP_score: 8,
//                 depreciation: 20,
//                 impact_of_government_debt_on_investment_growth: 1,
//                 impact_of_real_gdp_on_unemployment: 1,
//                 portion_of_gdp_as_induced_import: 0.1,
//                 inflation: 3,
//                 unemployment: 10,
//             },
//             input_value: {
//                 interest_rate: 15,
//                 vat_rate:	15,
//                 corporate_tax_rate:	30,
//                 government_expenditure_us: 	15,
//                 import_tariff_rate:	10,
//             }, 
//             elasticity: {
//                 perpetual_growth: 1,
//                 impact_of_inflation_on_induced_consumption:	1.5,
//                 impact_of_interest_rate_on_induced_consumption_change:0.75,
//                 impact_of_interest_rate_on_induced_consumption_level:	0.25,
//                 impact_of_interest_rate_on_induced_investment_change:	0.75,
//                 impact_of_interest_rate_on_induced_investment_level:0.25,
//                 impact_of_interest_rate_on_inflation:	1,
//                 impact_of_inflation_expectation_on_inflation:	0.75,
//                 impact_of_supply_and_demand_change_on_inflation:	0.3,
//                 impact_of_interest_rate_differential_on_capital_flow:	3,
//                 autonousmous_import:3,
//                 impact_of_fx_rate_on_induced_import:	0.75,
//                 height_of_sigmoid:	22.5,
//                 width_of_sigmoid:	0.15,
//                 position_of_sigmoid:74,
//                 size_of_rewards:	2.5,
//             },
//             other_value: {
//                 consumption: 0,
//                 investment: 0, 
//                 demand: 0,
//                 supply: 60,
//                 nominal: 0,
//                 real_gdp: 0,
//                 capital_growth: 0,
//                 labor: 1,
//                 technological: 2,
//                 consumer_price_index: 100,
//                 income_tax: 0,
//                 corporate_tax: 0,
//                 tariff_revanue: 0,
//                 gov_debt: 0, 
//                 debt_to_gdp: 60,
//                 exchage_rate: 100,
//                 export_value: 0,
//                 import_value: 0,
//                 import_preTariff: 0,
//                 trade_balance: 0,
//                 net_capital: 0,
//                 global_interestRate: 0,
//                 budget_surplus_billion: -0.4,
//                 budget_surplus_percent: -0.6
//             },
//             score: {
//                 gdp: {
//                     min: 0,
//                     max: 6,
//                 },
//                 unemployment: {
//                     min: 5,
//                     max: 15,
//                   },
//                 inflation: {
//                     second_min: 0,
//                     min: 0,
//                     max: 12,
//                 },
//                 budget_surplus: {
//                     min: -5,
//                     max: 5,
//                 },
//             }
    
//         },
//     max_player: 4,
//     score: 0
//     }
// }