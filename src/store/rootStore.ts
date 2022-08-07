import { defineStore } from 'pinia'
import { useTimerStore } from './timerStore'
import { useUserStore } from './userStore'

export interface RootStoreState {
  currentDropdown: string,
}

export const useRootStore = defineStore('root', {
  state: (): RootStoreState => {
    return {
      currentDropdown: '',
    }
  },
  actions: {
    toggleCurrentDropdown(dropdown: string) {
      console.log('toggle', this.currentDropdown)
      if (dropdown === this.currentDropdown) {
        this.currentDropdown = ''
      } else {
        this.currentDropdown = dropdown
      }
    },
    resetStores() {
      console.log('reset')
      useTimerStore().$reset
      useUserStore().$reset
      this.$reset
    },
    logOut() {
      sessionStorage.clear()
      this.resetStores()
    }
  }
})