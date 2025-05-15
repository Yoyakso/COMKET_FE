import styled from "styled-components";
import { motion } from "framer-motion";
import type { Status } from "@/types/filter";
import { color } from "@/styles/color";

// 상태별 색상 맵
export const STATUS_COLORS: Record<Status, string> = {
  TODO: "#9CA3AF",
  IN_PROGRESS: "#3B82F6",
  DONE: "#10B981",
  HOLD: "#F59E0B",
  DROP: "#EF4444",
  BACKLOG: "#6B7280",
};

export const Positioner = styled.div`
  position: relative;
  display: inline-block;

`;

export const Wrapper = styled.div<{ $color: string }>`
  height: 18px;
  min-width: 60px;
  padding: 1px 8px;
  border-radius: 999px;
  background-color: transparent;
  color: ${({ $color }) => $color};
  //border: 1px solid ${({ $color }) => $color};
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
`;

export const MorphDropdown = styled(motion.div)`
  position: absolute;
  top: 85%;
  transform: translateX(-50%);
  margin-top: 6px;
  background-color:rgba(255, 255, 255, 0.95); 
  border-radius: 16px;
  padding: 6px 0;
  min-width: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 99;
`;

export const Option = styled.div<{ $color: string }>`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${color.textPlaceholder70};
  text-align: center;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ $color }) => $color}22; 
    color: ${({ $color }) => $color}; 
  }
`;
