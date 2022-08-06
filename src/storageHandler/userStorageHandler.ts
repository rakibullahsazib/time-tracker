import { User, UserRequest } from "../types/interfaces/user.interface"

export const getUsersFromLocalStorage = (): User[] => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  return users
}

export const getUserFromLocalStorage = (email: string) => {
  const users = getUsersFromLocalStorage()
  return users.find((u: User) => u.email === email)
}

// createUserInLocalStorage returns existing user if found or create a new user then return it
export const createUserInLocalStorage = (user: UserRequest) => {
  const existingUser = getUserFromLocalStorage(user.email)
  if (existingUser) {
    return existingUser
  }
  const users = getUsersFromLocalStorage()

  const newId = users.reduce((max: number, u: User) => {
    return u.id > max ? u.id : max
  }, 1)

  const newUser = {
    ...user,
    id: newId
  }
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))

  return newUser
}