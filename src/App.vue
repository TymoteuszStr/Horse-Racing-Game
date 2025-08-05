<script setup lang="ts">
import HorseList from './components/HorseList.vue'

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const horses = computed(() => store.getters.horsesList)

onMounted(() => {
  store.dispatch('generateHorses')
})
</script>

<template>
  <div>
    <HorseList :horses="horses" />
  </div>
</template>

<style scoped></style>
