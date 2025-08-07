import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceBoard from '@/components/RaceBoard.vue'
import type { RaceRound } from '@/types/RaceRound'
import type { RaceResult } from '@/types/RaceResult'
import type { Horse } from '@/types/horse'

vi.mock('@/components/HorseTrack.vue', () => ({
  default: {
    name: 'HorseTrack',
    props: ['index', 'horse', 'result'],
    emits: ['finished'],
    template:
      '<div class="horse-track" @click="$emit(\'finished\')">{{ horse.name }} - {{ index + 1 }}</div>',
  },
}))

describe('RaceBoard', () => {
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

  const mockResults: RaceResult[] = [
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
    {
      horse: mockHorses[2],
      time: 14.2,
      position: 3,
    },
  ]

  it('renders race board with correct title', () => {
    const wrapper = mount(RaceBoard, {
      props: {
        results: mockResults,
        raceRound: mockRaceRound,
      },
    })

    expect(wrapper.text()).toContain('Round 1 – 1000m')
  })

  it('renders all horses in the race', () => {
    const wrapper = mount(RaceBoard, {
      props: {
        results: mockResults,
        raceRound: mockRaceRound,
      },
    })

    const horseTracks = wrapper.findAll('.horse-track')
    expect(horseTracks).toHaveLength(3)
    expect(wrapper.text()).toContain('Barbara - 1')
    expect(wrapper.text()).toContain('Ada - 2')
    expect(wrapper.text()).toContain('Grace - 3')
  })

  it('emits allFinished when all horses finish', async () => {
    const wrapper = mount(RaceBoard, {
      props: {
        results: mockResults,
        raceRound: mockRaceRound,
      },
    })

    const horseTracks = wrapper.findAll('.horse-track')
    for (const track of horseTracks) {
      await track.trigger('click')
    }

    expect(wrapper.emitted('allFinished')).toBeTruthy()
    expect(wrapper.emitted('allFinished')).toHaveLength(1)
  })

  it('renders with empty results', () => {
    const wrapper = mount(RaceBoard, {
      props: {
        results: [],
        raceRound: mockRaceRound,
      },
    })

    expect(wrapper.text()).toContain('Round 1 – 1000m')
    const horseTracks = wrapper.findAll('.horse-track')
    expect(horseTracks).toHaveLength(3)
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(RaceBoard, {
      props: {
        results: mockResults,
        raceRound: mockRaceRound,
      },
    })

    const container = wrapper.find('.race-board')
    expect(container.classes()).toContain('border')
    expect(container.classes()).toContain('rounded-xl')
    expect(container.classes()).toContain('shadow-sm')
    expect(container.classes()).toContain('bg-white')
  })

  it('displays title with correct styling', () => {
    const wrapper = mount(RaceBoard, {
      props: {
        results: mockResults,
        raceRound: mockRaceRound,
      },
    })

    const title = wrapper.find('.title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Round 1 – 1000m')
  })

  it('handles different round numbers correctly', () => {
    const differentRound: RaceRound = {
      roundNumber: 2,
      distance: 1200,
      horses: mockHorses,
    }

    const wrapper = mount(RaceBoard, {
      props: {
        results: mockResults,
        raceRound: differentRound,
      },
    })

    expect(wrapper.text()).toContain('Round 3 – 1200m')
  })

  it('resets finished count when round number changes', async () => {
    const wrapper = mount(RaceBoard, {
      props: {
        results: mockResults,
        raceRound: mockRaceRound,
      },
    })

    const firstTrack = wrapper.find('.horse-track')
    await firstTrack.trigger('click')

    await wrapper.setProps({
      results: mockResults,
      raceRound: {
        ...mockRaceRound,
        roundNumber: 1,
      },
    })

    expect(wrapper.emitted('allFinished')).toBeFalsy()
  })

  it('renders with partial results', () => {
    const partialResults: RaceResult[] = [
      {
        horse: mockHorses[0],
        time: 12.8,
        position: 1,
      },
    ]

    const wrapper = mount(RaceBoard, {
      props: {
        results: partialResults,
        raceRound: mockRaceRound,
      },
    })

    const horseTracks = wrapper.findAll('.horse-track')
    expect(horseTracks).toHaveLength(3)
  })
})
