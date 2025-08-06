<script setup lang="ts">
import HorseDisplay from '@/components/HorseDisplay.vue'
import type { RaceResult } from '@/types/RaceResult'
import { computed } from 'vue'

const props = defineProps<{
  results: RaceResult[]
}>()
const sortedResults = computed(() => [...props.results].sort((a, b) => a.position - b.position))
</script>

<template>
  <ul class="space-y-1 transition-all duration-300">
    <li
      v-for="result in sortedResults"
      :key="result.horse.id"
      class="flex items-center justify-between px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-gray-50"
    >
      <div
        class="w-8 h-8 flex items-center justify-center font-bold text-gray-600 text-sm rounded-md bg-gray-100 mr-3"
      >
        {{ result.position }}.
      </div>

      <HorseDisplay :horse="result.horse" class="flex-1" />

      <div class="ml-3 text-sm text-gray-500 whitespace-nowrap font-mono tabular-nums">
        {{ result.time.toFixed(2) }}s
      </div>
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
