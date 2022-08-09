import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { mount } from '@vue/test-utils'
import DatePicker from './DatePicker.vue'

let wrapper: any
const createWrapper = (dropdownShown: boolean) => {
  wrapper = mount(DatePicker, {
    props: {
      isDropdownShown: dropdownShown,
      date: '2011-10-05T14:48:00.000Z',
      label: 'Test Label'
    }
  })
}
// helpers
const findLabel = () => wrapper.find('label')
const findSelectedDate = () => wrapper.find(`[data-testid=selected-date]`)
const findDropdown = () => wrapper.find('[data-testid=date-picker-dropdown]')

describe('label visiblity based on props', () => {
  afterEach(() => {
    wrapper.unmount()
  })
  test('label should not exist if it is not truthy in props', async () => {
    wrapper = mount(DatePicker, {
      props: {
        isDropdownShown: false,
        date: '2011-10-05T14:48:00.000Z'
      }
    })
    expect(findLabel().exists()).toBe(false)
  })
  test('label should exist if it is defined in props', async () => {
    createWrapper(false)
    expect(findLabel().exists()).toBe(true)
  })
})

describe('selected date based on props', () => {
  beforeEach(() => {
    createWrapper(false)
  })
  afterEach(() => {
    wrapper.unmount()
  })
  test('selected date should be the date passed in props', async () => {
    expect(findSelectedDate().exists()).toBe(true)
    expect(findSelectedDate().text()).toBe('Oct 05, 2011')
  })
})

describe('show/hide dropdown based on props', () => {
  afterEach(() => {
    wrapper.unmount()
  })
  test('dropdown should be hidden if isDropdownShown is false', async () => {
    createWrapper(false)
    expect(findDropdown().exists()).toBe(false)
  })
  test('dropdown should be shown if isDropdownShown is true', async () => {
    createWrapper(true)
    expect(findDropdown().exists()).toBe(true)
  })
})

describe('change props date after mount', () => {
  afterEach(() => {
    wrapper.unmount()
  })
  test('selected date should update when props date is changed by the parent', async () => {
    createWrapper(false)
    expect(findSelectedDate().text()).toBe('Oct 05, 2011')
    await wrapper.setProps({ date: '2011-10-06T14:48:00.000Z' })
    expect(findSelectedDate().text()).toBe('Oct 06, 2011')
  })
})

describe('emit events', () => {
  afterEach(() => {
    wrapper.unmount()
  })
  test('should emit toggle event when selected date is clicked', async () => {
    createWrapper(false)
    findSelectedDate().trigger('click')
    expect(wrapper.emitted().toggle).toBeTruthy()
  })
  test('should not emit toggle event when disabled', async () => {
    wrapper = mount(DatePicker, {
      props: {
        isDropdownShown: false,
        date: '2011-10-05T14:48:00.000Z',
        label: 'Test Label',
        disabled: true
      }
    })
    findSelectedDate().trigger('click')
    expect(wrapper.emitted().toggle).toBeFalsy()
  })
  // Update date event should be tested using cypress
})