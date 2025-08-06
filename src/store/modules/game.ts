import type { Horse } from '@/types/horse'
import type { Module } from 'vuex'
import type { RootState } from '@/store'
import type { RaceRound } from '@/types/RaceRound'
import type { RaceResult } from '@/types/RaceResult'

export interface GameState {
  horseList: Horse[]
  raceSchedule: RaceRound[]
  raceResults: { [roundNumber: number]: RaceResult[] }
  isRaceStarted: boolean
  currentRound: number
}
const state = (): GameState => ({
  horseList: [],
  raceSchedule: [] as RaceRound[],
  raceResults: {} as { [roundNumber: number]: RaceResult[] },
  isRaceStarted: false,
  currentRound: 0,
})
const mutations = {
  setCurrentRound(state: GameState, round: number) {
    state.currentRound = round
  },
  incrementCurrentRound(state: GameState) {
    if (state.currentRound >= 6) return
    state.currentRound++
  },
  setRaceStarted(state: GameState, isStarted: boolean) {
    state.isRaceStarted = isStarted
  },
  setHorseList(state: GameState, horses: Horse[]) {
    state.horseList = horses
  },
  setRaceResults(
    state: GameState,
    { roundNumber, results }: { roundNumber: number; results: RaceResult[] },
  ) {
    state.raceResults[roundNumber] = results
  },
  resetRaceResults(state: GameState) {
    state.raceResults = {}
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
  currentRound(state: GameState): number {
    return state.currentRound
  },
  isRaceStarted(state: GameState): boolean {
    return state.isRaceStarted
  },
  horseList(state: GameState): Horse[] {
    return state.horseList
  },
  raceSchedule(state: GameState): RaceRound[] {
    return state.raceSchedule
  },
  raceResults(state: GameState): { [roundNumber: number]: RaceResult[] } {
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
