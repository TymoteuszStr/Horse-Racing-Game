<script setup lang="ts">
import type { Horse } from '@/types/horse'
import HorseDisplay from '@/components/HorseDisplay.vue'

defineProps<{
  horseList?: Horse[]
  buttonDisabled?: boolean
}>()
</script>

<template>
  <div class="p-4 w-full max-w-sm border rounded-xl shadow-sm bg-white min-w-[300px]">
    <div class="flex justify-between text-gray-500 text-sm font-semibold px-3 pb-2">
      <div>Horse</div>
      <div>Condition</div>
    </div>

    <ul class="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
      <li
        v-for="horse in horseList ?? []"
        :key="horse.id"
        class="flex justify-between items-center px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-gray-100"
      >
        <HorseDisplay :horse="horse" />
        <span class="text-gray-800">{{ horse.conditionScore }}</span>
      </li>
    </ul>
  </div>
</template>
