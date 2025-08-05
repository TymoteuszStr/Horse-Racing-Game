import type { Horse } from '@/types/horse'
import type { Module } from 'vuex'
import type { RootState } from '..'

export interface HorsesState {
  horses: Horse[]
}
const state = (): HorsesState => ({
  horses: [],
})
const mutations = {}
const actions = {}
const getters = {}

const module: Module<HorsesState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default module
