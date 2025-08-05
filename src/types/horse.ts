import type { HorseColor } from '@/constants/horseColors'
import type { HorseName } from '@/constants/horseNames'

export interface Horse {
  id: number
  conditionScore: number
  name: HorseName
  color: HorseColor
}
