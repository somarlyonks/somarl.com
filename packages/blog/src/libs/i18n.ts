export const formatDatetime = (s: string) => {
    const date = new Date(s)
    const timeString = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})
    return `${date.toLocaleDateString()} ${timeString}`
}
