import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseDisplay from '@/components/HorseDisplay.vue'
import type { Horse } from '@/types/horse'

vi.mock('@fortawesome/vue-fontawesome', () => ({
  FontAwesomeIcon: {
    name: 'FontAwesomeIcon',
    template: '<span class="font-awesome-icon" :style="$attrs.style">{{ $attrs.icon }}</span>',
  },
}))

describe('HorseDisplay', () => {
  const mockHorse: Horse = {
    id: 1,
    name: 'Barbara',
    color: 'red',
    conditionScore: 90,
  }

  it('renders horse name correctly', () => {
    const wrapper = mount(HorseDisplay, {
      props: {
        horse: mockHorse,
      },
    })

    expect(wrapper.text()).toContain('Barbara')
  })

  it('renders horse icon with correct color', () => {
    const wrapper = mount(HorseDisplay, {
      props: {
        horse: mockHorse,
      },
    })

    const icon = wrapper.find('.font-awesome-icon')
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('style')).toContain('color: red')
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(HorseDisplay, {
      props: {
        horse: mockHorse,
      },
    })

    const span = wrapper.find('span')
    expect(span.classes()).toContain('truncate')
    expect(span.classes()).toContain('flex')
    expect(span.classes()).toContain('items-center')
    expect(span.classes()).toContain('gap-2')
    expect(span.classes()).toContain('text-gray-800')
  })

  it('renders different horse data correctly', () => {
    const differentHorse: Horse = {
      id: 2,
      name: 'Ada',
      color: 'blue',
      conditionScore: 85,
    }

    const wrapper = mount(HorseDisplay, {
      props: {
        horse: differentHorse,
      },
    })

    expect(wrapper.text()).toContain('Ada')
    const icon = wrapper.find('.font-awesome-icon')
    expect(icon.attributes('style')).toContain('color: blue')
  })
})
