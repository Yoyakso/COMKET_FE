import * as S from "./OauthLoginButton.Style";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg?react";

export interface OauthLoginButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  buttonStyle: ButtonStyle;
}

export type ButtonStyle =
  | "Google"

export const OauthLoginButton = ({ onClick, children, buttonStyle }: OauthLoginButtonProps) => {

  const handleOauth = async () => {
    const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI
    const scope = encodeURIComponent("email profile openid");

    const googleLoginUrl =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=code` +
      `&scope=${scope}` +
      `&access_type=offline` +
      `&prompt=consent`
      ;
    window.location.href = googleLoginUrl;
  };

  return (
    <S.ButtonContainer onClick={handleOauth}>
      <S.IconWrapper>
        {buttonStyle === "Google" && <GoogleIcon />}
      </S.IconWrapper>
      <S.ButtonText>{children}</S.ButtonText>
    </S.ButtonContainer>
  );
}
