import { User } from "../types/interfaces/user.interface"

export const getUsersFromLocalStorage = (): User[] => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  return users
}

export const getUserFromLocalStorage = (email: string) => {
  const users = getUsersFromLocalStorage()
  return users.find((u: User) => u.email === email)
}

export const createUserInLocalStorage = (user: User) => {
  const existUser = getUserFromLocalStorage(user.email)
  if (existUser) {
    return existUser
  }
  const users = getUsersFromLocalStorage()
  users.push(user)
  localStorage.setItem('users', JSON.stringify(users))
}