<script setup lang="ts">
import type { RaceRound } from '@/types/RaceRound'
import RaceRoundHorseList from '@/components/RaceRoundHorseList.vue'
import ExpandableCard from '@/layouts/ExpandableCard.vue'

defineProps<{
  scheduleRound: RaceRound
  expandList?: boolean
}>()
</script>
<template>
  <ExpandableCard
    :title="`${scheduleRound.roundNumber + 1} – ${scheduleRound.distance}m`"
    :expanded="expandList"
  >
    <RaceRoundHorseList :round="scheduleRound" />
  </ExpandableCard>
</template>
