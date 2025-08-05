import type { RaceDistance } from '@/constants/raceDistances'
import type { Horse } from './horse'

export interface RaceRound {
  roundNumber: number
  distance: RaceDistance
  horses: Horse[]
}
