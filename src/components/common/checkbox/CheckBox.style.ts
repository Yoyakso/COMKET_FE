import styled, { css } from "styled-components";
import { color } from "@/styles/color";

export type CheckBoxVariant = "primary" | "indigo" | "black" | "error" | "disabled";
export type CheckBoxVisualState = "unchecked" | "checked" | "indeterminate";
export type CheckBoxInteractionState = "default" | "hp";
export type CheckBoxSize = "sm" | "md" | "lg";


const boxSizeStyles: Record<CheckBoxSize, ReturnType<typeof css>> = {
  sm: css`width: 16px; height: 16px;`,
  md: css`width: 20px; height: 20px;`,
  lg: css`width: 24px; height: 24px;`,
};

const iconSizeStyles: Record<CheckBoxSize, ReturnType<typeof css>> = {
  sm: css`svg { width: 12px; height: 12px; }`,
  md: css`svg { width: 14px; height: 14px; }`,
  lg: css`svg { width: 16px; height: 16px; }`,
};

const labelFontSize: Record<CheckBoxSize, ReturnType<typeof css>> = {
  sm: css`font-size: 12px;`,
  md: css`font-size: 14px;`,
  lg: css`font-size: 16px;`,
};

const gapStyles: Record<CheckBoxSize, ReturnType<typeof css>> = {
  sm: css`gap: 4px;`,
  md: css`gap: 6px;`,
  lg: css`gap: 10px;`,
};

export const Container = styled.label<{ size: CheckBoxSize }>`
  display: inline-flex;
  align-items: center;
  ${({ size }) => gapStyles[size]}
`;


const backgroundStyles = {
  primary: {
    unchecked: { default: color.white, hp: color.white },
    checked: { default: color.teal500, hp: color.teal400 },
    indeterminate: { default: color.teal500, hp: color.teal400 },
  },
  indigo: {
    unchecked: { default: color.white, hp: color.white },
    checked: { default: color.indigo500, hp: color.indigo400 },
    indeterminate: { default: color.indigo500, hp: color.indigo400 },
  },
  black: {
    unchecked: { default: color.white, hp: color.white },
    checked: { default: color.basic1000, hp: color.basic900 },
    indeterminate: { default: color.basic1000, hp: color.basic900 },
  },
  error: {
    unchecked: { default: color.white, hp: color.white },
    checked: { default: color.error, hp: color.error },
    indeterminate: { default: color.error, hp: color.error },
  },
  disabled: {
    unchecked: { default: color.textPlaceholder16, hp: color.textPlaceholder16 },
    checked: { default: color.textPlaceholder16, hp: color.textPlaceholder16 },
    indeterminate: { default: color.textPlaceholder16, hp: color.textPlaceholder16 },
  },
};


const borderStyles = (
  variant: CheckBoxVariant,
  visualState: CheckBoxVisualState,
  interactionState: CheckBoxInteractionState
): string =>
  variant === "disabled" ? `1px solid ${color.textPlaceholder24}` 
  :variant === "error" && visualState !== "unchecked" ? "none" 
  :visualState === "checked" || visualState === "indeterminate" ? "none"
  :variant === "error" ? `1px solid ${color.error}`
  :interactionState === "hp" ? `1px solid ${
    { primary: color.teal400, indigo: color.indigo400, black: color.basic900 }[variant]
  }` :
  `1px solid ${color.textPlaceholder24}`;


const iconColorStyles = (
  variant: CheckBoxVariant,
  visualState: CheckBoxVisualState,
  interactionState: CheckBoxInteractionState
): string =>
  variant === "disabled" ? color.textPlaceholder24 
  :visualState === "unchecked" ? "transparent" 
  :color.white;


export const Box = styled.div<{
  size: CheckBoxSize;
  variant: CheckBoxVariant;
  visualState: CheckBoxVisualState;
  interactionState: CheckBoxInteractionState;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: ${({ variant }) => (variant === "disabled" ? "not-allowed" : "pointer")};

  ${({ size }) => css`
    ${boxSizeStyles[size]};
    ${iconSizeStyles[size]};
  `}

  ${({ variant, visualState, interactionState }) => {
    const background = backgroundStyles[variant][visualState][interactionState];
    const border = borderStyles(variant, visualState, interactionState);
    const iconColor = iconColorStyles(variant, visualState, interactionState);

    return css`
      background-color: ${background};
      border: ${border};

      svg {
        fill: ${iconColor};
      }

      svg path {
        fill: ${iconColor};
      }
    `;
  }}
`;


export const Label = styled.span<{ size: CheckBoxSize; variant: CheckBoxVariant }>`
  ${({ size }) => labelFontSize[size]}
  color: ${({ variant }) =>
    variant === "disabled"
      ? color.textTertiary : variant === "error"
      ? color.error : color.textPrimary};
`;
