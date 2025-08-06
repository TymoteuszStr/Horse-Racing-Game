import type { Horse } from '@/types/horse'
import type { Module } from 'vuex'
import type { RootState } from '@/store'
import type { RaceRound } from '@/types/RaceRound'
import type { RaceResult } from '@/types/RaceResult'

export interface GameState {
  horseList: Horse[]
  raceSchedule: RaceRound[]
  raceResults: RaceResult[]
}
const state = (): GameState => ({
  horseList: [],
  raceSchedule: [] as RaceRound[],
  raceResults: [] as RaceResult[],
})
const mutations = {
  setHorseList(state: GameState, horses: Horse[]) {
    state.horseList = horses
  },
  setRaceResults(state: GameState, results: RaceResult[]) {
    console.log('Setting race results:', results)
    state.raceResults = results
  },
  setRaceSchedule(state: GameState, schedule: RaceRound[]) {
    state.raceSchedule = schedule
  },
  updateHorseCondition(state: GameState, payload: { id: number; conditionScore: number }) {
    const horse = state.horseList.find((h) => h.id === payload.id)
    if (horse) {
      horse.conditionScore = payload.conditionScore
    }
  },
}
const actions = {}
const getters = {
  horseList(state: GameState): Horse[] {
    return state.horseList
  },
  raceSchedule(state: GameState): RaceRound[] {
    return state.raceSchedule
  },
  raceResults(state: GameState): RaceResult[] {
    return state.raceResults
  },
}

const module: Module<GameState, RootState> = {
  state,
  mutations,
  actions,
  getters,
}

export default module
