<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Horse } from '@/types/horse'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'
import type { RaceResult } from '@/types/RaceResult'
import HorseDisplay from './HorseDisplay.vue'
interface Props {
  result: RaceResult
  horse: Horse
  index: number
}
const emit = defineEmits<{
  (e: 'finished'): void
}>()

const defaultSpeedMultiplier = 0.1
const props = defineProps<Props>()
const trackRef = ref<HTMLElement | null>(null)
const horseRef = ref<HTMLElement | null>(null)
const offset = ref(0)
const isFinished = ref(false)
const started = ref(false)
const medalColor = computed(() => {
  switch (props.result.position) {
    case 1:
      return { color: 'gold' }
    case 2:
      return { color: 'silver' }
    case 3:
      return { color: 'brown' }
    default:
      return ''
  }
})
const durationMs = computed(() => props.result.time * 1000 * (defaultSpeedMultiplier ?? 1))

const horseStyle = computed(() => ({
  transform: started.value ? `translateX(${offset.value}px)` : 'translateX(0)',
  transition: `transform ${durationMs.value}ms linear`,
  backgroundColor: 'white',
  color: props.result.horse.color,
}))

onMounted(() => {
  requestAnimationFrame(() => {
    if (trackRef.value && horseRef.value) {
      const trackWidth = trackRef.value.getBoundingClientRect().width
      const horseWidth = horseRef.value.getBoundingClientRect().width
      offset.value = trackWidth - horseWidth
    }
    started.value = true
  })
})

function onTransitionEnd() {
  isFinished.value = true
  emit('finished')
}
</script>

<template>
  <div class="flex items-center justify-center mb-2">
    <div
      class="w-8 h-8 border-2 border-gray-500 rounded-md flex items-center justify-center font-bold text-sm text-gray-800 bg-gray-100 mr-2 mb-2"
    >
      <span>
        {{ props.index + 1 }}
      </span>
    </div>
    <div class="track" ref="trackRef">
      <div
        class="horse shadow-md"
        :style="horseStyle"
        @transitionend="onTransitionEnd"
        ref="horseRef"
      >
        <HorseDisplay :horse="props.horse" />
      </div>
      <transition name="medal-pop">
        <div
          v-if="isFinished"
          class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-white shadow-md flex items-center gap-2 font-bold text-sm min-w-[100px] flex justify-center"
        >
          <font-awesome-icon
            v-if="props.result.position && props.result.position <= 3"
            :icon="faMedal"
            :style="medalColor"
          />
          {{ props.result.position }} place
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.track {
  position: relative;
  width: 100%;
  height: 40px;
  background: #eee;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 2px 15px;
}

.horse {
  position: absolute;
  left: 0;
  top: 4px;
  height: calc(100% - 8px);
  display: flex;
  align-items: center;
  padding-left: 10px;
  white-space: nowrap;
  font-weight: bold;
  color: white;
  border-radius: 0 20px 20px 0;
  min-width: 110px;
  padding: 4px 10px;
}

.medal-pop-enter-active {
  animation: popIn 0.6s ease-out;
}
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
