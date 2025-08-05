<script setup lang="ts">
import type { Horse } from '@/types/horse'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHorse } from '@fortawesome/free-solid-svg-icons'

defineProps<{
  horseList?: Horse[]
  buttonDisabled?: boolean
}>()
</script>

<template>
  <div class="p-4 w-full max-w-sm">
    <div class="flex items-center justify-between mb-4 mx-3">
      <h2 class="text-xl font-semibold">Horse List</h2>
      <button
        type="button"
        :disabled="buttonDisabled"
        @click="$emit('generate')"
        class="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate
      </button>
    </div>
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
        <span class="truncate text-gray-800 flex items-center gap-2">
          {{ horse.name }}
          <font-awesome-icon :icon="faHorse" class="w-5 h-5" :style="{ color: horse.color }" />
        </span>

        <span class="text-gray-800">{{ horse.conditionScore }}</span>
      </li>
    </ul>
  </div>
</template>
