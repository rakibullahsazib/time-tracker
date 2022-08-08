import dayjs from "dayjs";
import { describe, expect, test } from "vitest";
import { formatCountdownTime, formatTimeDifference, getDateMonthYearFromISO, getHourMinuteFromISO, getTimeDifferenceInMins } from "./dateFormatter";

describe('getDateMonthYearFromISO', () => {
  test('should return date correctly for valid iso input', () => {
    expect(getDateMonthYearFromISO('2011-10-05T14:48:00.000Z')).toBe('Oct 05, 2011')
  })
  test('should return Invalid Date for invalid iso input', () => {
    expect(getDateMonthYearFromISO('test')).toBe('Invalid Date')
  })
})
describe('getHourMinuteFromISO', () => {
  test('should return hh:mm am/pm correctly for valid iso input', () => {
    expect(getHourMinuteFromISO('2011-10-05T14:48:00.000Z')).includes(':')
    expect(getHourMinuteFromISO('2011-10-05T14:48:00.000Z')).length(8)
  })
  test('should return Invalid Date for invalid iso input', () => {
    expect(getHourMinuteFromISO('test')).toBe('Invalid Date')
  })
})
describe('getTimeDifferenceInMins', () => {
  const startTime = new Date().toISOString()
  let endTime: string;
  test('should return 0 if end time is before start time', () => {
    endTime = dayjs(startTime).subtract(7, 'second').toISOString()
    expect(getTimeDifferenceInMins(startTime, endTime)).toBe(0)
  })
  test('should return 0 if difference is less than a minute', () => {
    endTime = dayjs(startTime).add(7, 'second').toISOString()
    expect(getTimeDifferenceInMins(startTime, endTime)).toBe(0)
  })
  test('should return 1 if difference is less equal to a minute but less than 2 min', () => {
    endTime = dayjs(startTime).add(60, 'second').toISOString()
    expect(getTimeDifferenceInMins(startTime, endTime)).toBe(1)
    endTime = dayjs(startTime).add(119, 'second').toISOString()
    expect(getTimeDifferenceInMins(startTime, endTime)).toBe(1)
  })
  test('time difference of hours / days should also return in minutes', () => {
    endTime = dayjs(startTime).add(7, 'hour').toISOString()
    expect(getTimeDifferenceInMins(startTime, endTime)).toBe(7 * 60)
    endTime = dayjs(startTime).add(7, 'day').toISOString()
    expect(getTimeDifferenceInMins(startTime, endTime)).toBe(7 * 24 * 60)
  })
})

describe('formatTimeDifference', () => {
  test('should trnsform incorrect input into 0m', () => {
    expect(formatTimeDifference(-1)).toBe('0m')
  })
  test('should trnsform mins into the correct format', () => {
    expect(formatTimeDifference(0)).toBe('0m')
    expect(formatTimeDifference(20)).toBe('20m')
    expect(formatTimeDifference(60)).toBe('1h 0m')
    expect(formatTimeDifference(80)).toBe('1h 20m')
    expect(formatTimeDifference(2 * 24 * 60)).toBe('48h 0m')
    expect(formatTimeDifference(2 * 24 * 60 + 20)).toBe('48h 20m')
  })
})

describe('formatCountdownTime', () => {
  const startTime = new Date().toISOString()
  let endTime: string;
  test('should return 00:00:00 for invalid input', () => {
    expect(formatCountdownTime('0', '0')).toBe('00:00:00')
    expect(formatCountdownTime(undefined, undefined)).toBe('00:00:00')
    expect(formatCountdownTime('invalid', 'invalid')).toBe('00:00:00')
  })
  test('should return 00:00:00 if end time is before start time', () => {
    endTime = dayjs(startTime).subtract(1, 'second').toISOString()
    expect(formatCountdownTime(startTime, endTime)).toBe('00:00:00')
  })
  test('should return countdown time in the correct format', () => {
    endTime = dayjs(startTime).add(1, 'second').toISOString()
    expect(formatCountdownTime(startTime, endTime)).toBe('00:00:01')
    endTime = dayjs(startTime).add(60, 'second').toISOString()
    expect(formatCountdownTime(startTime, endTime)).toBe('00:01:00')
    endTime = dayjs(startTime).add(20, 'minute').toISOString()
    expect(formatCountdownTime(startTime, endTime)).toBe('00:20:00')
    endTime = dayjs(startTime).add(3, 'hour').toISOString()
    expect(formatCountdownTime(startTime, endTime)).toBe('03:00:00')
    endTime = dayjs(startTime).add(1, 'day').add(3, 'hour').add(2, 'minute').add(14, 'second').toISOString()
    expect(formatCountdownTime(startTime, endTime)).toBe('27:02:14')
  })
})