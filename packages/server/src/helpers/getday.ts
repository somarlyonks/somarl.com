export default function getDayOfYear () {
  const now = new Date()
  const year = new Date(now.getFullYear(), 0, 0)
  const diff = (+now - +year) + ((year.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000)
  const day = 1000 * 60 * 60 * 24
  return diff / day | 0
}
