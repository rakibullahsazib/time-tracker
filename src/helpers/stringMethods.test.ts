import { describe, expect, test } from "vitest";
import { checkStringLimit, getExcerpt } from "./stringMethods";

describe('checkStringLimit', () => {
  test('should not truncate str if length is less than or equal limit', () => {
    expect(checkStringLimit('x'.repeat(6), 8)).toBe('x'.repeat(6))
    expect(checkStringLimit('x'.repeat(8), 8)).toBe('x'.repeat(8))
  })
  test('should truncate a string greater than the limit', () => {
    expect(checkStringLimit('x'.repeat(120), 8)).toBe('x'.repeat(8))
  })
  test('should trim starting spaces', () => {
    expect(checkStringLimit(`  ${'x'.repeat(120)}`, 8)).toBe('x'.repeat(8))
  })
  test('should not trim ending spaces if within length limit', () => {
    expect(checkStringLimit(`${'x'.repeat(7)} `, 8)).toBe(`${'x'.repeat(7)} `)
  })
})

describe('getExcerpt', () => {
  test('should not truncate str if length is less than limit', () => {
    expect(getExcerpt('x'.repeat(7), 8)).toBe('x'.repeat(7))
    expect(getExcerpt('x'.repeat(8), 8)).toBe('x'.repeat(8))
  })
  test('should trim ending spaces and then check for limit', () => {
    expect(getExcerpt(` ${'x'.repeat(8)} `, 8)).toBe(`${'x'.repeat(8)}`)
  })
  test('should truncate to specified length with dots, if str length is greater than limit', () => {
    expect(getExcerpt(` ${'x'.repeat(120)} `, 8)).toBe(`${'x'.repeat(8)}...`)
  })
})
