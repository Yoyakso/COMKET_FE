import { ChevronDown, COMKET, InfoIcon, QuestionIcon } from '@assets/icons';
import { useNavigate } from 'react-router-dom';
import * as S from './GlobalNavBar.Style';
import { WorkspaceSelector } from './WorkspaceSelector';
import { NavProfile } from './NavProfile';
import { useUserStore } from '@/stores/userStore';

type GNBVariant = 'default' | 'white' | 'workspace';

interface GNBProps {
  variant?: GNBVariant;
}

export const GlobalNavBar = ({ variant = 'default' }: GNBProps) => {
  const navigate = useNavigate();
  const userName = useUserStore(s => s.name);
  const userProfile = useUserStore(s => s.profileFileUrl);

  const handleLoginButton = () => {
    navigate('/login');
  };

  const handleStartButton = () => {
    navigate('/signup');
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
          <S.NavLink href="#">서비스 소개</S.NavLink>
          <S.NavLink href="/plan">이용 요금</S.NavLink>
          <S.NavLink href="#">
            고객 지원
            <ChevronDown style={{ marginLeft: '8px' }} />
          </S.NavLink>
        </S.NavLinks>
      )}
      {variant === 'default' && (
        <S.AuthContainer>
          <S.LoginButton onClick={handleLoginButton}>로그인</S.LoginButton>
          <S.StartButton onClick={handleStartButton}>시작하기</S.StartButton>
        </S.AuthContainer>
      )}

      {variant === 'workspace' && (
        <S.NavProfileContainer onClick={() => navigate('/profile')}>
          <NavProfile name={userName} defaultImage={userProfile} />
        </S.NavProfileContainer>
      )}

      {variant !== 'default' && <></>}
    </S.NavbarContainer>
  );
};
