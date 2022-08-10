import { describe, expect, test } from "vitest";
import { validateEmailAddress } from "./inputValidators";

describe('validateEmailAddress', () => {
  test('should return true for valid email addresses', () => {
    expect(validateEmailAddress('abcd@example.com')).toBe(true)
    expect(validateEmailAddress('firstname.lastname@example.com')).toBe(true)
    expect(validateEmailAddress('email@subdomain.example.com')).toBe(true)
    // expect(validateEmailAddress('firstname+lastname@example.com')).toBe(true)
    // expect(validateEmailAddress('email@123.123.123.123')).toBe(true)
    // expect(validateEmailAddress('email@[123.123.123.123]')).toBe(true)
    // expect(validateEmailAddress('"email"@example.com')).toBe(true)
    expect(validateEmailAddress('1234567890@example.com')).toBe(true)
    expect(validateEmailAddress('email@example-one.com')).toBe(true)
    expect(validateEmailAddress('_______@example.com')).toBe(true)
    expect(validateEmailAddress('email@example.name')).toBe(true)
    // expect(validateEmailAddress('email@example.museum')).toBe(true)
    expect(validateEmailAddress('email@example.co.jp')).toBe(true)
    expect(validateEmailAddress('firstname-lastname@example.com')).toBe(true)
  })
  test('should return false for invalid email addresses', () => {
    expect(validateEmailAddress('plainaddress')).toBe(false)
    expect(validateEmailAddress('#@%^%#$@#$@#.com')).toBe(false)
    expect(validateEmailAddress('@example.com')).toBe(false)
    expect(validateEmailAddress('email@example')).toBe(false)
    expect(validateEmailAddress('Joe Smith <email@example.com>')).toBe(false)
    expect(validateEmailAddress('email.example.com')).toBe(false)
    expect(validateEmailAddress('email@example@example.com')).toBe(false)
    expect(validateEmailAddress('email@example.com (Joe Smith)')).toBe(false)
  })
})