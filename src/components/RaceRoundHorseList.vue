<script setup lang="ts">
import type { RaceRound } from '@/types/RaceRound'
import HorseDisplay from '@/components/HorseDisplay.vue'

defineProps<{
  round: RaceRound
}>()
</script>

<template>
  <ul>
    <li
      v-for="horse in round.horses"
      :key="horse.id"
      class="flex justify-between items-center px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-gray-50"
    >
      <HorseDisplay :horse="horse" />
    </li>
  </ul>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
