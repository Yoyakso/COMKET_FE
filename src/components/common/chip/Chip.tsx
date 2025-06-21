import * as S from "./Chip.Style"
import React from "react"
import CloseIcon from "@/assets/icons/CloseIcon.svg?react"
import { color } from "@/styles/color"

export type ChipVariant =
  | "primary"
  | "indigo"
  | "teal"
  | "lightTeal"
  | "black"
  | "basic"

export type ChipStyle = "filled" | "disabled"
export type ChipSize = "sm" | "md"

export interface ChipProps {
  children?: React.ReactNode
  $variant?: ChipVariant
  $styleType: ChipStyle
  size: ChipSize
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  onClose?: () => void
}

/**
 * 
 * @param children - Chip 안에 들어갈 내용
 * @param variant - Chip의 색을 결정하는 속성
 * @param styleType - Chip의 스타일을 결정하는 속성
 * @param size - Chip의 크기를 결정하는 속성
 * @param icon - Chip에 들어갈 아이콘
 * @param onClose - Chip을 닫는 함수
 * @returns
 */
export const Chip = ({
  children,
  $variant,
  $styleType,
  size,
  icon,
  onClose,
}: ChipProps) => {
  const isDisabled = $styleType === "disabled"

  const iconColor =
    $styleType === "disabled"
      ? `${color.textTertiary}`
      : ["indigo", "lightTeal", "basic"].includes($variant)
        ? "black"
        : "white";

  const coloredIcon = icon ? React.cloneElement(icon, { fill: iconColor }) : null

  return (
    <S.ChipContainer $variant={$variant} $styleType={$styleType} disabled={isDisabled} size={size}>
      {coloredIcon && <span data-testid="icon">{coloredIcon}</span>}
      <S.ChipText>{children}</S.ChipText>
      {onClose && (
        <S.CloseButton
          onClick={isDisabled ? undefined : onClose}
          disabled={isDisabled}
          aria-label={`'${children}' 칩 닫기`}
        >
          <CloseIcon fill={iconColor} />
        </S.CloseButton>
      )}
    </S.ChipContainer>
  )
}
