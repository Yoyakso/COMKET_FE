import { useState } from 'react';
import * as S from './FindPasswordModal.Style';
import { COMKET2 } from '@/assets/icons';
import { TextInput } from '@/components/common/textInput/TextInput';
import { Button } from '@/components/common/button/Button';

interface Props {
  onBack: () => void;
  onNext: (email: string) => void;
}

export const FindPasswordModal = ({ onBack, onNext }: Props) => {
  const [email, setEmail] = useState('');

  return (
    <S.Modal>
      <S.LogoWrapper>
        <COMKET2 />
      </S.LogoWrapper>
      <S.Title>비밀번호 찾기</S.Title>
      <S.Description>비밀번호를 재설정할 이메일 주소를 입력해 주세요.</S.Description>

      <S.InputWrapper>
        <label htmlFor="email">이메일 주소</label>
        <TextInput
          type="default"
          size="md"
          $state="enable"
          placeholder="이메일 주소를 입력해 주세요."
          value={email}
          onChange={setEmail}
        />
      </S.InputWrapper>

      <S.ButtonRow>
        <Button $variant="neutralOutlined" size="md" onClick={onBack}>
          이전
        </Button>
        <Button $variant="tealFilled" size="md" disabled={!email} onClick={() => onNext(email)}>
          다음
        </Button>
      </S.ButtonRow>
    </S.Modal>
  );
};
