import React from "react"
import * as S from "./Badge.Style"
import DownArrowIcon from "@/assets/icons/DownArrowIcon.svg?react"

export type BadgeVariant =
  | "primary"
  | "teal"
  | "black"
  | "neutral"
  | "negative"
  | "warning"
  | "success"

export type BadgeStyleType = "filled" | "outlined"
export type BadgeSize = "lg" | "md"
export type BadgeShape = "sqaure" | "rounded"

export interface BadgeProps {
  $variant: BadgeVariant
  $styleType: BadgeStyleType
  size: BadgeSize
  shape: BadgeShape
  icon?: React.ReactElement
  children?: React.ReactNode
  className?: string
}

export const Badge = ({
  $variant,
  $styleType,
  size,
  shape,
  icon,
  children,
  className,
}: BadgeProps) => {

  const isOutlinedAllowed = $variant === "black" || $variant === "neutral"
  const resolvedStyleType = $styleType === "outlined" && !isOutlinedAllowed ? "filled" : $styleType

  // 아이콘 색상 동적 처리 (SVGR 사용 시 fill/currentColor 사용)
  const iconColor = resolvedStyleType === "outlined" ? "black" : "white"
  const finalIcon = icon ?? (size === "lg" ? <DownArrowIcon /> : null)
  const coloredIcon = finalIcon ? React.cloneElement(finalIcon, { fill: iconColor }) : null

  return (
    <S.BadgeContainer
      $variant={$variant}
      $styleType={$styleType}
      $size={size}
      $shape={shape}
      className={className}
    >
      {size === "lg" && coloredIcon && <S.IconWrapper>{coloredIcon}</S.IconWrapper>}
      {children}
    </S.BadgeContainer>
  )
}
