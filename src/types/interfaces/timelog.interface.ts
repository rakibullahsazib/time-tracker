export interface TimeLogRequest {
  date: string, //iso
  startTime: string,
  endTime: string,
  description: string,
  userId: number,
}
export interface TimeLog extends TimeLogRequest {
  id: number
}