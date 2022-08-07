import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { formatCountdownTime } from '../helpers/dateFormatter'

export interface TimerStoreState {
  currentTime: string,
  timerStartTime: string | undefined, //iso
}

export const useTimerStore = defineStore('timer', {
  state: (): TimerStoreState => {
    return {
      currentTime: new Date().toISOString(),
      timerStartTime: undefined
    }
  },
  getters: {
    timerCountdown(state) {
      return formatCountdownTime(state.timerStartTime, state.currentTime)
    }
  },
  actions: {
    startClock() {
      setInterval(() => {
        this.currentTime = new Date().toISOString()
      }, 1000)
    },
    setTimerStartTime(startTime: string | undefined) {
      this.timerStartTime = startTime
    }
  }
})