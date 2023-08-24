export interface Team {
    team_id: string,
    user: Array<string>
    country: Country,
    max_player: number,
    score: number
}
export interface Room {
    room_id: string,
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
    preset_value: PresetValue,
    other_value: OtherValue,
    score: ClusterScore
}

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
    perpetual_growth: {
        name: "Perpetual Growth",
        value: number
    },
    impact_of_inflation_on_induced_consumption: {
        name: "Impact of inflation on induced consumption",
        value: number
    },
    impact_of_interest_rate_on_induced_consumption_change: {
        name: "Impact of interest rate on induced consumption change",
        value: number
    },
    impact_of_interest_rate_on_induced_consumption_level: {
        name: "Impact of interest rate on induced consumption level",
        value: number
    },
    impact_of_interest_rate_on_induced_investment_change:{
        name: "Impact of interest rate on induced investment change",
        value: number
    },
    impact_of_interest_rate_on_induced_investment_level:{
        name: "Impact of interest rate on induced investment level",
        value: number
    },
    impact_of_interest_rate_on_inflation: {
        name: "Impact of interest rate on inflation",
        value: number
    },
    impact_of_inflation_expectation_on_inflation: {
        name: "Impact of inflation expectation  on inflation",
        value: number
    },
    impact_of_supply_and_demand_change_on_inflation: {
        name: "Impact of supply and demand change on inflation",
        value: number
    },
    impact_of_interest_rate_differential_on_capital_flow: {
        name: "Impact of interest rate differential on capital flow ",
        value: number
    },
    autonousmous_import: {
        name: "Autonousmous import",
        value: number
    },
    impact_of_fx_rate_on_induced_import: {
        name: "Impact of fx rate on induced import",
        value: number
    },
    height_of_sigmoid: {
        name: "Height of sigmoid",
        value: number
    },
    width_of_sigmoid: {
        name: "Width of sigmoid",
        value: number
    },
    position_of_sigmoid: {
        name: "Position of sigmoid",
        value: number
    },
    size_of_rewards: {
        name: "Size of rewards",
        value: number
    },
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
    budget_surplus_percent: number
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