import { useNavigate } from 'react-router-dom';
import * as S from './ResetPasswordComplete.Style';
import { COMKET2 } from '@/assets/icons';
import { Button } from '@/components/common/button/Button';

export const ResetPasswordComplete = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <S.Modal>
      <S.LogoWrapper>
        <COMKET2 />
        <S.Title>비밀번호 재설정</S.Title>
      </S.LogoWrapper>
      <S.Description>
        비밀번호 변경이 완료되었습니다.
        <br />
        보안을 위해 새로운 비밀번호로 다시 로그인해 주세요.
      </S.Description>
      <Button
        $variant="tealFilled"
        size="md"
        onClick={handleGoToLogin}
        style={{ width: '100%', marginTop: '24px' }}
      >
        로그인 화면으로 이동
      </Button>
    </S.Modal>
  );
};
