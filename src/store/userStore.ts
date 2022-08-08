import { defineStore } from 'pinia'
import { createUserInLocalStorage } from '../storageHandler/userStorageHandler'
import { User, UserRequest } from '../types/interfaces/user.interface'

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
    createUser(request: UserRequest) {
      const res: any = createUserInLocalStorage(request)
      console.log('create user', res)
      if (res.response === 'Success') {
        this.currentUser = res.data

        // save current user in session storage
        sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser))

      } else {
        this.currentUser = undefined
        return res.message
      }
      return ''
    },
  }
})