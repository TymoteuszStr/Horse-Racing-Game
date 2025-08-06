<script setup lang="ts">
import type { Horse } from '@/types/horse'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHorse } from '@fortawesome/free-solid-svg-icons'

defineProps<{
  horse: Horse
}>()
</script>

<template>
  <span class="truncate flex items-center gap-2 text-gray-800">
    <font-awesome-icon :icon="faHorse" class="w-5 h-5" :style="{ color: horse.color }" />
    {{ horse.name }}
  </span>
</template>
