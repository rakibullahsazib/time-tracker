import { useUserStore } from "../store/userStore"


export const authenticateUser = (to: any, from: any, next: any) => {
  const userStore = useUserStore()

  if (!userStore.currentUser) {
    next({ name: 'Welcome' })
    return
  } else {
    next()
  }
}