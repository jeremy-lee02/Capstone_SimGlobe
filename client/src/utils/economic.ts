import { Prev_Value } from './../../typing.d';


// const prev_value: prev_value = {
//   prev_cpt: 150,
//   prev_supply: 180,
//   prev_i: 42,
//   prev_y: 191.3,
//   prev_y_percent: 0.1,
//   prev_k: 80,
//   prev_ipt: 20
// }

export default function useEconomic(interestRate :number, vatTaxRate :number, corporateTax: number, importTariffRate: number, government: number, prev_value: Prev_Value) {
  // **** Test value ****
  // Tech growth
  const a_percent: number = 0.2
  // Labor growth
  const l_percent: number = 0.3
  // Capital percent
  const k_percent: number = 0.25



  // **** Algorithms here ****
  // Consumption pre-tax
  const cpt = () : number =>{
    // R% is based on the R of year -1. This is to let interest rate directly influence inflation. 
    // Note from the sheets file E26
    const result = prev_value.prev_cpt * (prev_value.prev_y_percent - p_percent() - interestRate - 1 - interestRate )
    return result
  }

  // Consumption
  const c = () : number => {
    return cpt() * (1 - vatTaxRate)
  }

  // Investment Pre-tax
  const ipt = () : number =>{
    const result = prev_value.prev_ipt + Math.abs(prev_value.prev_ipt) * (prev_value.prev_y_percent - interestRate - 1 -interestRate + d_over_y())
    return result
  }

  //Debt to GDP
  const d_over_y = () : number => {
    return d()/ y()
  }

  // Investment
  const i = () : number =>{
    return ipt() * (1 - corporateTax)
  }

  // TODO:
  // Capital
  // Last-year K - Depreciation + I
  // Hết cứu 
  const k = () : number =>{
    return 0
  }

  // Supply Side GDP 
  const ys = () : number =>{
    return prev_value.prev_supply * (k_percent * a_percent * l_percent)
  }

  // Demand Side GDP 
  const yd = () : number =>{
    return c() + i() + government + nx()
  }

  // Nominal GDP 
  const y = () : number =>{
    return (ys()+yd())/2
  }

  // Consumer Price Index
  const p = () : number =>{
    return 0
  }

  // Government debt
  const d = () : number => {
    return prev_value.prev_d + (ct() + it() + mt() - government)
  }

  // Income Tax
  const ct = () : number => {
    return cpt() * vatTaxRate
  }

  // Corporate Tax
  const it = () : number => {
    return ipt() * corporateTax
  }
  
  // Import tariff
  const mt = () : number => {
    return mpt() * importTariffRate
  }

  // TODO:
  // Inflation
  const p_percent = () : number => {
    return 0
  }

  // TODO:
  // Trade Balance
  const nx = () : number => {
    return 0
  }

  // TODO:
  //Import pre-tariff
  const mpt = () : number => {
    return 0
  }

  // TODO:
  // Real gdp 
  // (Y/Products of all inflation available)
  // Hết cứu
  const yr = () : number => {
    return 0
  }

  // TODO:
  // Unemployment
  // Last-year U + 0.25*(F t-1 - F t-2) - Yr
  const u = () : number => {
    return 0
  }

  // TODO:
  // Exchange Rate
  // Last-year FX * (1-(NX+CF)/(X+M))
  const fx = () : number => {
    return 0
  }

  // TODO:
  // Export
  // "Total Export of that country to others. X2-1 depends on M1 and FX2, 3, 4. X2-1 = M1/(# of countries)*(1 + FX2-FXavg./100)"
  const x = () : number => {
    return 0
  }

  // Import
  // M pt * (1 - Mtr)
  const m = () : number => {
    return mpt() * (1 - importTariffRate)
  }

  // Net capital flow
  // R - Rg
  const cf = () : number => {
    return interestRate - rg()
  }

  // TODO:
  // Global interest rate
  // Avg. of R of all countries
  const rg = () : number => {
    return 0
  }

  return {cpt, p, y, k, i, ipt, c}
}




