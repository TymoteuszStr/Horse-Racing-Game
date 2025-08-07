vi.mock('vuex', () => ({
  useStore: vi.fn(),
}))

vi.mock('@/utils.ts/getRandomNr', () => ({
  getRandomNr: vi.fn(() => 90),
}))

vi.mock('@/utils.ts/shuffleArray', () => ({
  shuffleArray: vi.fn((arr) => arr),
}))

vi.mock('@/constants/horseNames', () => ({
  default: Array.from({ length: 20 }, (_, i) => `Horse ${i + 1}`),
}))
vi.mock('@/constants/horseColors', () => ({
  default: Array.from({ length: 20 }, (_, i) => `#000${i}`),
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useGameEngine } from '@/composable/useGameEngine'
import { useStore } from 'vuex'
import { HORSES_PER_RACE, MAX_HORSES } from '@/constants/raceConfig'
import raceDistances from '@/constants/raceDistances'
import type { Horse } from '@/types/horse'
import type { RaceRound } from '@/types/RaceRound'
import type { RaceResult } from '@/types/RaceResult'
describe('useGameEngine', () => {
  let mockCommit: ReturnType<typeof vi.fn>
  let mockGetters: Record<string, unknown>

  beforeEach(() => {
    mockCommit = vi.fn()
    mockGetters = {
      horseList: Array.from({ length: MAX_HORSES }, (_, i) => ({
        id: i + 1,
        name: `Horse ${i + 1}`,
        color: `#000${i}`,
        conditionScore: 95,
      })),
    }
    ;(useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      commit: mockCommit,
      getters: mockGetters,
    })
  })

  it('generateHorseList commits resetRaceResults and setHorseList and generates schedule', () => {
    const { generateHorseList } = useGameEngine()

    generateHorseList()

    expect(mockCommit).toHaveBeenCalledWith('resetRaceResults')
    expect(mockCommit).toHaveBeenCalledWith('setHorseList', expect.any(Array))
  })

  it('generateRaceSchedule commits schedule with 6 rounds and correct horses per round', () => {
    const { generateRaceSchedule } = useGameEngine()

    generateRaceSchedule()

    expect(mockCommit).toHaveBeenCalledWith(
      'setRaceSchedule',
      expect.arrayContaining([
        expect.objectContaining({
          horses: expect.any(Array),
        }),
      ]),
    )

    const scheduleArg = mockCommit.mock.calls.find(
      ([type]) => type === 'setRaceSchedule',
    )?.[1] as RaceRound[]

    expect(scheduleArg).toHaveLength(raceDistances.length)
    scheduleArg.forEach((round) => {
      expect(round.horses).toHaveLength(HORSES_PER_RACE)
    })
  })

  it('simulateRace commits result with sorted positions', () => {
    const { simulateRace } = useGameEngine()

    const mockHorses: Horse[] = [
      { id: 1, name: 'A', color: '#111', conditionScore: 100 },
      { id: 2, name: 'B', color: '#222', conditionScore: 90 },
    ]
    const race: RaceRound = {
      roundNumber: 0,
      distance: 1200,
      horses: mockHorses,
    }

    const result = simulateRace(race)

    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('time')
    expect(result[0]).toHaveProperty('position')

    const horseIds = result.map((r: RaceResult) => r.horse.id)
    expect(new Set(horseIds)).toEqual(new Set([1, 2]))

    expect(mockCommit).toHaveBeenCalledWith('setRaceResults', {
      roundNumber: race.roundNumber,
      results: result,
    })
  })
})
