import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceRoundHorseList from '@/components/RaceRoundHorseList.vue'
import type { RaceRound } from '@/types/RaceRound'
import type { Horse } from '@/types/horse'

vi.mock('@/components/HorseDisplay.vue', () => ({
  default: {
    name: 'HorseDisplay',
    props: ['horse'],
    template: '<div class="horse-display">{{ horse.name }}</div>',
  },
}))

describe('RaceRoundHorseList', () => {
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
    {
      id: 3,
      name: 'Grace',
      color: 'green',
      conditionScore: 88,
    },
  ]

  const mockRaceRound: RaceRound = {
    roundNumber: 0,
    distance: 1000,
    horses: mockHorses,
  }

  it('renders all horses in the race round', () => {
    const wrapper = mount(RaceRoundHorseList, {
      props: {
        round: mockRaceRound,
      },
    })

    const horseDisplays = wrapper.findAll('.horse-display')
    expect(horseDisplays).toHaveLength(3)
    expect(wrapper.text()).toContain('Barbara')
    expect(wrapper.text()).toContain('Ada')
    expect(wrapper.text()).toContain('Grace')
  })

  it('renders empty list when no horses in round', () => {
    const emptyRound: RaceRound = {
      roundNumber: 1,
      distance: 1200,
      horses: [],
    }

    const wrapper = mount(RaceRoundHorseList, {
      props: {
        round: emptyRound,
      },
    })

    expect(wrapper.find('.horse-display').exists()).toBe(false)
  })

  it('applies correct CSS classes to list items', () => {
    const wrapper = mount(RaceRoundHorseList, {
      props: {
        round: mockRaceRound,
      },
    })

    const listItems = wrapper.findAll('li')
    listItems.forEach((item) => {
      expect(item.classes()).toContain('flex')
      expect(item.classes()).toContain('justify-between')
      expect(item.classes()).toContain('items-center')
      expect(item.classes()).toContain('px-3')
      expect(item.classes()).toContain('py-2')
      expect(item.classes()).toContain('rounded-lg')
      expect(item.classes()).toContain('transition-colors')
      expect(item.classes()).toContain('duration-150')
      expect(item.classes()).toContain('hover:bg-gray-50')
    })
  })

  it('renders single horse correctly', () => {
    const singleHorseRound: RaceRound = {
      roundNumber: 2,
      distance: 800,
      horses: [mockHorses[0]],
    }

    const wrapper = mount(RaceRoundHorseList, {
      props: {
        round: singleHorseRound,
      },
    })

    const horseDisplays = wrapper.findAll('.horse-display')
    expect(horseDisplays).toHaveLength(1)
    expect(wrapper.text()).toContain('Barbara')
  })

  it('renders multiple horses in correct order', () => {
    const wrapper = mount(RaceRoundHorseList, {
      props: {
        round: mockRaceRound,
      },
    })

    const horseDisplays = wrapper.findAll('.horse-display')
    expect(horseDisplays[0].text()).toBe('Barbara')
    expect(horseDisplays[1].text()).toBe('Ada')
    expect(horseDisplays[2].text()).toBe('Grace')
  })
})
