import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { mount, VueWrapper } from '@vue/test-utils'

import TextInput from './TextInput.vue'
import { nextTick } from "vue";
import { checkStringLimit } from "../../../helpers/stringMethods";

// render factory
let wrapper: VueWrapper

// helpers
const findInput = () => wrapper.find('input')
const findLabel = () => wrapper.find('label')
const findErrorMsg = () => wrapper.find('[data-testid=error-message]')

describe('different prop state', () => {
  afterEach(() => {
    wrapper.unmount()
  })
  test('show only input and hide label when label is not passed in props', async () => {
    wrapper = mount(TextInput, {
      props: {
        charLimit: 10
      }
    })
    expect(findInput().exists()).toBe(true)
    expect(findLabel().exists()).toBe(false)
  })
  test('label for and input id exists when id is passed in props', async () => {
    wrapper = mount(TextInput, {
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
    wrapper = mount(TextInput, {
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
  test('emit input blur event', async () => {
    await findInput().trigger('focus')
    await findInput().trigger('blur')
    expect(wrapper.emitted().inputBlur).toBeTruthy()
  })
  test('emit trimmed input on input change', async () => {
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

describe('error message', () => {
  afterEach(() => {
    wrapper.unmount()
  })
  test('do not show error message if not passed in props', async () => {
    wrapper = mount(TextInput, {
      props: {
        label: 'Label',
        charLimit: 10,
      }
    })
    expect(findErrorMsg().exists()).toBe(false)
  })
  test('show error message if passed in props', async () => {
    wrapper = mount(TextInput, {
      props: {
        label: 'Label',
        charLimit: 10,
        errorMessage: 'Error'
      }
    })
    expect(findErrorMsg().exists()).toBe(true)
    expect(findErrorMsg().text()).toBe('Error')
  })
})

