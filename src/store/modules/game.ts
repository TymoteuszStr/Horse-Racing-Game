import type { Horse } from '@/types/horse'
import type { Module } from 'vuex'
import type { RootState } from '@/store'
import type { RaceRound } from '@/types/RaceRound'

export interface GameState {
  horseList: Horse[]
  raceSchedule: RaceRound[]
}
const state = (): GameState => ({
  horseList: [],
  raceSchedule: [] as RaceRound[],
})
const mutations = {
  setHorseList(state: GameState, horses: Horse[]) {
    console.log('Setting horse list:', horses)
    state.horseList = horses
  },
  setRaceSchedule(state: GameState, schedule: RaceRound[]) {
    state.raceSchedule = schedule
    console.log('Schedule set:', state.raceSchedule)
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
}

const module: Module<GameState, RootState> = {
  state,
  mutations,
  actions,
  getters,
}

export default module
