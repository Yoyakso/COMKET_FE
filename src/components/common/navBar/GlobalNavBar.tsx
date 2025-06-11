import { ChevronDown, COMKET, InfoIcon, QuestionIcon } from '@assets/icons';
import { useNavigate } from 'react-router-dom';
import * as S from './GlobalNavBar.Style';
import { WorkspaceSelector } from './WorkspaceSelector';
import { PrimaryButton } from '@/components/common/button/PrimaryButton';

type GNBVariant = 'default' | 'white' | 'workspace';

interface GNBProps {
  variant?: GNBVariant;
}

export const GlobalNavBar = ({ variant = 'default' }: GNBProps) => {
  const navigate = useNavigate();

  const handleLoginButton = () => {
    navigate('/login');
  };

  const handleStartButton = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/main');
  };

  return (
    <S.NavbarContainer>
      {variant !== 'workspace' && (
        <S.LogoContainer onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <COMKET />
          <S.LogoText>COMKET</S.LogoText>
        </S.LogoContainer>
      )}
      {variant === 'workspace' && <WorkspaceSelector />}

      {variant === 'default' && (
        <S.NavLinks>
          <S.NavLink href="main">서비스 소개</S.NavLink>
          <S.NavLink href="/plan">이용 요금</S.NavLink>
        </S.NavLinks>
      )}
      {variant === 'default' && (
        <S.AuthContainer>
          {/* <S.LoginButton onClick={handleLoginButton}>로그인</S.LoginButton> */}
          <PrimaryButton size="sm" onClick={handleStartButton}>
            시작하기
          </PrimaryButton>
        </S.AuthContainer>
      )}

      {variant === 'workspace' && <S.SearchContainter></S.SearchContainter>}

      {variant !== 'default' && (
        <S.IconContainer>
          <InfoIcon />
          <QuestionIcon />
        </S.IconContainer>
      )}
    </S.NavbarContainer>
  );
};
