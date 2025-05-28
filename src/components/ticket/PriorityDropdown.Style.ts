import styled from "styled-components"
import { motion } from "framer-motion"
import { color } from "@/styles/color"
import type { Priority } from "@/types/filter"

export const PRIORITY_COLORS: Record<Priority, string> = {
  HIGH: color.error || "#dc2626",
  MEDIUM: color.warning || "#d97706",
  LOW: color.success || "#10b981",
}

export const Positioner = styled.div`
  position: relative;
  display: inline-block;
`

export const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  gap: 6px;
  height: 24px;
  border-radius: 100px;
  color: ${color.textLabel};
  font-size: 12px;
  font-weight: 500;
  background-color: #F7F8FA;
  cursor: pointer;
  z-index: 1;
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #f1f3f4;
  }
`

export const PriorityDot = styled.span<{ priority: Priority }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => PRIORITY_COLORS[props.priority]};
  flex-shrink: 0;
`

export const MorphDropdown = styled(motion.div)`
  position: relative;
  margin-top: 3px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 4px 0;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 99;
  overflow: hidden;
`

export const Option = styled.div<{ $isHovered?: boolean }>`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${color.textLabel};
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease;
  background-color: ${({ $isHovered }) => ($isHovered ? "#f3f4f6" : "transparent")};

  &:hover {
    background-color: #f3f4f6;
  }
`
