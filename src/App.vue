<script setup lang="ts">
import HorseList from './components/HorseList.vue'

import { computed } from 'vue'
import { useStore } from 'vuex'
import { useGameEngine } from './composable/useGameEngine'
import ScheduleList from './components/ScheduleList.vue'

const { generateHorseList, isGameStarted } = useGameEngine()
const store = useStore()
const horseList = computed(() => store.getters.horseList)
const raceSchedule = computed(() => store.getters.raceSchedule)
</script>

<template>
  <div class="flex">
    <HorseList :horseList="horseList" @generate="generateHorseList" :button-disabled="isGameStarted" />
    <ScheduleList :raceSchedule="raceSchedule" />
  </div>
</template>

<style scoped></style>
