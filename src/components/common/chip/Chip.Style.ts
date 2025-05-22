import styled, { css } from "styled-components";
import { color } from "@/styles/color";
import type { ChipVariant, ChipStyle, ChipSize } from "./Chip";

const Size: Record<ChipSize, ReturnType<typeof css>> = {
  sm: css`
    padding: 6px 8px;
    font-size: 12px;
    min-width: 66px;
    height: 24px;
    border-radius: 2px;
  `,
  md: css`
    padding: 6px 10px;
    font-size: 14px;
    min-width: 77px;
    height: 32px;
    border-radius: 2px;
  `,
};

const ActiveStyle: Record<ChipVariant, ReturnType<typeof css>> = {
  primary: css`
    background-color: ${color.primary};
    color: white;
    &:hover {
      background-color: ${color.primaryHover};
    }
  `,
  indigo: css`
    background-color: #f0f2fc;
    color: ${color.textPrimary};
    &:hover {
      background-color: ${color.indigo0};
    }
  `,
  teal: css`
    background-color: ${color.teal500};
    color: white;
    &:hover {
      background-color: ${color.teal400};
    }
  `,
  lightTeal: css`
    background-color: #eafdf7;
    color: ${color.textSecondary};
    &:hover {
      background-color: ${color.teal0};
    }
  `,
  black: css`
    background-color: ${color.basic1000};
    color: white;
    &:hover {
      background-color: ${color.basic800};
    }
  `,
  basic: css`
    background-color: ${color.basic100};
    color: ${color.textPrimary};
    &:hover {
      background-color: ${color.basic200};
    }
  `,
};

const DisabledStyle = css`
  background-color: ${color.primaryDisabled};
  color: ${color.textTertiary};
  cursor: not-allowed;
`;

interface ChipContainerProps {
  $variant: ChipVariant;
  $styleType: ChipStyle;
  size: ChipSize;
  disabled?: boolean;
}

export const ChipContainer = styled.div<ChipContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 400;
  white-space: nowrap;
  white-space: nowrap;
  flex-shrink: 0;

  ${({ size }) => Size[size]}
  ${({ $variant, disabled }) => (disabled ? DisabledStyle : ActiveStyle[$variant])}
`;

export const ChipText = styled.span`
  white-space: nowrap;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  display: inline-block;
`;

export const CloseButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `}
`;
