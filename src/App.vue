<script setup lang="ts">
import HorseList from './components/HorseList.vue'

import { computed } from 'vue'
import { useStore } from 'vuex'
import { useGameEngine } from './composable/useGameEngine'
import ScheduleList from './components/ScheduleList.vue'
import RaceBoard from './components/RaceBoard.vue'

const { generateHorseList, isGameStarted } = useGameEngine()
const store = useStore()
const horseList = computed(() => store.getters.horseList)
const raceSchedule = computed(() => store.getters.raceSchedule)
const raceResults = computed(() => store.getters.raceResults)
</script>

<template>
  <div class="flex">
    <HorseList
      :horseList="horseList"
      @generate="generateHorseList"
      :button-disabled="isGameStarted"
    />
    <div>
      <ScheduleList :raceSchedule="raceSchedule" />
      <RaceBoard
        v-if="raceResults.length"
        :race-round="raceSchedule[0]"
        :results="raceResults"
      />
    </div>
  </div>
</template>

<style scoped></style>
