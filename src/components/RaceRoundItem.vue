<script setup lang="ts">
import { ref } from 'vue'
import type { RaceRound } from '@/types/RaceRound'
import HorseDisplay from '@/components/HorseDisplay.vue'

const props = withDefaults(
  defineProps<{
    round: RaceRound
    initialExpanded?: boolean
  }>(),
  {
    initialExpanded: false,
  },
)
const expanded = ref(props.initialExpanded)
</script>

<template>
  <li
    class="p-4 border rounded-xl shadow-sm bg-white transition-all duration-300 cursor-pointer select-none"
    @click="expanded = !expanded"
  >
    <div class="mb-2 text-gray-700 font-medium flex justify-between items-center">
      <span>Round {{ round.roundNumber }} – {{ round.distance }}m</span>
      <span class="text-sm text-gray-400">
        {{ expanded ? '▲' : '▼' }}
      </span>
    </div>

    <transition name="expand">
      <ul v-if="expanded" class="space-y-1 transition-all duration-300">
        <li
          v-for="horse in round.horses"
          :key="horse.id"
          class="flex justify-between items-center px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-gray-50"
        >
          <HorseDisplay :horse="horse" />
        </li>
      </ul>
    </transition>
  </li>
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
