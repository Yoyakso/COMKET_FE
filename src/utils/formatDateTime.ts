export const formatDateTime = (timestamp: string | number): string => {
  try {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return ""

    const today = new Date()
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()

    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const ampm = hours >= 12 ? "오후" : "오전"
    const formattedHours = hours % 12 || 12

    if (isToday) {
      return `${ampm} ${formattedHours}:${minutes}`
    } else {
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const day = date.getDate().toString().padStart(2, "0")
      return `${month}/${day} ${ampm} ${formattedHours}:${minutes}`
    }
  } catch (error) {
    console.error("날짜 포맷팅 오류:", error)
    return ""
  }
}
