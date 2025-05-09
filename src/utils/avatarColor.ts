import { color } from "@styles/color"

const colorPalette = [
  `${color.lightBlue200}`, `${color.indigo200}`, `${color.teal200}`, `${color.blue200}`,
  "#FFC9C9", "#FFC3A9", "#FFE49A", "#75D4CF", "#FF9162", "#5E6DF2"
]

export const getColorFromString = (input: string): string => {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % colorPalette.length
  return colorPalette[index]
}
