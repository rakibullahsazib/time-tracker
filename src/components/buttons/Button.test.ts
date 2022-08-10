import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { mount, VueWrapper } from '@vue/test-utils'

import Button from './Button.vue'

// render factory
let wrapper: VueWrapper

// helpers
const findBtn = () => wrapper.find('button')


describe('disabled state', () => {
  const createWrapper = () => {
    wrapper = mount(Button, {
      props: {
        title: 'Title',
        btnType: 'disabled'
      }
    })
  }
  beforeEach(() => {
    createWrapper()
  })
  afterEach(() => {
    wrapper.unmount()
  })
  test('show button text as passed in props', async () => {
    expect(findBtn().text()).toBe('Title')
  })
  test('button disabled', () => {
    expect(wrapper.props('btnType')).toBe('disabled')
    expect(findBtn().attributes().disabled).toBeDefined()
    expect(findBtn().classes()).includes('cursor-not-allowed')
  })
})

describe('not disabled state', () => {
  const createWrapper = () => {
    wrapper = mount(Button, {
      props: {
        title: 'Title'
      }
    })
  }
  beforeEach(() => {
    createWrapper()
  })
  afterEach(() => {
    wrapper.unmount()
  })
  test('show button text as passed in props', async () => {
    expect(findBtn().text()).toBe('Title')
  })
  test('button not disabled', () => {
    expect(findBtn().attributes().disabled).toBeUndefined()
  })
})
describe('Button type primary', () => {
  const createWrapper = () => {
    wrapper = mount(Button, {
      props: {
        title: 'Title',
        btnType: 'primary'
      }
    })
  }
  beforeEach(() => {
    createWrapper()
  })
  afterEach(() => {
    wrapper.unmount()
  })
  test('show button text as passed in props', async () => {
    expect(findBtn().text()).toBe('Title')
  })
  test('button not disabled', () => {
    expect(findBtn().attributes().disabled).toBeUndefined()
  })
})

describe('Button type danger', () => {
  const createWrapper = () => {
    wrapper = mount(Button, {
      props: {
        title: 'Title',
        btnType: 'danger'
      }
    })
  }
  beforeEach(() => {
    createWrapper()
  })
  afterEach(() => {
    wrapper.unmount()
  })
  test('show button text as passed in props', async () => {
    expect(findBtn().text()).toBe('Title')
  })
  test('btn should have warning class', async () => {
    expect(findBtn().classes().some((c: string) => c.includes('warning'))).toBe(true)
  })
  test('button not disabled', () => {
    expect(findBtn().attributes().disabled).toBeUndefined()
  })
})



