import { createStore } from 'vuex'
import game, { type GameState } from './modules/game'

export interface RootState {
  game: GameState
}
const store = createStore<RootState>({
  modules: {
    game,
  },
})

export default store
