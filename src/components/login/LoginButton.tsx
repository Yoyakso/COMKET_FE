import * as S from "./LoginButton.Style";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg?react";

export interface LoginButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  buttonStyle: ButtonStyle;
}

export type ButtonStyle =
  | "Google"

export const LoginButton = ({ onClick, children, buttonStyle }: LoginButtonProps) => {
  return (
    <S.ButtonContainer onClick={onClick}>
      <S.IconWrapper>
        {buttonStyle === "Google" && <GoogleIcon />}
      </S.IconWrapper>
      <S.ButtonText>{children}</S.ButtonText>
    </S.ButtonContainer>
  );
}