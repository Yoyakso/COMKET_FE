import { useState } from 'react';
import * as S from './FindPasswordComplete.Style';
import { COMKET2 } from '@/assets/icons';
import { Button } from '@/components/common/button/Button';

export const FindPasswordComplete = () => {
  return (
    <S.Modal>
      <S.LogoWrapper>
        <COMKET2 />
        <S.Title>비밀번호 재설정 메일 발송</S.Title>
      </S.LogoWrapper>
      <S.Description>
        입력한 이메일 주소로 비밀번호 재설정 링크가 포함된 메일이 발송되었습니다.
        <br />
        메일을 확인하여, 비밀번호를 재설정해 주세요.
      </S.Description>

      <S.ButtonRow>
        <Button $variant="neutralOutlined" size="md" onClick={() => {}} style={{ width: '322px' }}>
          메일 재발송
        </Button>
        <Button $variant="tealFilled" size="md" onClick={() => {}} style={{ width: '322px' }}>
          확인
        </Button>
      </S.ButtonRow>
    </S.Modal>
  );
};
