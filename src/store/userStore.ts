import { defineStore } from 'pinia'

export interface UserStoreState {
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {

    }
  },
  actions: {
  }
})