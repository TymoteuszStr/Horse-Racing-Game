<script setup lang="ts">
import ExpandableCard from '@/layouts/ExpandableCard.vue'
import type { RaceResult } from '@/types/RaceResult'
import type { RaceRound } from '@/types/RaceRound'
import RaceResultList from '@/components/RaceResultList.vue'

defineProps<{
  results: RaceResult[]
  round: RaceRound
}>()
</script>
<template>
  <ExpandableCard :title="`${round.roundNumber + 1} – ${round.distance}m`" :initialExpanded="false">
    <RaceResultList :round="round" :results="results" />
  </ExpandableCard>
</template>
