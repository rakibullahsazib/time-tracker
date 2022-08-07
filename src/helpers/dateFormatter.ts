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
export const stringifyDate = (date: Date) => {
  // input: js date object
  // output: Aug 20, 2021 (for bad input returns Invalid Date)
  return date.toLocaleDateString('en-us', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export const compareISODates = (start: string, end: string) => {
  return new Date(start) < new Date(end)
}

export const checkSameDay = (iso1: string, iso2: string) => {
  // checks if year, month and date are same of twor ISO string
  const d1 = new Date(iso1)
  const d2 = new Date(iso2)
  console.log(iso1, iso2, d1.getFullYear(), d2.getFullYear(), d1.getMonth(), d2.getMonth(), d1.getDay(), d2.getDay())
  if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDay() === d2.getDay()) {
    console.log('same day')
    return true
  }
  return false
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