<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
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
    class="inline-block w-fit p-4 border rounded-xl shadow-sm bg-white transition-all duration-300 cursor-pointer select-none min-w-[250px]"
    @click="expanded = !expanded"
  >
    <div class="mb-2 text-gray-700 font-medium flex justify-between items-center">
      <span>{{ props.title }}</span>
      <span class="text-sm text-gray-400">
        {{ expanded ? '▲' : '▼' }}
      </span>
    </div>

    <transition name="expand">
      <div v-if="expanded" class="transition-all duration-300 flex justify-center items-center">
        <slot />
      </div>
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
