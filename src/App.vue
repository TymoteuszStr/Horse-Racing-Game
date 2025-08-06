<script setup lang="ts">
import HorseList from './components/HorseList.vue'

import { computed } from 'vue'
import { useStore } from 'vuex'
import { useGameEngine } from './composable/useGameEngine'
import ScheduleList from './components/ScheduleList.vue'
import RaceBoard from './components/RaceBoard.vue'
import ResultsList from './components/ResultsList.vue'

const { generateHorseList, isGameStarted } = useGameEngine()
const store = useStore()
const horseList = computed(() => store.getters.horseList)
const raceSchedule = computed(() => store.getters.raceSchedule)
const raceResults = computed(() => store.getters.raceResults)
</script>

<template>
  <div class="flex max-w-screen-2xl mx-auto px-4 w-full">
    <div class="mx-3">
      <div class="flex items-center justify-between m-4">
        <h2 class="text-xl font-semibold">Horse List</h2>
        <button
          type="button"
          :disabled="isGameStarted"
          @click="generateHorseList"
          class="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate
        </button>
      </div>
      <HorseList :horseList="horseList" />
    </div>
    <div v-if="raceSchedule.length">
      <div class="flex">
        <div>
          <div class="flex items-center justify-between m-5">
            <h2 class="text-xl font-semibold">Race Schedule</h2>
          </div>
          <ScheduleList
            v-for="round in raceSchedule"
            :key="round.roundNumber"
            :scheduleRound="round"
            class="mb-4"
          />
        </div>
        <div class="mx-3">
          <div class="flex items-center justify-between m-4">
            <h2 class="text-xl font-semibold">Race Board</h2>
            <button
              type="button"
              :disabled="isGameStarted || raceSchedule.length === 0"
              @click="generateHorseList"
              class="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Race
            </button>
          </div>
          <RaceBoard
            v-if="raceResults.length"
            :race-round="raceSchedule[0]"
            :results="raceResults"
          />
        </div>

        <div class="mx-3">
          <div class="flex items-center justify-between m-5">
            <h2 class="text-xl font-semibold">Race Results</h2>
          </div>
          <ResultsList
            v-for="round in raceSchedule"
            :key="round.roundNumber"
            :results="raceResults"
            :round="round"
            class="mb-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
