import horsesModule, { type HorsesState } from '@/store/modules/horses'
import horseNames, { type HorseName } from '@/constants/horseNames'
import horseColors, { type HorseColor } from '@/constants/horseColors'
import type { Horse } from '@/types/horse'

import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/utils.ts/getRandomNr', () => ({
  getRandomNr: vi.fn(() => 85),
}))

describe('horses module', () => {
  let state: HorsesState

  beforeEach(() => {
    state = {
      horses: [],
    }
  })

  describe('mutations', () => {
    it('setHorses updates the state with provided horses', () => {
      const sampleHorses: Horse[] = [
        { id: 1, name: 'Ada' as HorseName, color: 'red' as HorseColor, conditionScore: 90 },
        { id: 2, name: 'Grace' as HorseName, color: 'blue' as HorseColor, conditionScore: 80 },
      ]

      horsesModule.mutations!.setHorses(state, sampleHorses)

      expect(state.horses).toEqual(sampleHorses)
    })
  })

  describe('actions', () => {
    it('generateHorses commits a list of horses with correct structure', () => {
      const commit = vi.fn()

      horsesModule.actions.generateHorses({ commit })

      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(
        'setHorses',
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            color: expect.any(String),
            conditionScore: 85,
          }),
        ]),
      )

      const horses = commit.mock.calls[0][1] as Horse[]
      expect(horses).toHaveLength(horseNames.length)
      expect(new Set(horses.map((h) => h.name)).size).toBe(horseNames.length)
      expect(new Set(horses.map((h) => h.color)).size).toBe(horseColors.length)
    })
  })

  describe('Horses module', () => {
    it('should have equal number of names and colors', () => {
      expect(horseNames.length).toBe(horseColors.length)
    })
  })
})
