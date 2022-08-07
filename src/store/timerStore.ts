import dayjs from 'dayjs'
import { defineStore } from 'pinia'

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
      if (!state.timerStartTime) return '00:00:00'

      const d1 = dayjs(state.timerStartTime)
      const d2 = dayjs(state.currentTime)
      const secs = d2.diff(d1, 'seconds')

      const remainDerSecs = (secs % 60).toString().padStart(2, '0')
      const mins = Math.floor(secs / 60)
      const remainDerMins = (mins % 60).toString().padStart(2, '0')
      const hrs = Math.floor(mins / 60).toString().padStart(2, '0')

      return `${hrs}:${remainDerMins}:${remainDerSecs}`
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