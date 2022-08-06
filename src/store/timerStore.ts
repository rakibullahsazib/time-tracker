import { defineStore } from 'pinia'
import { createUserInLocalStorage } from '../storageHandler/userStorageHandler'
import { User, UserRequest } from '../types/interfaces/user.interface'

export interface TimerStoreState {
  currentTime: string | undefined
}

export const useTimerStore = defineStore('timer', {
  state: (): TimerStoreState => {
    return {
      currentTime: undefined
    }
  },
  actions: {
    startTimer() {
      setInterval(() => {
        this.currentTime = new Date().toISOString()
      }, 1000)
    }
  }
})