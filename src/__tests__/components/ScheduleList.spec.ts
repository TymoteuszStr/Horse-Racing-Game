import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ScheduleList from '@/components/ScheduleList.vue'
import type { RaceRound } from '@/types/RaceRound'
import type { Horse } from '@/types/horse'

vi.mock('@/components/RaceRoundHorseList.vue', () => ({
  default: {
    name: 'RaceRoundHorseList',
    props: ['round'],
    template: '<div class="race-round-horse-list">{{ round.horses.length }} horses</div>',
  },
}))

vi.mock('@/layouts/ExpandableCard.vue', () => ({
  default: {
    name: 'ExpandableCard',
    props: ['title', 'initialExpanded'],
    template: '<div class="expandable-card"><div class="title">{{ title }}</div><slot /></div>',
  },
}))

describe('ScheduleList', () => {
  const mockHorses: Horse[] = [
    {
      id: 1,
      name: 'Barbara',
      color: 'red',
      conditionScore: 90,
    },
    {
      id: 2,
      name: 'Ada',
      color: 'blue',
      conditionScore: 85,
    },
  ]

  const mockScheduleRound: RaceRound = {
    roundNumber: 0,
    distance: 1000,
    horses: mockHorses,
  }

  it('renders schedule round with correct title', () => {
    const wrapper = mount(ScheduleList, {
      props: {
        scheduleRound: mockScheduleRound,
      },
    })

    expect(wrapper.text()).toContain('1 – 1000m')
  })

  it('renders schedule round with different round number and distance', () => {
    const differentRound: RaceRound = {
      roundNumber: 2,
      distance: 1200,
      horses: mockHorses,
    }

    const wrapper = mount(ScheduleList, {
      props: {
        scheduleRound: differentRound,
      },
    })

    expect(wrapper.text()).toContain('3 – 1200m')
  })

  it('renders RaceRoundHorseList component', () => {
    const wrapper = mount(ScheduleList, {
      props: {
        scheduleRound: mockScheduleRound,
      },
    })

    expect(wrapper.find('.race-round-horse-list').exists()).toBe(true)
    expect(wrapper.text()).toContain('2 horses')
  })

  it('passes correct props to ExpandableCard', () => {
    const wrapper = mount(ScheduleList, {
      props: {
        scheduleRound: mockScheduleRound,
      },
    })

    const expandableCard = wrapper.find('.expandable-card')
    expect(expandableCard.exists()).toBe(true)
    expect(wrapper.text()).toContain('1 – 1000m')
  })

  it('renders with initialExpanded set to false', () => {
    const wrapper = mount(ScheduleList, {
      props: {
        scheduleRound: mockScheduleRound,
      },
    })

    const expandableCard = wrapper.find('.expandable-card')
    expect(expandableCard.exists()).toBe(true)
  })

  it('handles empty horses list', () => {
    const emptyRound: RaceRound = {
      roundNumber: 1,
      distance: 800,
      horses: [],
    }

    const wrapper = mount(ScheduleList, {
      props: {
        scheduleRound: emptyRound,
      },
    })

    expect(wrapper.text()).toContain('2 – 800m')
    expect(wrapper.text()).toContain('0 horses')
  })

  it('applies correct structure and components', () => {
    const wrapper = mount(ScheduleList, {
      props: {
        scheduleRound: mockScheduleRound,
      },
    })

    expect(wrapper.find('.expandable-card').exists()).toBe(true)
    expect(wrapper.find('.race-round-horse-list').exists()).toBe(true)
    expect(wrapper.find('.title').exists()).toBe(true)
  })
})
