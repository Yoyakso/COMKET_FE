export const formatDate = (isoString: string): string => {
  if (!isoString) return "-"
  return isoString.slice(0, 10)
}
