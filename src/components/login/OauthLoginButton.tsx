import * as S from './OauthLoginButton.Style';
import GoogleIcon from '@/assets/icons/GoogleIcon.svg?react';
import { useLocation } from 'react-router-dom';

export interface OauthLoginButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  buttonStyle: ButtonStyle;
}

export type ButtonStyle = 'Google';

export const OauthLoginButton = ({ onClick, children, buttonStyle }: OauthLoginButtonProps) => {
  const { search } = useLocation();
  const inviteCode = new URLSearchParams(search).get('inviteCode');
  const handleOauth = async () => {
    const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI;
    const scope = encodeURIComponent('email profile openid');

    const googleLoginUrl =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=code` +
      `&scope=${scope}` +
      `&access_type=offline` +
      `&prompt=consent` +
      (inviteCode ? `&state=${inviteCode}` : '');
    console.log('🔎 Google 로그인 URL:', googleLoginUrl);

    window.location.href = googleLoginUrl;
  };

  return (
    <S.ButtonContainer onClick={handleOauth}>
      <S.IconWrapper>{buttonStyle === 'Google' && <GoogleIcon />}</S.IconWrapper>
      <S.ButtonText>{children}</S.ButtonText>
    </S.ButtonContainer>
  );
};
