export interface Team {
    team_id: string,
    user: Array<string>
    country: Country,
    max_player: number,
    score: number
}
export interface Room {
    team: Array<Team>,
    status: boolean,
    round: number,
    room_size: number,
    key_time: string
}
export interface Country {
    country_id: string,
    name: string,
    cluster: CountryCluster
}


export interface CountryCluster {
    name: string,
    elasticity: Elasticity,
    input_value: InputValue
    preset_value: PresetValue ,
    other_value: OtherValue,
    score: ClusterScore
}

// export interface Preset_Value {
//     name: string,
//     value: number
// }

export interface PresetValue {
    initial_consumption: number,
    initial_investment: number,
    initial_spending: number, 
    initial_growth: number,
    initial_capital_stock: number,
    initial_autonomous_imports: number,
    max_gDP_score: number,
    depreciation: number,
    impact_of_government_debt_on_investment_growth: number,
    impact_of_real_gdp_on_unemployment: number,
    portion_of_gdp_as_induced_import: number,
    unemployment: number, 
    inflation: number
}

export interface Elasticity {
    perpetual_growth: number,
    impact_of_inflation_on_induced_consumption: number,
    impact_of_interest_rate_on_induced_consumption_change: number,
    impact_of_interest_rate_on_induced_consumption_level: number,
    impact_of_interest_rate_on_induced_investment_change: number,
    impact_of_interest_rate_on_induced_investment_level: number,
    impact_of_interest_rate_on_inflation: number,
    impact_of_inflation_expectation_on_inflation: number,
    impact_of_supply_and_demand_change_on_inflation: number,
    impact_of_interest_rate_differential_on_capital_flow: number,
    autonousmous_import: number,
    impact_of_fx_rate_on_induced_import: number,
    height_of_sigmoid: number,
    width_of_sigmoid: number,
    position_of_sigmoid: number,
    size_of_rewards:number,
}

export interface OtherValue {
    consumption: number,
    investment: number, 
    demand: number,
    supply: number,
    nominal: number,
    real_gdp: number,
    capital_growth: number,
    labor: number,
    technological: number,
    consumer_price_index: number,
    income_tax: number,
    corporate_tax: number,
    tariff_revanue: number,
    gov_debt: number, 
    debt_to_gdp: number,
    exchage_rate: number,
    export_value: number,
    import_value: number,
    import_preTariff: number,
    trade_balance: number,
    net_capital: number,
    global_interestRate: number,
    budget_surplus_billion: number,
    budget_surplus_percent: number,
    nominal_gdp: number,
    real:number
}

export interface InputValue {
    interest_rate: number,
    vat_rate: number,
    corporate_tax_rate:	number,
    government_expenditure_us: number,
    import_tariff_rate: number,
}

export interface ClusterScore  {
    gdp: {
      min: number,
      max: number,
    },
    unemployment: {
        min: number,
        max: number,
    },
    inflation: {
        second_min: number,
        min: number,
        max: number,
    },
    budget_surplus: {
        min: number,
        max: number,
    },
};
