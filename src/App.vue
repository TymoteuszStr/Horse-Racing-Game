<script setup lang="ts">
import HorseList from './components/HorseList.vue'

import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useGameEngine } from './composable/useGameEngine'
import ScheduleList from './components/ScheduleList.vue'
import RaceBoard from './components/RaceBoard.vue'
import ResultsList from './components/ResultsList.vue'

const { generateHorseList, simulateRace } = useGameEngine()
const store = useStore()
const horseList = computed(() => store.getters.horseList)
const isRaceStarted = computed(() => store.getters.isRaceStarted)
const raceSchedule = computed(() => store.getters.raceSchedule)
const raceResults = computed(() => store.getters.raceResults)
const showNextRoundBtn = ref(false)
const currentRound = computed(() => store.getters.currentRound)

function startRace() {
  simulateRace(raceSchedule.value[currentRound.value])
  store.commit('setRaceStarted', true)
}
function handleFinishedRace() {
  console.log('handle finishe race')
  store.commit('setRaceStarted', false)
  showNextRoundBtn.value = true
}
function handleNextRound() {
  store.commit('incrementCurrentRound')
  showNextRoundBtn.value = false
}
onMounted(() => {
  if (!horseList.value.length) {
    generateHorseList()
  }
})
</script>

<template>
  <div class="flex max-w-screen-2xl mx-auto px-4 w-full">
    <div class="mx-3">
      <div class="flex items-center justify-between m-4">
        <h2 class="text-xl font-semibold">Horse List</h2>
        <button
          type="button"
          :disabled="isRaceStarted"
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
            <span class="flex items-center gap-2">
              <button
                type="button"
                :disabled="isRaceStarted || raceSchedule.length === 0"
                @click="startRace"
                class="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Race
              </button>
              <button
                type="button"
                :disabled="isRaceStarted || showNextRoundBtn === false"
                @click="handleNextRound"
                class="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Race
              </button>
            </span>
          </div>
          <RaceBoard
            :race-round="raceSchedule[currentRound]"
            :results="raceResults[currentRound] || []"
            :isRaceStarted="isRaceStarted"
            @allFinished="handleFinishedRace"
          />
        </div>

        <div class="mx-3">
          <div class="flex items-center justify-between m-5">
            <h2 class="text-xl font-semibold">Race Results</h2>
          </div>
          <template v-for="round in raceSchedule" :key="round.roundNumber">
            <ResultsList
              :results="raceResults[round.roundNumber] || []"
              :round="round"
              class="mb-4"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
