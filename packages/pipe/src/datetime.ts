
export function now () {
  return (new Date(+(new Date()) - new Date().getTimezoneOffset() * 60 * 1000)).toISOString()
}
