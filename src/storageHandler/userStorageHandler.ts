import { User, UserRequest } from "../types/interfaces/user.interface"

export const getUsersFromLocalStorage = (): User[] => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  return users
}

export const getUserFromLocalStorage = (email: string) => {
  const users = getUsersFromLocalStorage()
  return users.find((u: User) => u.email === email)
}

// CRUD


// createUserInLocalStorage returns existing user if found or create a new user then return it
// it returns false if the email address exist but the name doesn't match
export const createUserInLocalStorage = (user: UserRequest) => {
  const existingUser = getUserFromLocalStorage(user.email)
  // console.log(user, existingUser)
  if (existingUser) {
    // check for names
    if (user.firstName !== existingUser.firstName || user.lastName !== existingUser.lastName) {
      return {
        response: 'Error',
        message: 'This email already exists.',
        data: null
      }
    }
    return {
      response: 'Success',
      message: 'This user already exists.',
      data: existingUser
    }
  }
  const users = getUsersFromLocalStorage()

  const maxId = users.reduce((max: number, u: User) => {
    return u.id > max ? u.id : max
  }, 0)

  const newUser = {
    ...user,
    id: maxId + 1
  }
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))

  return {
    response: 'Success',
    message: 'New user created',
    data: newUser
  }
}