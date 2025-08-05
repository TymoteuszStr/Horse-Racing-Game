import { createStore } from 'vuex'
import horses, { type HorsesState } from './modules/horses'

export interface RootState {
  horses: HorsesState
}
const store = createStore<RootState>({
  modules: {
    horses,
  },
})

export default store
