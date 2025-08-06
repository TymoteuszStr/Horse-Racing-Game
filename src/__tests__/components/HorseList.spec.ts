import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseList from '@/components/HorseList.vue'
import type { Horse } from '@/types/horse'

// Mock HorseDisplay component
vi.mock('@/components/HorseDisplay.vue', () => ({
  default: {
    name: 'HorseDisplay',
    props: ['horse'],
    template: '<div class="horse-display">{{ horse.name }} - {{ horse.conditionScore }}</div>',
  },
}))

describe('HorseList', () => {
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

  it('renders horse list correctly', () => {
    const wrapper = mount(HorseList, {
      props: {
        horseList: mockHorses,
      },
    })

    expect(wrapper.find('.horse-display').exists()).toBe(true)
    expect(wrapper.text()).toContain('Barbara - 90')
    expect(wrapper.text()).toContain('Ada - 85')
  })

  it('renders empty list when no horses provided', () => {
    const wrapper = mount(HorseList, {
      props: {
        horseList: [],
      },
    })

    expect(wrapper.find('.horse-display').exists()).toBe(false)
  })

  it('renders empty list when horseList is undefined', () => {
    const wrapper = mount(HorseList, {
      props: {},
    })

    expect(wrapper.find('.horse-display').exists()).toBe(false)
  })

  it('displays correct headers', () => {
    const wrapper = mount(HorseList, {
      props: {
        horseList: mockHorses,
      },
    })

    expect(wrapper.text()).toContain('Horse')
    expect(wrapper.text()).toContain('Condition')
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(HorseList, {
      props: {
        horseList: mockHorses,
      },
    })

    const container = wrapper.find('div')
    expect(container.classes()).toContain('p-4')
    expect(container.classes()).toContain('w-full')
    expect(container.classes()).toContain('max-w-sm')
    expect(container.classes()).toContain('border')
    expect(container.classes()).toContain('rounded-xl')
    expect(container.classes()).toContain('shadow-sm')
    expect(container.classes()).toContain('bg-white')
    expect(container.classes()).toContain('min-w-[300px]')
  })

  it('renders multiple horses in list', () => {
    const wrapper = mount(HorseList, {
      props: {
        horseList: mockHorses,
      },
    })

    const horseDisplays = wrapper.findAll('.horse-display')
    expect(horseDisplays).toHaveLength(2)
  })
})
