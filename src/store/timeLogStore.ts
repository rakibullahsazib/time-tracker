import { defineStore } from 'pinia'
import { createTimeLogInLocalStorage, getUserTimeLogsFromLocalStorage } from '../storageHandler/timeLogStorageHandler'
import { TimeLog, TimeLogRequest } from '../types/interfaces/timelog.interface'
import { useUserStore } from './userStore'

export interface TimeLogStoreState {
  currentUserTimeLogs: TimeLog[]
}

export const useTimeLogStore = defineStore('timeLog', {
  state: (): TimeLogStoreState => {
    return {
      currentUserTimeLogs: []
    }
  },
  actions: {
    getCurrentUserTimeLogs() {
      const currentUserId = useUserStore().currentUser?.id
      if (!currentUserId) return
      this.currentUserTimeLogs = getUserTimeLogsFromLocalStorage(currentUserId)
    },
    createTimeLog(request: TimeLogRequest) {
      const res: any = createTimeLogInLocalStorage(request)
      console.log('create time log', res)
      if (res.response === 'Success') {
        this.currentUserTimeLogs.push(res.data)
      } else {
        return res.message
      }
      return ''
    }
  }
})