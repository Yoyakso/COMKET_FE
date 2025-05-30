import { useState } from 'react';
import * as S from './FindPassword.Style';
import { COMKET2 } from '@/assets/icons';
import { TextInput } from '@/components/common/textInput/TextInput';
import { Button } from '@/components/common/button/Button';
import { useNavigate } from 'react-router-dom';

interface Props {
  onBack: () => void;
  onNext: (email: string) => void;
}

export const FindPassword = ({ onBack, onNext }: Props) => {
  const [email, setEmail] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (isInvalidEmail) setIsInvalidEmail(false);
  };

  // 임시 테스트로 ajou.ac.kr 도메인만 허용
  const handleNext = () => {
    const isRegistered = email.endsWith('@ajou.ac.kr');
    if (!isRegistered) {
      setIsInvalidEmail(true);
      return;
    }
    onNext(email);
    navigate('/findPassword/complete');
  };

  return (
    <S.Modal>
      <S.LogoWrapper>
        <COMKET2 />
        <S.Title>비밀번호 찾기</S.Title>
      </S.LogoWrapper>
      <S.Description>비밀번호를 재설정할 이메일 주소를 입력해 주세요.</S.Description>

      <S.InputWrapper>
        <S.Label>이메일 주소</S.Label>
        <div
          style={{ width: '100%' }}
          onKeyDown={e => {
            if (e.key === 'Enter') handleNext();
          }}
        >
          <TextInput
            type="default"
            size="md"
            $state={isInvalidEmail ? 'error' : 'enable'}
            placeholder="이메일 주소를 입력해 주세요."
            value={email}
            onChange={handleEmailChange}
            helperText={
              isInvalidEmail ? '등록되지 않은 이메일입니다. 이메일 주소를 다시 확인해 주세요.' : ''
            }
          />
        </div>
      </S.InputWrapper>

      <S.ButtonRow>
        <Button $variant="neutralOutlined" size="md" onClick={onBack} style={{ width: '322px' }}>
          이전
        </Button>
        <Button
          $variant="tealFilled"
          size="md"
          disabled={!email || isInvalidEmail}
          onClick={handleNext}
          style={{ width: '322px' }}
        >
          다음
        </Button>
      </S.ButtonRow>
    </S.Modal>
  );
};
