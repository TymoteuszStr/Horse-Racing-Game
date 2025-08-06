import { useStore } from 'vuex'
import horseNames from '@/constants/horseNames'
import horseColors from '@/constants/horseColors'
import { getRandomNr } from '@/utils.ts/getRandomNr'
import type { Horse } from '@/types/horse'
import { shuffleArray } from '@/utils.ts/shuffleArray'
import raceDistances from '@/constants/raceDistances'
import { AVERAGE_HORSE_SPEED_MPS, HORSES_PER_RACE, MAX_HORSES } from '@/constants/raceConfig'
import type { RaceRound } from '@/types/RaceRound'
import type { RaceResult } from '@/types/RaceResult'

export function useGameEngine() {
  const store = useStore()

  function generateHorseList() {
    if (horseNames.length < MAX_HORSES || horseColors.length < MAX_HORSES) {
      console.warn('Not enough horse names or colors to generate a full list.')
      return
    }
    const shuffledHorseNames = shuffleArray(horseNames)
    const shuffledHorseColors = shuffleArray(horseColors)
    const horses: Horse[] = shuffledHorseNames.map((name, index) => ({
      id: index + 1,
      name,
      color: shuffledHorseColors[index],
      conditionScore: getRandomNr(80, 100),
    }))
    store.commit('resetRaceResults')
    store.commit('setHorseList', horses)
    generateRaceSchedule()
  }
  function generateRaceSchedule() {
    const horseList = store.getters.horseList as Horse[]

    if (horseList.length < HORSES_PER_RACE) {
      console.warn('Not enough horses to generate a race schedule.')
      return
    }

    const schedule = raceDistances.map((distance, index) => {
      const shuffled = shuffleArray(horseList)
      const selectedHorses = shuffled.slice(0, HORSES_PER_RACE)

      return {
        roundNumber: index,
        distance,
        horses: selectedHorses,
      }
    })
    store.commit('setRaceSchedule', schedule)
  }
  function simulateRace(race: RaceRound): RaceResult[] {
    const results: RaceResult[] = race.horses.map((horse: Horse) => {
      const conditionModifier = (horse.conditionScore - 50) / 100
      const adjustedSpeed = AVERAGE_HORSE_SPEED_MPS * (1 + conditionModifier)
      const baseTime = race.distance / adjustedSpeed
      const randomFactor = 1 + getRandomNr(-5, 5) / 100
      const finalTime = baseTime * randomFactor

      return {
        horse,
        time: parseFloat(finalTime.toFixed(2)),
        position: 0,
      }
    })
    const resultMap = new Map(results.map((r) => [r.horse.id, r]))
    const sortedByTime = [...results].sort((a, b) => a.time - b.time)
    sortedByTime.forEach((sortedResult, index) => {
      resultMap.get(sortedResult.horse.id)!.position = index + 1
    })

    store.commit('setRaceResults', { roundNumber: race.roundNumber, results })

    return results
  }
  return { generateHorseList, generateRaceSchedule, simulateRace }
}
