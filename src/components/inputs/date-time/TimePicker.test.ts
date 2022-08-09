import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { mount } from '@vue/test-utils'
import TimePicker from './TimePicker.vue'

let wrapper: any
const createWrapper = () => {
  wrapper = mount(TimePicker, {
    props: {
      date: '2011-10-05T14:48:00.000Z',
      label: 'Test Label'
    }
  })
}
// helpers
const findLabel = () => wrapper.find('label')

describe('label visiblity based on props', () => {
  afterEach(() => {
    wrapper.unmount()
  })
  test('label should not exist if it is not truthy in props', async () => {
    wrapper = mount(TimePicker, {
      props: {
        date: '2011-10-05T14:48:00.000Z'
      }
    })
    expect(findLabel().exists()).toBe(false)
  })
  test('label should exist if it is defined in props', async () => {
    createWrapper()
    expect(findLabel().exists()).toBe(true)
  })
})

// Update time event should be tested using cypress