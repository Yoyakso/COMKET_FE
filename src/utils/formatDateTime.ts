import { DateTime } from "luxon"

export const formatDateTime = (timestamp: string): string => {
  try {
    const date = DateTime.fromISO(timestamp, { zone: "utc" }).setZone("Asia/Seoul")
    if (!date.isValid) return ""

    const now = DateTime.now().setZone("Asia/Seoul")
    const isToday = date.hasSame(now, "day")

    return isToday
      ? date.toFormat("a h:mm")
      : date.toFormat("MM/dd a h:mm")
  } catch (error) {
    console.error("Luxon 날짜 포맷 오류:", error)
    return ""
  }
}
