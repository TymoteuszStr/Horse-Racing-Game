import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseTrack from '@/components/HorseTrack.vue'
import type { Horse } from '@/types/horse'
import type { RaceResult } from '@/types/RaceResult'

// Mock dependencies
vi.mock('@fortawesome/vue-fontawesome', () => ({
  FontAwesomeIcon: {
    name: 'FontAwesomeIcon',
    template: '<span class="font-awesome-icon" :style="$attrs.style">{{ $attrs.icon }}</span>',
  },
}))

vi.mock('@/components/HorseDisplay.vue', () => ({
  default: {
    name: 'HorseDisplay',
    props: ['horse'],
    template: '<div class="horse-display">{{ horse.name }}</div>',
  },
}))

vi.mock('vuex', () => ({
  useStore: vi.fn(() => ({
    getters: {
      isRaceStarted: false,
    },
  })),
}))

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  cb()
  return 1
})

describe('HorseTrack', () => {
  const mockHorse: Horse = {
    id: 1,
    name: 'Barbara',
    color: 'red',
    conditionScore: 90,
  }

  const mockResult: RaceResult = {
    horse: mockHorse,
    time: 12.8,
    position: 1,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders horse track with correct structure', () => {
    const wrapper = mount(HorseTrack, {
      props: {
        result: null,
        horse: mockHorse,
        index: 0,
      },
    })

    expect(wrapper.find('.track').exists()).toBe(true)
    expect(wrapper.find('.horse').exists()).toBe(true)
    expect(wrapper.find('.horse-display').exists()).toBe(true)
    expect(wrapper.text()).toContain('Barbara')
  })

  it('displays correct index number', () => {
    const wrapper = mount(HorseTrack, {
      props: {
        result: null,
        horse: mockHorse,
        index: 2,
      },
    })

    expect(wrapper.text()).toContain('3')
  })

  it('emits finished event when transition ends', async () => {
    const wrapper = mount(HorseTrack, {
      props: {
        result: null,
        horse: mockHorse,
        index: 0,
      },
    })

    const horse = wrapper.find('.horse')
    await horse.trigger('transitionend')

    expect(wrapper.emitted('finished')).toBeTruthy()
    expect(wrapper.emitted('finished')).toHaveLength(1)
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(HorseTrack, {
      props: {
        result: null,
        horse: mockHorse,
        index: 0,
      },
    })

    const container = wrapper.find('div')
    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('items-center')
    expect(container.classes()).toContain('justify-center')
    expect(container.classes()).toContain('mb-2')

    const track = wrapper.find('.track')
    expect(track.exists()).toBe(true)

    const horse = wrapper.find('.horse')
    expect(horse.exists()).toBe(true)
  })

  it('handles null result correctly', () => {
    const wrapper = mount(HorseTrack, {
      props: {
        result: null,
        horse: mockHorse,
        index: 0,
      },
    })

    expect(wrapper.find('.horse').exists()).toBe(true)
    expect(wrapper.find('.font-awesome-icon').exists()).toBe(false)
  })
})
