<script setup lang="ts">
import type { Horse } from '@/types/horse'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHorse } from '@fortawesome/free-solid-svg-icons'

defineProps<{
  horses: Horse[]
}>()
</script>

<template>
  <div class="p-4 w-full max-w-sm">
    <h2 class="text-xl font-semibold mb-4">Horse List</h2>

    <div class="grid grid-cols-3 text-gray-500 text-sm font-semibold px-3 pb-2">
      <div>Name</div>
      <div>Condition</div>
      <div>Color</div>
    </div>

    <ul class="space-y-2">
      <li
        v-for="horse in horses"
        :key="horse.id"
        class="grid grid-cols-3 items-center px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-gray-100"
      >
        <span class="truncate text-gray-800">{{ horse.name }}</span>

        <span class="text-gray-800">{{ horse.conditionScore }}</span>

        <font-awesome-icon :icon="faHorse" class="w-5 h-5" :style="{ color: horse.color }" />
      </li>
    </ul>
  </div>
</template>
