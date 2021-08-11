export const formatDatetime = (s: string) => {
    const date = new Date(s)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
}
