<script setup lang="ts">
import HorseList from '@/components/HorseList.vue'

import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useGameEngine } from '@/composable/useGameEngine'
import ScheduleList from '@/components/ScheduleList.vue'
import RaceBoard from '@/components/RaceBoard.vue'
import ResultsList from '@/components/ResultsList.vue'
import { RACE_ROUNDS } from '@/constants/raceConfig'

const store = useStore()
const { generateHorseList, simulateRace, generateRaceSchedule } = useGameEngine()
const horseList = computed(() => store.getters.horseList)
const isRaceStarted = computed(() => store.getters.isRaceStarted)
const raceSchedule = computed(() => store.getters.raceSchedule)
const raceResults = computed(() => store.getters.raceResults)
const currentRound = computed(() => store.getters.currentRound)
const disabledStartBtn = computed(
  () =>
    isRaceStarted.value ||
    isRaceFinished.value ||
    raceSchedule.value.length === 0 ||
    currentRound.value + 1 > RACE_ROUNDS,
)
const disabledNextRaceBtn = computed(
  () => isRaceStarted.value || !isRaceFinished.value || currentRound.value + 1 >= RACE_ROUNDS,
)
const isRaceFinished = ref(false)
const finishBtn = ref(false)

function startRace() {
  if (disabledStartBtn.value) return
  simulateRace(raceSchedule.value[currentRound.value])
  store.commit('setRaceStarted', true)
}

function handleFinishedRace() {
  updateHorsesCondition()
  store.commit('setRaceStarted', false)
  isRaceFinished.value = true
  if (currentRound.value === RACE_ROUNDS - 1) finishBtn.value = true
}

function handleNextRound() {
  if (disabledNextRaceBtn.value) return
  store.commit('incrementCurrentRound')
  isRaceFinished.value = false
}

function updateHorsesCondition() {
  const currentRoundObj = raceSchedule.value[currentRound.value]

  currentRoundObj.horses.forEach(({ id }: { id: number }) => {
    store.commit('updateHorseCondition', {
      id,
      scoreLoss: currentRoundObj.distance / 200,
    })
  })
}
function generateHorseListAndSchedule() {
  finishBtn.value = false
  isRaceFinished.value = false
  store.commit('setRaceStarted', false)
  store.commit('setCurrentRound', 0)

  generateHorseList()
  generateRaceSchedule()
}
onMounted(() => {
  if (!horseList.value.length || !raceSchedule.value.length) {
    generateHorseListAndSchedule()
  }
})
</script>

<template>
  <div class="flex flex-wrap mx-auto px-4 w-full 2xl:w-[1500px] 2xl:mx-auto">
    <div class="mx-3">
      <div class="flex items-center justify-between m-4">
        <h2 class="text-xl font-semibold">Horse List</h2>
        <button
          type="button"
          :disabled="isRaceStarted"
          @click="generateHorseListAndSchedule"
          class="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate
        </button>
      </div>
      <HorseList :horseList="horseList" />
    </div>

    <div v-if="raceSchedule.length" class="mx-3">
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
    <div v-if="raceSchedule.length" class="mx-3">
      <div class="flex items-center justify-between m-4">
        <h2 class="text-xl font-semibold">Race Board</h2>
        <h2 v-if="finishBtn" class="text-2xl font-bold text-green-600 animate-pulse">
          ALL RACES FINISHED
        </h2>

        <span class="flex items-center gap-2">
          <button
            type="button"
            :disabled="disabledStartBtn"
            @click="startRace"
            class="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Race
          </button>
          <button
            type="button"
            :disabled="disabledNextRaceBtn"
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

    <div v-if="raceSchedule.length" class="mx-3">
      <div class="flex items-center justify-between m-5">
        <h2 class="text-xl font-semibold">Race Results</h2>
      </div>
      <template v-for="round in raceSchedule" :key="round.roundNumber">
        <ResultsList :results="raceResults[round.roundNumber] || []" :round="round" class="mb-4" />
      </template>
    </div>
  </div>
</template>
