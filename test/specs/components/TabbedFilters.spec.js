import TabbedFilters from '../../../src/components/TabbedFilters.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('TabbedFilters', () => {
  it('sets active tab', () => {
    let localVue = createLocalVue()

    let tabs = shallowMount(TabbedFilters, {
      localVue,
      propsData: {
        filter: {
          tabs: []
        }
      }
    })
    tabs.vm.setActive({ name: 'me' })
    expect(tabs.vm.activeTab).toMatchObject({ name: 'me' })
  })

  it('gets the correct title', () => {
    let localVue = createLocalVue()

    let tabs = shallowMount(TabbedFilters, {
      localVue,
      propsData: {
        filter: {
          tabs: []
        }
      }
    })

    expect(tabs.vm.getTitle({
      name: 'General Tab',
      type: 'null'
    })).toBe('General Tab')

    expect(tabs.vm.getTitle({
      type: 'date',
      name: 'Date'
    })).toBe('Date (All)')

    expect(tabs.vm.getTitle({
      type: 'date',
      from: '12-12-1900',
      name: 'Date'
    })).toBe('Date (Since 12-12-1900)')

    expect(tabs.vm.getTitle({
      type: 'date',
      to: '12-12-1900',
      name: 'Date'
    })).toBe('Date (Before 12-12-1900)')

    expect(tabs.vm.getTitle({
      type: 'date',
      from: '10-12-1900',
      to: '12-12-1900',
      name: 'Date'
    })).toBe('Date (10-12-1900 to 12-12-1900)')

    expect(tabs.vm.getTitle({
      type: 'range',
      name: 'Age'
    })).toBe('Age (All)')

    expect(tabs.vm.getTitle({
      type: 'range',
      from: 10,
      name: 'Age'
    })).toBe('Age (Above 10)')

    expect(tabs.vm.getTitle({
      type: 'range',
      to: 20,
      name: 'Age'
    })).toBe('Age (Below 20)')

    expect(tabs.vm.getTitle({
      type: 'range',
      from: 10,
      to: 20,
      name: 'Age'
    })).toBe('Age (10 to 20)')

    expect(tabs.vm.getTitle({
      name: 'Age',
      from: 2,
      to: 5
    })).toBe('Age (2 to 5)')
  })
})
