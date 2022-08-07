import { checkSameDay, compareISODates, getHourMinuteFromISO } from "../helpers/dateFormatter"
import dayjs from "dayjs"
import { TimeLog, TimeLogRequest } from "../types/interfaces/timelog.interface"


export const getTimeLogsFromLocalStorage = (): TimeLog[] => {
  const timeLogs = JSON.parse(localStorage.getItem('timeLogs') || '[]')
  return timeLogs
}

export const getUserTimeLogsFromLocalStorage = (userId: number) => {
  const timeLogs = getTimeLogsFromLocalStorage()
  return timeLogs.filter((t: TimeLog) => t.userId === userId)
}

export const createTimeLogInLocalStorage = (request: TimeLogRequest) => {
  const timeLogs = getTimeLogsFromLocalStorage()

  // check for existing time log
  const userTimeLogsAtThatDay = timeLogs.filter((t: TimeLog) => {
    return t.userId === request.userId && dayjs(t.date).isSame(request.date, 'day')
  })

  console.log('user time logs at that day', userTimeLogsAtThatDay)

  for (const log of userTimeLogsAtThatDay) {
    // check 1: request start time is not same as log start time
    // check 2: request end time is not same as log end time
    // check 3: request start time is not between start and end of a log
    // check 4: request end time is not between start and end of a log
    // check 5: log start time is not between start and end of the request
    // check 6: log end time is not between start and end of the request
    if (
      dayjs(request.startTime).isSame(log.startTime, 'minute')
      || dayjs(request.endTime).isSame(log.endTime, 'minute')
      || (dayjs(request.startTime).isAfter(log.startTime, 'minute') && dayjs(request.startTime).isBefore(log.endTime, 'minute'))
      ||
      (dayjs(request.endTime).isAfter(log.startTime, 'minute') && dayjs(request.endTime).isBefore(log.endTime, 'minute'))
      ||
      (dayjs(log.startTime).isAfter(request.startTime, 'minute') && dayjs(log.startTime).isBefore(request.endTime, 'minute'))
      ||
      (dayjs(log.endTime).isAfter(request.startTime, 'minute') && dayjs(log.endTime).isBefore(request.endTime, 'minute'))
    ) {
      return {
        response: 'Error',
        message: `A Time Log already exists between ${getHourMinuteFromISO(log.startTime)} and ${getHourMinuteFromISO(log.endTime)}`,
        data: null
      }
    }
  }

  const maxId = timeLogs.reduce((max: number, t: TimeLog) => {
    return t.id > max ? t.id : max
  }, 0)

  const newTimeLog = {
    ...request,
    id: maxId + 1
  }
  timeLogs.push(newTimeLog)
  localStorage.setItem('timeLogs', JSON.stringify(timeLogs))

  return {
    response: 'Success',
    message: 'New Time Log created',
    data: newTimeLog
  }
}