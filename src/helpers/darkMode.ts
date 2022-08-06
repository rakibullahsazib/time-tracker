export const initializeDarkMode = () => {
  const dark = localStorage.getItem('darkMode')
  if (dark !== null) {
    return JSON.parse(dark)
  }
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return true
  }
  return false
}