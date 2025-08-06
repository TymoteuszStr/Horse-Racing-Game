<script setup lang="ts">
import ExpandableCard from '@/layouts/ExpandableCard.vue'
import type { RaceResult } from '@/types/RaceResult'
import type { RaceRound } from '@/types/RaceRound'
import ResultRoundItem from './ResultRoundItem.vue'

defineProps<{
  results: RaceResult[]
  round: RaceRound
}>()
</script>
<template>
  <ExpandableCard
    :results="results"
    :title="`${round.roundNumber} – ${round.distance}m`"
    :initialExpanded="false"
  >
    <ResultRoundItem :round="round" :results="results" />
  </ExpandableCard>
</template>
