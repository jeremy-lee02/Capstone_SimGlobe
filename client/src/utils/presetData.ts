export const preset1 = {
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
}
export const preset2 = {
    initial_consumption: 100, // Pre-tax
    initial_investment: 40, // Pre-tax
    initial_spending: 30, 
    initial_growth: 4,
    initial_capital_stock: 160,
    initial_autonomous_imports: 4,
    max_gDP_score: 6,
    depreciation: 19,
    impact_of_government_debt_on_investment_growth: 0.75,
    impact_of_real_gdp_on_unemployment: 1.25,
    portion_of_gdp_as_induced_import: 0.08,
    inflation: 3,
    unemployment: 8,
}
export const preset3 = {
    initial_consumption: 150,
    initial_investment: 60,
    initial_spending: 45, 
    initial_growth: 3,
    initial_capital_stock: 240,
    initial_autonomous_imports: 5,
    max_gDP_score: 4,
    depreciation: 18,
    impact_of_government_debt_on_investment_growth: .5,
    impact_of_real_gdp_on_unemployment: 1.5,
    portion_of_gdp_as_induced_import: .06,
    inflation: 3,
    unemployment: 6,
}



const array_of_preset = [
    {
        name: "small_small",
        preset: preset1
    },
    {
        name: "small_medium",
        preset: preset2
    },
    {
        name: "small_small",
        preset: preset3
    },
    {
        name: "small_small",
        preset: preset3
    },
    {
        name: "small_small",
        preset: preset3
    },
    {
        name: "small_small",
        preset: preset3
    },
    {
        name: "small_small",
        preset: preset3
    },
    {
        name: "small_small",
        preset: preset3
    },
    {
        name: "small_small",
        preset: preset3
    },
]