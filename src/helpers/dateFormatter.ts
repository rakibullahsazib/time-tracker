import dayjs from "dayjs"
export const getDateMonthYearFromISO = (iso: string) => {
  return dayjs(iso).format('MMM DD, YYYY')
}
export const getHourMinuteFromISO = (iso: string) => {
  return dayjs(iso).format('hh:mm a')
}

export const getTimeDifferenceInMins = (startTime: string, endTime: string) => {
  if (dayjs(endTime).isBefore(startTime, 'minute')) return 0
  const d1 = dayjs(startTime)
  const d2 = dayjs(endTime)
  return d2.diff(d1, 'minute')
}

export const formatTimeDifference = (mins: number) => {
  if (mins < 0) return '0m'
  const hrs = Math.floor(mins / 60)
  const remainDerMins = mins % 60

  let str = ''
  if (hrs) str += `${hrs}h `
  str += `${remainDerMins}m`
  return str.trim()
}

export const formatCountdownTime = (startTime: string | undefined, endTime: string | undefined) => {
  // inputs are iso strings
  if (!dayjs(startTime).isValid() || !dayjs(endTime).isValid() || dayjs(endTime).isBefore(startTime, 'second')) return '00:00:00'

  const d1 = dayjs(startTime)
  const d2 = dayjs(endTime)
  const secs = d2.diff(d1, 'seconds')

  const remainDerSecs = (secs % 60).toString().padStart(2, '0')
  const mins = Math.floor(secs / 60)
  const remainDerMins = (mins % 60).toString().padStart(2, '0')
  const hrs = Math.floor(mins / 60).toString().padStart(2, '0')

  return `${hrs}:${remainDerMins}:${remainDerSecs}`
}