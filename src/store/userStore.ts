import { defineStore } from 'pinia'
import { createUserInLocalStorage } from '../storageHandler/userStorageHandler'
import { User, UserRequest } from '../types/interfaces/user.interface'
import { useRootStore } from './rootStore'

export interface UserStoreState {
  currentUser: User | undefined
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      currentUser: JSON.parse(sessionStorage.getItem('currentUser') || 'null') || undefined
    }
  },
  actions: {
    createUser(user: UserRequest) {
      const res: any = createUserInLocalStorage(user)
      console.log('create user', res)
      if (res.response === 'Success') {
        this.currentUser = res.data

        // save current user in session storage
        sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser))

      } else {
        return res.message
      }
      return ''
    },
  }
})