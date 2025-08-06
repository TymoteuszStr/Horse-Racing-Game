<script setup lang="ts">
import type { RaceRound } from '@/types/RaceRound'
import RaceRoundHorseList from '@/components/RaceRoundHorseList.vue'
import ExpandableCard from '@/layouts/ExpandableCard.vue'

defineProps<{
  scheduleRound: RaceRound
}>()
</script>
<template>
  <ExpandableCard
    :title="`${scheduleRound.roundNumber + 1} – ${scheduleRound.distance}m`"
    :initialExpanded="false"
  >
    <RaceRoundHorseList :round="scheduleRound" />
  </ExpandableCard>
</template>
