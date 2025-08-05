import type { Horse } from '@/types/horse'
import type { Module, ActionContext } from 'vuex'
import type { RootState } from '@/store'
import horseNames from '@/constants/horseNames'
import horseColors from '@/constants/horseColors'
import { getRandomNr } from '@/utils.ts/getRandomNr'

export interface HorsesState {
  horses: Horse[]
}
const state = (): HorsesState => ({
  horses: [],
})
const mutations = {
  setHorses(state: HorsesState, horses: Horse[]) {
    state.horses = horses
  },
}
const actions = {
  generateHorses({ commit }: ActionContext<HorsesState, RootState>) {
    const horses: Horse[] = horseNames.map((name, index) => ({
      id: index + 1,
      name,
      color: horseColors[index],
      conditionScore: getRandomNr(70, 100),
    }))

    commit('setHorses', horses)
  },
}
const getters = {}

const module: Module<HorsesState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default module
