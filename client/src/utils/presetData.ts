import { PresetValue } from "../../typing"

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
export const preset3 = {
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
export const preset4 = {
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
export const preset5 = {
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
export const preset6 = {
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
export const preset7 = {
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
export const preset8 = {
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
export const preset9 = {
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

// Function handle data when changing cluster



// export function handleClusterChange(name: string, data: Array<Object>){
//     const newData = [...data]
//     switch (name) {
//         case "small_small":
            
//             break;
//         case "small_medium":
//             data.value = score2
//             break;
//         case "small_big":
//             data.value = score3
//             break;
//         case "medium_small":
//             data.value = score4
//             break;
//         case "medium_medium":
//             data.value = score5
//             break;
//         case "medium_big":
//             data.value = score6
//             break;
//         case "big_small":
//             data.value = score7
//             break;
//         case "big_medium":
//             data.value = score8
//             break;
//         case "big_big":
//             data.value = score9
//             break;
    
//         default:
//             break;
//     }
// }

const initialPresetData = [
    { label: 'Initial Consumption', value: 0 },
    { label: 'Initial Investment', value: 0 },
    { label: 'Initial Spending', value: 0 },
    { label: 'Initial Growth', value: 0 },
    { label: 'Initial Capital Stock', value: 0 },
    { label: 'Initial Autonomous Imports', value: 0 },
    { label: 'Max GDP Score', value: 0 },
    { label: 'Depreciation', value: 0 },
    { label: 'Impact of Government Debt on Investment Growth', value: 0 },
    { label: 'Impact of Real GDP on Unemployment', value: 0 },
    { label: 'Portion of GDP as Induced Import', value: 0 },
    { label: 'Unemployment', value: 0 },
  ];

export function updatePresetData(label:string, preset: PresetValue): number {
    let result = 0
    switch (label) {
        case "Initial Consumption":
            result =  preset.initial_consumption
            break;
        case "Initial Investment":
            result =  preset.initial_investment
            break;
        case "Initial Spending":
            result =  preset.initial_spending
            break;
        case "Initial Growth":
            result =  preset.initial_growth
            break;
        case "Initial Capital Stock":
            result =  preset.initial_capital_stock
            break;
        case "Initial Autonomous Imports":
            result =  preset.initial_autonomous_imports
            break;
        case "Depreciation":
            result =  preset.depreciation
            break;
        case "Impact of Government Debt on Investment Growth":
            result =  preset.impact_of_government_debt_on_investment_growth
            break;
        case "Impact of Real GDP on Unemployment":
            result =  preset.impact_of_real_gdp_on_unemployment
            break;
        case "Portion of GDP as Induced Import":
            result =  preset.portion_of_gdp_as_induced_import
            break;
        case "Unemployment":
            result =  preset.unemployment
            break;
        case "Inflation":
            result =  preset.inflation
            break;
        case "Max GDP Score":
            result =  preset.max_gDP_score
            break;
        default:
            break;
    }
    return result
}

export function check_and_update_PresetData(label:string, value:number, preset: PresetValue): PresetValue {
    let result = {...preset}
    switch (label) {
        case "Initial Consumption":
            result.initial_consumption = value
            break;
        case "Initial Investment":
            result.initial_investment = value
            break;
        case "Initial Spending":
            result.initial_spending = value
            break;
        case "Initial Growth":
            result.initial_growth = value
            break;
        case "Initial Capital Stock":
            result.initial_capital_stock = value
            break;
        case "Initial Autonomous Imports":
            result.initial_autonomous_imports = value
            break;
        case "Depreciation":
            result.depreciation = value
            break;
        case "Impact of Government Debt on Investment Growth":
            result.impact_of_government_debt_on_investment_growth = value
            break;
        case "Impact of Real GDP on Unemployment":
            result.impact_of_real_gdp_on_unemployment = value
            break;
        case "Portion of GDP as Induced Import":
            result.portion_of_gdp_as_induced_import = value
            break;
        case "Unemployment":
            result.unemployment = value
            break;
        case "Inflation":
            result.inflation = value
            break;
        case "Max GDP Score":
            result.max_gDP_score = value
            break;
        default:
            break;
    }
    return result
}