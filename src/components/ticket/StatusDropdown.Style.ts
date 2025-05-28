import styled from "styled-components"
import { motion } from "framer-motion"
import type { Status } from "@/types/filter"

export const STATUS_COLORS: Record<Status, { bg: string; text: string, border: string }> = {
  TODO: { bg: "#F4F4F8", text: "#5F6692", border: "#D6D8E4" },
  IN_PROGRESS: { bg: "#F3F5FF", text: "#3052DF", border: "#CDD6FD" },
  DONE: { bg: "#DBFFF4", text: "#16C390", border: "#97EED4" },
  HOLD: { bg: "#FFEDED", text: "#EF5D5D", border: "#F4BBBB" },
  DROP: { bg: "#E7EAF1", text: "#525964", border: "#CCD3E0" },
  BACKLOG: { bg: "#FCEBE0", text: "#763517", border: "#E1C7B8" },
}

export const Positioner = styled.div`
  position: relative;
  display: inline-block;
`

export const Wrapper = styled.div<{ $status: Status }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ $status }) => STATUS_COLORS[$status]?.bg || "#F1F2F6"};
  color: ${({ $status }) => STATUS_COLORS[$status]?.text || "#6B7280"};
  white-space: nowrap;
  min-width: 80px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({ $status }) => STATUS_COLORS[$status]?.border || "#6B7280"};

  &:hover {
    filter: brightness(0.97);
  }
`

export const MorphDropdown = styled(motion.div)`
  position: relative;
  margin-top: 3px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 4px 0;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 99;
  overflow: hidden;
`

export const Option = styled.div<{ $status: Status }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ $status }) => STATUS_COLORS[$status]?.text || "#6B7280"};
  background-color: ${({ $status }) => STATUS_COLORS[$status]?.bg || "#F1F2F6"};
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.97);
  }
`
