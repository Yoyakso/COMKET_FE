import { useState } from 'react';
import * as S from './workspaceCreatePage.Style';
import { Radio } from '@/components/common/radio/Radio';
import { Button } from '@/components/common/button/Button';

export const CreateWorkspacePage = () => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceURL, setWorkspaceURL] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');

  const usedAddresses = ['yoyakso', 'comket', 'team42'];
  const isNameValid = workspaceName.trim().length > 0;
  const isURLValid = /^[a-z0-9]+$/.test(workspaceURL);
  const isDuplicated = usedAddresses.includes(workspaceURL.toLowerCase());
  const isFormValid = isNameValid && isURLValid && !isDuplicated;

  return (
    <S.Container>
      <S.Title>워크스페이스 생성</S.Title>

      <S.FormSection>
        <S.InputGroup>
          <S.Label>워크스페이스 이름</S.Label>
          <S.CustomInput
            placeholder="워크스페이스 이름 입력"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>워크스페이스 주소</S.Label>
          <S.URLInputGroup>
            <S.CustomInputBox isError={isDuplicated}>
              <S.Prefix>https://comket.co.kr/</S.Prefix>
              <S.StyledInput
                placeholder="워크스페이스 주소 입력"
                value={workspaceURL}
                onChange={(e) => setWorkspaceURL(e.target.value)}
              />
            </S.CustomInputBox>

            {/* 에러 메시지: dot 없이 빨간색 */}
            {isDuplicated && (
              <S.HelperText isError>
                이미 사용 중인 주소입니다. 다른 주소를 입력해 주세요.
              </S.HelperText>
            )}

            {/* 항상 보이는 기본 안내문: dot 포함 + 회색 */}
            <S.HelperText isError={false}>
              · 영어 소문자와 숫자만 입력 가능 / 공백 및 특수문자 입력 불가
              {'\n'}· 생성된 워크스페이스 주소는 나중에 변경할 수 없으니 신중하게 입력해 주세요.
            </S.HelperText>
          </S.URLInputGroup>
        </S.InputGroup>

        <S.RadioGroup>
          <S.Label>공개 여부</S.Label>
          <S.RadioWrapper>
            <Radio
              label="공개"
              color="black"
              checked={visibility === 'public'}
              onChange={() => setVisibility('public')}
              disabled={false}
            />
            <Radio
              label="비공개"
              color="black"
              checked={visibility === 'private'}
              onChange={() => setVisibility('private')}
              disabled={false}
            />
          </S.RadioWrapper>
        </S.RadioGroup>
      </S.FormSection>

      <S.ButtonWrapper>
        <Button size="lg" variant="neutralOutlined">이전</Button>
        <Button size="lg" variant="tealFilled" disabled={!isFormValid}>생성</Button>
      </S.ButtonWrapper>
    </S.Container>
  );
};
