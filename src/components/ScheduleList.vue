<script setup lang="ts">
import type { RaceRound } from '@/types/RaceRound'
import RaceRoundItem from '@/components/RaceRoundItem.vue'
import ExpandableCard from '@/layouts/ExpandableCard.vue'

defineProps<{
  scheduleRound: RaceRound
}>()
</script>
<template>
  <ExpandableCard
    :key="scheduleRound.roundNumber"
    :title="`${scheduleRound.roundNumber} – ${scheduleRound.distance}m`"
    :initialExpanded="false"
  >
    <RaceRoundItem :round="scheduleRound" />
  </ExpandableCard>
</template>
