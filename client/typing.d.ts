
export interface User {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string
}
export interface Team {
    team_id: string,
    user: Array<User>
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
    cluster: CountryCluster,
    input_value: InputValue,
    result_value: ResultValue,
}

export interface InputValue{
    name: string, 
    value: number,
    max: number,
    min: number
}

export interface ResultValue{
    id: string,
    name: string,
    value: number
}

export interface CountryCluster {
    cluster_id: string,
    name: string,
    elasticity: Array<Elasticity>,
    result: Result
}

export interface Result{
    result_id: string,
    name: string,
    max: number,
    min: number,
    second_max: number 
}

export interface Elasticity{
    elasticity_id: string,
    name: string,
    value: number,
}

//cpt: consumption pre-tax
// i: Investment,
// y: Nominal GDP,
// k: capital
export interface Prev_Value {
    prev_cpt: number,
    prev_supply: number,
    prev_i: number,
    prev_y: number,
    prev_y_percent: number,
    prev_k: number,
    prev_ipt: number,
    prev_d:number,
    prev_u: number,
    prev_fx: number
}