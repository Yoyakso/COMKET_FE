import * as S from "./Footer.Style"

export type FooterType = "default" | "black"

export interface FooterProps {
  type: FooterType
}

export const Footer = ({ type }: FooterProps) => {
  return (
    <S.FooterContainer type={type}>
      <S.FooterText>Copyright © COMKET All Rights Reserved.</S.FooterText>
    </S.FooterContainer>
  )
}