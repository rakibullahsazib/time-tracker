import { defineStore } from 'pinia'
import { createUserInLocalStorage } from '../storageHandler/userStorageHandler'
import { User, UserRequest } from '../types/interfaces/user.interface'

export interface TimerStoreState {
  currentTime: string
}

export const useTimerStore = defineStore('timer', {
  state: (): TimerStoreState => {
    return {
      currentTime: new Date().toISOString()
    }
  },
  actions: {
    startClock() {
      setInterval(() => {
        this.currentTime = new Date().toISOString()
      }, 1000)
    }
  }
})