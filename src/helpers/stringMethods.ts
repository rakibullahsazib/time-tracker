
export const checkStringLimit = (str: string, limit: number): string => {
  let output = str.trimStart()
  if (output.length > limit) {
    output = output.substring(0, limit)
  }
  return output
}

export const getExcerpt = (str: string, limit: number) => {
  if (!str) return ''
  if (str.length > limit) {
    return `${str.substring(0, limit)}...`
  }
  return str
}