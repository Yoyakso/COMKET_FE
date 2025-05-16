import type React from "react"
import * as S from "./Button.Style"
import PlusIcon from "@/assets/icons/PlusIcon.svg?react"

export type ButtonStyle =
  | "primaryFilled"
  | "primaryOutlined"
  | "tealFilled"
  | "tealOutlined"
  | "blackFilled"
  | "blackOutlined"
  | "neutralFilled"
  | "neutralOutlined"
  | "negativeFilled"
  | "negativeOutlined"

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  variant: ButtonStyle
  size: ButtonSize
  withIcon?: boolean
}

/**
 * 
 * @param children - 버튼 안에 들어갈 내용
 * @param variant - 버튼의 스타일을 결정하는 속성
 * @param size - 버튼의 크기를 결정하는 속성
 * @param withIcon - 버튼에 아이콘을 추가할지 여부
 * @param props - 나머지 버튼 속성들
 * @returns 
 */
export const Button = ({ children, variant, size, withIcon, ...props }: ButtonProps) => {
  return (
    <S.ButtonContainer $variant={variant} size={size} disabled={props.disabled} {...props}>
      {withIcon && <S.IconWrapper><PlusIcon /></S.IconWrapper>}
      {children}
      {withIcon && <S.IconWrapper><PlusIcon /></S.IconWrapper>}
    </S.ButtonContainer>
  )
}
