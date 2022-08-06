import { defineStore } from 'pinia'
import { initializeDarkMode } from '../helpers/darkMode'
import { useUserStore } from './userStore'

export interface RootStoreState {
  currentDropdown: string,
  darkMode: boolean,
}

export const useRootStore = defineStore('root', {
  state: (): RootStoreState => {
    return {
      currentDropdown: '',
      darkMode: initializeDarkMode(),
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
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      localStorage.setItem('darkMode', JSON.stringify(this.darkMode))
    },
    resetStores() {
      console.log('reset')
      useUserStore().$reset
      this.$reset
    }
  }
})