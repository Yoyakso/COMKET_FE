import type React from "react"
import * as S from "./PrimaryButton.Style"

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  size: ButtonSize
}

/**
 * 
 * @param children - 버튼 안에 들어갈 내용
 * @param size - 버튼의 크기를 결정하는 속성
 * @param props - 나머지 버튼 속성들
 * @returns 
 */
export const PrimaryButton = ({ children, size, onClick }: ButtonProps) => {
  return (
    <S.ButtonContainer $size={size} onClick={onClick}>
      {children}
    </S.ButtonContainer>
  )
}
