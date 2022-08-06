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
    createUser(user: UserRequest) {
      const res: any = createUserInLocalStorage(user)
      console.log('create user', res)
      if (res.response === 'Success') {
        this.currentUser = res.data
      } else {
        return res.message
      }
      return ''
    }
  }
})