import { useStore } from 'vuex'
import horseNames from '@/constants/horseNames'
import horseColors from '@/constants/horseColors'
import { getRandomNr } from '@/utils.ts/getRandomNr'
import type { Horse } from '@/types/horse'
import { shuffleArray } from '@/utils.ts/shuffleArray'
import raceDistances from '@/constants/raceDistances'

export function useGameEngine() {
  const store = useStore()
  const isGameStarted = false

  function generateHorseList() {
    const shuffledHorseNames = shuffleArray(horseNames)
    const shuffledHorseColors = shuffleArray(horseColors)
    const horses: Horse[] = shuffledHorseNames.map((name, index) => ({
      id: index + 1,
      name,
      color: shuffledHorseColors[index],
      conditionScore: getRandomNr(80, 100),
    }))
    store.commit('setHorseList', horses)
    generateRaceSchedule()
  }
  function generateRaceSchedule() {
    const horseList = store.getters.horseList as Horse[]

    if (horseList.length < 10) {
      console.warn('Not enough horses to generate a race schedule.')
      return
    }

    const schedule = raceDistances.map((distance, index) => {
      const shuffled = shuffleArray(horseList)
      const selectedHorses = shuffled.slice(0, 10)

      return {
        roundNumber: index + 1,
        distance,
        horses: selectedHorses,
      }
    })

    store.commit('setRaceSchedule', schedule)
  }
  return { generateHorseList, isGameStarted, generateRaceSchedule }
}
