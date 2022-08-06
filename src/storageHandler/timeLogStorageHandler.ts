import { checkSameDay, compareISODates, getHourMinuteFromISO } from "../helpers/dateFormatter"
import { TimeLog, TimeLogRequest } from "../types/interfaces/timelog.interface"


export const getTimeLogsFromLocalStorage = (): TimeLog[] => {
  const timeLogs = JSON.parse(localStorage.getItem('timeLogs') || '[]')
  return timeLogs
}

export const getUserTimeLogsFromLocalStorage = (userId: number) => {
  const timeLogs = getTimeLogsFromLocalStorage()
  return timeLogs.filter((t: TimeLog) => t.userId === userId)
}


// createUserInLocalStorage returns existing user if found or create a new user then return it
// it returns false if the email address exist but the name doesn't match
export const createTimeLogInLocalStorage = (request: TimeLogRequest) => {
  const timeLogs = getTimeLogsFromLocalStorage()

  // check for existing time log
  const userTimeLogsAtThatDay = timeLogs.filter((t: TimeLog) => {
    t.userId === request.userId && checkSameDay(t.date, request.date)
  })

  for (const log of userTimeLogsAtThatDay) {
    // request start time and end time should be either before the log start time or,
    // request start time and end time should be after the log end time
    if (
      !(compareISODates(request.startTime, log.startTime) && compareISODates(request.endTime, log.startTime))
      || !(compareISODates(log.endTime, request.startTime) && compareISODates(log.endTime, request.endTime))
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