import { ClusterScore, Room, Team } from "../../typing";

export const score1: ClusterScore = {
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
export const score2: ClusterScore = {
    gdp: {
        min: 2,
        max: 8,
    },
    unemployment: {
        min: 3,
        max: 12,
      },
    inflation: {
        second_min: 0,
        min: 0,
        max: 15,
    },
    budget_surplus: {
        min: -5,
        max: 5,
    },
}
export const score3: ClusterScore = {
    gdp: {
        min: 1,
        max: 6,
    },
    unemployment: {
        min: 5,
        max: 15,
      },
    inflation: {
        second_min: 0,
        min: 0,
        max: 18,
    },
    budget_surplus: {
        min: -5,
        max: 5,
    },
}
export const score4: ClusterScore = {
    gdp: {
        min: 0,
        max: 6,
    },
    unemployment: {
        min: 6,
        max: 18,
      },
    inflation: {
        second_min: 0,
        min: 0,
        max: 12,
    },
    budget_surplus: {
        min: -10,
        max: 2,
    },
}
export const score5: ClusterScore = {
    gdp: {
        min: 0,
        max: 8,
    },
    unemployment: {
        min: 3,
        max: 12,
      },
    inflation: {
        second_min: 0,
        min: 0,
        max: 12,
    },
    budget_surplus: {
        min: -8,
        max: 0,
    },
}
export const score6: ClusterScore = {
    gdp: {
        min: 2,
        max: 8,
    },
    unemployment: {
        min: 1,
        max: 10,
      },
    inflation: {
        second_min: -2,
        min: 0,
        max: 6,
    },
    budget_surplus: {
        min: -10,
        max: -2,
    },
}
export const score7: ClusterScore = {
    gdp: {
        min: 0,
        max: 5,
    },
    unemployment: {
        min: 1,
        max: 10,
      },
    inflation: {
        second_min: -4,
        min: 0,
        max: 5,
    },
    budget_surplus: {
        min: -6,
        max: 2,
    },
}
export const score8: ClusterScore = {
    gdp: {
        min: 0,
        max: 5,
    },
    unemployment: {
        min: 2,
        max: 12,
      },
    inflation: {
        second_min: -1,
        min: 0,
        max: 7,
    },
    budget_surplus: {
        min: -10,
        max: -3,
    },
}
export const score9: ClusterScore = {
    gdp: {
        min: -1,
        max: 3,
    },
    unemployment: {
        min: 2,
        max: 8,
      },
    inflation: {
        second_min: -4,
        min: 0,
        max: 5,
    },
    budget_surplus: {
        min: -10,
        max: -3,
    },
}



function handle_score(team : Team): number{
    const score_gdp = gpd(team.country.cluster.other_value.real_gdp, team.country.cluster.score.gdp.min, team.country.cluster.score.gdp.max);
    const score_inflation = inflation(team.country.cluster.preset_value.inflation, team.country.cluster.score.inflation.min, team.country.cluster.score.inflation.max, team.country.cluster.score.inflation.second_min);
    const score_budget = budget(team.country.cluster.other_value.budget_surplus_billion, team.country.cluster.score.budget_surplus.min, team.country.cluster.score.budget_surplus.max);
    const score_unemployment = unemployment(team.country.cluster.preset_value.unemployment, team.country.cluster.score.unemployment.min, team.country.cluster.score.unemployment.max);
    return team.score + score_gdp + score_budget+ score_inflation + score_unemployment
}

function gpd (value: number, min: number, max: number): number {
    if(value >= max) return 25
    if(value <= min) return 0
    const value_percent = (value - min) / (max - min)
    const final_score = value_percent * 25
    return parseFloat(final_score.toFixed(1))
}
function unemployment (value: number, min: number, max: number): number {
    if(value >= max) return 0
    if(value <= min) return 25
    const value_percent = (value - min) / (max - min)
    const final_score = value_percent * 25
    return parseFloat((25 - final_score).toFixed(1))
}

function budget(value: number, min: number, max: number): number {
    if(value >= max) return 25
    if(value <= min) return 0
    const value_percent = (value - min) / (max - min)
    const final_score = value_percent * 25
    return parseFloat(final_score.toFixed(1))
}
function inflation(value: number, min: number, max: number, second_min: number): number {
    if(value >= max) return 0
    if(value === min) return 25
    if(value <= second_min) return 0
    if(value > min){
        const value_percent = (value - min) / (max - min)
        const finalScore = value_percent * 25;
        return parseFloat((25 - finalScore).toFixed(1));
    }else{
        const value_percent = (value - second_min) / (second_min - min)
        const finalScore = value_percent * 25;
        return parseFloat(finalScore.toFixed(1));
    }
}

export function calculate_score (room: Room): Room {
    if(room.round > 0){
        const updateRoom ={...room}
        updateRoom.team.forEach(team => {
            team.score = handle_score(team)
        })
        return updateRoom
    }
    return room
}