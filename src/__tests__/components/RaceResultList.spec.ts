import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceResultList from '@/components/RaceResultList.vue'
import type { RaceResult } from '@/types/RaceResult'
import type { Horse } from '@/types/horse'

vi.mock('@/components/HorseDisplay.vue', () => ({
  default: {
    name: 'HorseDisplay',
    props: ['horse'],
    template: '<div class="horse-display">{{ horse.name }}</div>',
  },
}))

describe('RaceResultList', () => {
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

  const mockResults: RaceResult[] = [
    {
      horse: mockHorses[1],
      time: 13.5,
      position: 2,
    },
    {
      horse: mockHorses[0],
      time: 12.8,
      position: 1,
    },
    {
      horse: mockHorses[2],
      time: 14.2,
      position: 3,
    },
  ]

  it('renders race results in correct order (sorted by position)', () => {
    const wrapper = mount(RaceResultList, {
      props: {
        results: mockResults,
      },
    })

    const positions = wrapper.findAll('.w-8')
    expect(positions).toHaveLength(3)

    expect(positions[0].text()).toBe('1.')
    expect(positions[1].text()).toBe('2.')
    expect(positions[2].text()).toBe('3.')
  })

  it('displays horse names correctly', () => {
    const wrapper = mount(RaceResultList, {
      props: {
        results: mockResults,
      },
    })

    expect(wrapper.text()).toContain('Barbara')
    expect(wrapper.text()).toContain('Ada')
    expect(wrapper.text()).toContain('Grace')
  })

  it('displays race times correctly', () => {
    const wrapper = mount(RaceResultList, {
      props: {
        results: mockResults,
      },
    })

    expect(wrapper.text()).toContain('12.80s')
    expect(wrapper.text()).toContain('13.50s')
    expect(wrapper.text()).toContain('14.20s')
  })

  it('renders empty list when no results provided', () => {
    const wrapper = mount(RaceResultList, {
      props: {
        results: [],
      },
    })

    expect(wrapper.find('li').exists()).toBe(false)
  })

  it('applies correct CSS classes to list items', () => {
    const wrapper = mount(RaceResultList, {
      props: {
        results: mockResults,
      },
    })

    const listItems = wrapper.findAll('li')
    listItems.forEach((item) => {
      expect(item.classes()).toContain('flex')
      expect(item.classes()).toContain('items-center')
      expect(item.classes()).toContain('justify-between')
      expect(item.classes()).toContain('px-3')
      expect(item.classes()).toContain('py-2')
      expect(item.classes()).toContain('rounded-lg')
      expect(item.classes()).toContain('transition-colors')
      expect(item.classes()).toContain('duration-150')
      expect(item.classes()).toContain('hover:bg-gray-50')
    })
  })

  it('displays position numbers with correct styling', () => {
    const wrapper = mount(RaceResultList, {
      props: {
        results: mockResults,
      },
    })

    const positionDivs = wrapper.findAll('.w-8')
    positionDivs.forEach((div) => {
      expect(div.classes()).toContain('h-8')
      expect(div.classes()).toContain('flex')
      expect(div.classes()).toContain('items-center')
      expect(div.classes()).toContain('justify-center')
      expect(div.classes()).toContain('font-bold')
      expect(div.classes()).toContain('text-gray-600')
      expect(div.classes()).toContain('text-sm')
      expect(div.classes()).toContain('rounded-md')
      expect(div.classes()).toContain('bg-gray-100')
      expect(div.classes()).toContain('mr-3')
    })
  })

  it('sorts results by position correctly', () => {
    const unsortedResults: RaceResult[] = [
      {
        horse: mockHorses[2],
        time: 14.2,
        position: 3,
      },
      {
        horse: mockHorses[0],
        time: 12.8,
        position: 1,
      },
      {
        horse: mockHorses[1],
        time: 13.5,
        position: 2,
      },
    ]

    const wrapper = mount(RaceResultList, {
      props: {
        results: unsortedResults,
      },
    })

    const positions = wrapper.findAll('.w-8')
    expect(positions[0].text()).toBe('1.')
    expect(positions[1].text()).toBe('2.')
    expect(positions[2].text()).toBe('3.')
  })
})
