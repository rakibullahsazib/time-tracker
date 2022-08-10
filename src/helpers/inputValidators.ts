export const validateEmailAddress = (value: string): boolean => {
  if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
    return true
  }
  return false
}