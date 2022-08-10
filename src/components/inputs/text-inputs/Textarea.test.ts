import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { mount, VueWrapper } from '@vue/test-utils'

import Textarea from './Textarea.vue'
import { nextTick } from "vue";
import { checkStringLimit } from "../../../helpers/stringMethods";

let wrapper: VueWrapper

// helpers
const findInput = () => wrapper.find('textarea')
const findLabel = () => wrapper.find('label')
const findCharCount = () => wrapper.find('[data-testid=charCount]')

describe('different prop state', () => {
  afterEach(() => {
    wrapper.unmount()
  })
  test('show only input and hide label, charCount when label, showCharCount is not passed in props', async () => {
    wrapper = mount(Textarea, {
      props: {
        charLimit: 10
      }
    })
    expect(findInput().exists()).toBe(true)
    expect(findLabel().exists()).toBe(false)
    expect(findCharCount().exists()).toBe(false)
  })
  test('show char count when showCharLimit is passed in props', async () => {
    wrapper = mount(Textarea, {
      props: {
        id: 'Test-id',
        label: 'Test',
        charLimit: 10,
        showCharCount: true
      }
    })
    expect(findCharCount().exists()).toBe(true)
  })
  test('label for and input id exists when id is passed in props', async () => {
    wrapper = mount(Textarea, {
      props: {
        id: 'Test-id',
        label: 'Test',
        charLimit: 10
      }
    })
    expect(findInput().attributes('id')).toBe('Test-id')
    expect(findLabel().attributes('for')).toBe('Test-id')
  })
})

describe('emit events', () => {
  const createWrapper = () => {
    wrapper = mount(Textarea, {
      props: {
        label: 'Label',
        charLimit: 10
      }
    })
  }
  beforeEach(() => {
    createWrapper()
  })
  afterEach(() => {
    wrapper.unmount()
  })
  test('emit trimmed input event on input change', async () => {
    await findInput().setValue(' Test ')
    expect(wrapper.emitted().inputChange).toBeTruthy()
    expect(wrapper.emitted().inputChange[0]).toEqual(['Test'])
  })
  test('emit substring within limit', async () => {
    const str = '  stners asrt neat  sta '
    await findInput().setValue(str)
    expect(wrapper.emitted().inputChange).toBeTruthy()
    nextTick()
    expect(wrapper.emitted().inputChange[0]).toEqual([checkStringLimit(str, 10).trimEnd()])
  })
})


