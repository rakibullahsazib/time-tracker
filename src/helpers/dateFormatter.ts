import dayjs from "dayjs"
export const getDateMonthYearFromISO = (iso: string) => {
  // input : iso string
  // output: Aug 20, 2021 (for bad input returns Invalid Date)
  const d = new Date(iso)
  return d.toLocaleDateString('en-us', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
export const getHourMinuteFromISO = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleString([], {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
}

export const getTimeDifferenceInMins = (startTime: string, endTime: string) => {
  const d1 = dayjs(startTime)
  const d2 = dayjs(endTime)
  return d2.diff(d1, 'minute')
}

export const formatTimeDifference = (mins: number) => {
  const hrs = Math.floor(mins / 60)
  const remainDerMins = mins % 60

  let str = ''
  if (hrs) str += `${hrs}h `
  str += `${remainDerMins}m`
  return str.trim()
}

export const formatCountdownTime = (startTime: string | undefined, endTime: string | undefined) => {
  // inputs are iso strings
  if (!startTime || !endTime) return '00:00:00'

  const d1 = dayjs(startTime)
  const d2 = dayjs(endTime)
  const secs = d2.diff(d1, 'seconds')

  const remainDerSecs = (secs % 60).toString().padStart(2, '0')
  const mins = Math.floor(secs / 60)
  const remainDerMins = (mins % 60).toString().padStart(2, '0')
  const hrs = Math.floor(mins / 60).toString().padStart(2, '0')

  return `${hrs}:${remainDerMins}:${remainDerSecs}`
}