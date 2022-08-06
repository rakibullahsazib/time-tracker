export const parseIntString = (s: string) => {
  let intStr = ''
  for (let i = 0; i < s.length; i++) {
    if (/^\d+$/.test(s[i])) {
      intStr += s[i]
    }
  }
  return intStr
}
export const parseFloatFixed = (s: string, places: number): string | undefined => {
  const int = s.split('.')[0]
  let decimal = s.split('.')[1]
  if (!/^\d+$/.test(int)) {
    return undefined
  }
  if (decimal && !/^\d+$/.test(decimal)) {
    return int
  }

  if (decimal) {
    decimal = decimal.substring(0, places)
    return `${int}.${decimal}`
  } else if (s.indexOf('.') > -1) {
    return `${int}.`
  }
  return int
}

export const compactNumber = (n: number) => {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(n)
}