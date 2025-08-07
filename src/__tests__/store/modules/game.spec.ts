import { describe, it, expect, beforeEach } from 'vitest'
import type { GameState } from '@/store/modules/game'
import module from '@/store/modules/game'
import type { Horse } from '@/types/horse'
import type { RaceRound } from '@/types/RaceRound'
import type { RaceResult } from '@/types/RaceResult'
import type { RootState } from '@/store'

describe('Game Store Module', () => {
  let state: GameState
  let rootState: RootState

  beforeEach(() => {
    state = (module.state as () => GameState)()
    rootState = { game: state }
  })

  describe('State', () => {
    it('should have correct initial state', () => {
      expect(state.horseList).toEqual([])
      expect(state.raceSchedule).toEqual([])
      expect(state.raceResults).toEqual({})
      expect(state.isRaceStarted).toBe(false)
      expect(state.currentRound).toBe(0)
    })
  })

  describe('Mutations', () => {
    describe('setCurrentRound', () => {
      it('should set current round', () => {
        module.mutations!.setCurrentRound(state, 3)
        expect(state.currentRound).toBe(3)
      })

      it('should handle zero round', () => {
        module.mutations!.setCurrentRound(state, 0)
        expect(state.currentRound).toBe(0)
      })
    })

    describe('incrementCurrentRound', () => {
      it('should increment current round when below 6', () => {
        state.currentRound = 2
        module.mutations!.incrementCurrentRound(state)
        expect(state.currentRound).toBe(3)
      })

      it('should not increment when current round is 6', () => {
        state.currentRound = 6
        module.mutations!.incrementCurrentRound(state)
        expect(state.currentRound).toBe(6)
      })

      it('should not increment when current round is above 6', () => {
        state.currentRound = 7
        module.mutations!.incrementCurrentRound(state)
        expect(state.currentRound).toBe(7)
      })
    })

    describe('setRaceStarted', () => {
      it('should set race started to true', () => {
        module.mutations!.setRaceStarted(state, true)
        expect(state.isRaceStarted).toBe(true)
      })

      it('should set race started to false', () => {
        state.isRaceStarted = true
        module.mutations!.setRaceStarted(state, false)
        expect(state.isRaceStarted).toBe(false)
      })
    })

    describe('setHorseList', () => {
      it('should set horse list', () => {
        const horses: Horse[] = [
          {
            id: 1,
            name: 'Barbara',
            color: 'red',
            conditionScore: 90,
          },
          {
            id: 2,
            name: 'Ada',
            color: 'blue',
            conditionScore: 85,
          },
        ]

        module.mutations!.setHorseList(state, horses)
        expect(state.horseList).toEqual(horses)
      })

      it('should handle empty horse list', () => {
        module.mutations!.setHorseList(state, [])
        expect(state.horseList).toEqual([])
      })
    })

    describe('setRaceResults', () => {
      it('should set race results for a specific round', () => {
        const results: RaceResult[] = [
          {
            horse: {
              id: 1,
              name: 'Barbara',
              color: 'red',
              conditionScore: 90,
            },
            time: 12.5,
            position: 1,
          },
        ]

        module.mutations!.setRaceResults(state, { roundNumber: 1, results })
        expect(state.raceResults[1]).toEqual(results)
      })

      it('should overwrite existing race results for the same round', () => {
        const initialResults: RaceResult[] = [
          {
            horse: {
              id: 1,
              name: 'Barbara',
              color: 'red',
              conditionScore: 90,
            },
            time: 12.5,
            position: 1,
          },
        ]

        const newResults: RaceResult[] = [
          {
            horse: {
              id: 2,
              name: 'Ada',
              color: 'blue',
              conditionScore: 85,
            },
            time: 13.0,
            position: 1,
          },
        ]

        module.mutations!.setRaceResults(state, { roundNumber: 1, results: initialResults })
        module.mutations!.setRaceResults(state, { roundNumber: 1, results: newResults })
        expect(state.raceResults[1]).toEqual(newResults)
      })
    })

    describe('resetRaceResults', () => {
      it('should clear all race results', () => {
        const results: RaceResult[] = [
          {
            horse: {
              id: 1,
              name: 'Barbara',
              color: 'red',
              conditionScore: 90,
            },
            time: 12.5,
            position: 1,
          },
        ]

        module.mutations!.setRaceResults(state, { roundNumber: 1, results })
        expect(state.raceResults[1]).toEqual(results)

        module.mutations!.resetRaceResults(state)
        expect(state.raceResults).toEqual({})
      })
    })

    describe('setRaceSchedule', () => {
      it('should set race schedule', () => {
        const schedule: RaceRound[] = [
          {
            roundNumber: 0,
            distance: 1000,
            horses: [
              {
                id: 1,
                name: 'Barbara',
                color: 'red',
                conditionScore: 90,
              },
            ],
          },
        ]

        module.mutations!.setRaceSchedule(state, schedule)
        expect(state.raceSchedule).toEqual(schedule)
      })

      it('should handle empty race schedule', () => {
        module.mutations!.setRaceSchedule(state, [])
        expect(state.raceSchedule).toEqual([])
      })
    })

    describe('updateHorseCondition', () => {
      it('should update horse condition score when horse exists', () => {
        const horses: Horse[] = [
          {
            id: 1,
            name: 'Barbara',
            color: 'red',
            conditionScore: 90,
          },
        ]

        state.horseList = horses
        module.mutations!.updateHorseCondition(state, { id: 1, scoreLoss: 5 })
        expect(state.horseList[0].conditionScore).toBe(85)
      })

      it('should not update horse condition when horse does not exist', () => {
        const horses: Horse[] = [
          {
            id: 1,
            name: 'Barbara',
            color: 'red',
            conditionScore: 90,
          },
        ]

        state.horseList = horses
        module.mutations!.updateHorseCondition(state, { id: 999, scoreLoss: 5 })
        expect(state.horseList[0].conditionScore).toBe(90)
      })

      it('should handle multiple score losses', () => {
        const horses: Horse[] = [
          {
            id: 1,
            name: 'Barbara',
            color: 'red',
            conditionScore: 90,
          },
        ]

        state.horseList = horses
        module.mutations!.updateHorseCondition(state, { id: 1, scoreLoss: 3 })
        module.mutations!.updateHorseCondition(state, { id: 1, scoreLoss: 2 })
        expect(state.horseList[0].conditionScore).toBe(85)
      })
    })
  })

  describe('Getters', () => {
    describe('currentRound', () => {
      it('should return current round', () => {
        state.currentRound = 3
        expect(module.getters!.currentRound(state, {}, rootState, {})).toBe(3)
      })
    })

    describe('isRaceStarted', () => {
      it('should return race started status', () => {
        state.isRaceStarted = true
        expect(module.getters!.isRaceStarted(state, {}, rootState, {})).toBe(true)
      })

      it('should return false when race not started', () => {
        state.isRaceStarted = false
        expect(module.getters!.isRaceStarted(state, {}, rootState, {})).toBe(false)
      })
    })

    describe('horseList', () => {
      it('should return horse list', () => {
        const horses: Horse[] = [
          {
            id: 1,
            name: 'Barbara',
            color: 'red',
            conditionScore: 90,
          },
        ]

        state.horseList = horses
        expect(module.getters!.horseList(state, {}, rootState, {})).toEqual(horses)
      })
    })

    describe('raceSchedule', () => {
      it('should return race schedule', () => {
        const schedule: RaceRound[] = [
          {
            roundNumber: 0,
            distance: 1000,
            horses: [],
          },
        ]

        state.raceSchedule = schedule
        expect(module.getters!.raceSchedule(state, {}, rootState, {})).toEqual(schedule)
      })
    })

    describe('raceResults', () => {
      it('should return race results', () => {
        const results = {
          1: [
            {
              horse: {
                id: 1,
                name: 'Barbara',
                color: 'red',
                conditionScore: 90,
              },
              time: 12.5,
              position: 1,
            },
          ],
        }

        state.raceResults = results
        expect(module.getters!.raceResults(state, {}, rootState, {})).toEqual(results)
      })
    })
  })

  describe('Module Structure', () => {
    it('should export module with correct structure', () => {
      expect(module).toHaveProperty('state')
      expect(module).toHaveProperty('mutations')
      expect(module).toHaveProperty('actions')
      expect(module).toHaveProperty('getters')
    })

    it('should have all required mutations', () => {
      const expectedMutations = [
        'setCurrentRound',
        'incrementCurrentRound',
        'setRaceStarted',
        'setHorseList',
        'setRaceResults',
        'resetRaceResults',
        'setRaceSchedule',
        'updateHorseCondition',
      ]

      expectedMutations.forEach((mutation) => {
        expect(module.mutations).toHaveProperty(mutation)
      })
    })

    it('should have all required getters', () => {
      const expectedGetters = [
        'currentRound',
        'isRaceStarted',
        'horseList',
        'raceSchedule',
        'raceResults',
      ]

      expectedGetters.forEach((getter) => {
        expect(module.getters).toHaveProperty(getter)
      })
    })
  })
})
