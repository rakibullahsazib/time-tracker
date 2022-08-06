import { defineStore } from 'pinia'
import { createUserInLocalStorage, getUserFromLocalStorage } from '../storageHandler/userStorageHandler'
import { User, UserRequest } from '../types/interfaces/user.interface'

export interface UserStoreState {
  currentUser: User | undefined
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      currentUser: undefined
    }
  },
  actions: {
    getCurrentUser(email: string) {
      this.currentUser = getUserFromLocalStorage(email)
    },
    createUser(user: UserRequest) {
      this.currentUser = createUserInLocalStorage(user)
    }
  }
})