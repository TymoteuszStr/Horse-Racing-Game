<script setup lang="ts">
import HorseTrack from '@/components/HorseTrack.vue'
import type { RaceRound } from '@/types/RaceRound'
import type { RaceResult } from '@/types/RaceResult'

defineProps<{
  results: RaceResult[]
  raceRound: RaceRound
}>()

const emit = defineEmits<{
  (e: 'horseFinished', result: RaceResult): void
}>()

function onHorseFinished(result: RaceResult) {
  emit('horseFinished', result)
}
</script>
<template>
  <div class="race-board border rounded-xl shadow-sm bg-white">
    <h2 class="title">Round {{ raceRound.roundNumber }} – {{ raceRound.distance }}m</h2>

    <HorseTrack
      v-for="(result, index) in results"
      :key="result.horse.id"
      :index="index"
      :horse="result.horse"
      :time="result.time"
      :result="result"
      @finished="onHorseFinished(result)"
    />
  </div>
</template>

<style scoped>
.race-board {
  width: 100%;
  padding: 20px;
  height: fit-content;
  min-width: 600px;
}

.title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
