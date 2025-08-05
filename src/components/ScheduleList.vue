<script setup lang="ts">
import type { RaceRound } from '@/types/RaceRound'
import RaceRoundItem from '@/components/RaceRoundItem.vue'

defineProps<{
  raceSchedule: RaceRound[]
}>()
</script>
<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">Race Schedule</h2>
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 auto-rows-min gap-4"
    >
      <RaceRoundItem
        v-for="round in raceSchedule"
        :key="round.roundNumber"
        :round="round"
        class="mx-2"
      />
    </ul>
  </div>
</template>
