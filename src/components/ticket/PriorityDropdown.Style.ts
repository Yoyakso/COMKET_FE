import styled from "styled-components";
import { motion } from "framer-motion";
import type { Priority } from "@/types/filter";

// 색상 맵
export const PRIORITY_COLORS: Record<Priority, string> = {
  HIGH: "hsla(0, 100.00%, 65.90%, 0.95)",
  MEDIUM: "rgba(255, 214, 8, 0.95)",
  LOW: "rgba(42, 220, 167, 0.95)",
};

export const Positioner = styled.div`
  position: relative;
  display: inline-block;
`;

export const Wrapper = styled.div<{ $color: string }>`
  height: 20px;
  width: 58px;
  padding: 2px 10px;
  border-radius: 999px;
  background-color: ${({ $color }) => $color};
  color: white;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
`;


export const MorphDropdown = styled(motion.div)<{ $color: string }>`
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6px;
  background-color: ${({ $color }) => $color};
  transition: background-color 0.3s ease;
  border-radius: 16px;
  padding: 6px 0;
  min-width: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 99;
  overflow: hidden;
`;

export const Option = styled.div`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  text-align: center;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
