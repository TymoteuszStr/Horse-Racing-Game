<script setup lang="ts">
import HorseTrack from '@/components/HorseTrack.vue'
import type { RaceRound } from '@/types/RaceRound'
import type { RaceResult } from '@/types/RaceResult'
import { ref, watch } from 'vue'

const props = defineProps<{
  results: RaceResult[] | []
  raceRound: RaceRound
}>()
const finishedCount = ref(0)
const emit = defineEmits(['allFinished'])

function onHorseFinished() {
  finishedCount.value++
}

watch(
  () => finishedCount.value,
  (count) => {
    if (count === props.raceRound.horses.length) {
      emit('allFinished')
    }
  },
)
watch(
  () => props.raceRound.roundNumber,
  () => {
    finishedCount.value = 0
  },
)
</script>
<template>
  <div class="race-board border rounded-xl shadow-sm bg-white">
    <h2 class="title">Round {{ raceRound?.roundNumber + 1 }} – {{ raceRound?.distance }}m</h2>

    <HorseTrack
      v-for="(horse, index) in raceRound.horses"
      :key="horse.id"
      :index="index"
      :horse="horse"
      @finished="onHorseFinished"
      :result="results?.find((r) => r.horse.id === horse.id) ?? null"
    />
  </div>
</template>

<style scoped>
.race-board {
  width: 100%;
  padding: 20px;
  height: fit-content;
  min-width: 550px;
}

.title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
