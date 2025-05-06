import { useState } from 'react';
import { TextInput } from '@/components/common/textInput/TextInput';
import { Radio } from '@/components/common/radio/Radio';
import { Button } from '@/components/common/button/Button';
import * as S from './CreateWorkspacePage.Style';

export const CreateWorkspacePage = () => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceURL, setWorkspaceURL] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');

  //중복처리 관련 임의 데이터
  const usedAddresses = ['yoyakso', 'comket', 'team42'];

  const isNameValid = workspaceName.trim().length > 0;
  const isURLValid = /^[a-z0-9]+$/.test(workspaceURL);
  const isDuplicated = usedAddresses.includes(workspaceURL.toLowerCase());
  const isFormValid = isNameValid && isURLValid && !isDuplicated;

  return (

      <S.Container>
        <S.Header>
          <S.Title>워크스페이스 생성</S.Title>
          <S.StepTextWrapper>
            <S.StepTextHighlight>1</S.StepTextHighlight>
            <S.StepText> / 2 단계</S.StepText>
          </S.StepTextWrapper>
        </S.Header>

        <S.FormSection>
          <S.InputGroup>
            <S.Label>워크스페이스 이름</S.Label>
            <S.InputWrapper>
              <TextInput
                placeholder="워크스페이스 이름을 입력해 주세요."
                value={workspaceName}
                onChange={(value: string) => setWorkspaceName(value)}
              />
            </S.InputWrapper>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>워크스페이스 주소</S.Label>
            <S.InputWrapper>
              <TextInput
                placeholder="워크스페이스 주소를 입력해 주세요."
                value={workspaceURL}
                onChange={(value: string) => setWorkspaceURL(value)}
                helperText={
                  isDuplicated
                    ? '이미 사용 중인 주소입니다. 다른 주소를 입력해 주세요.'
                    : '영어 소문자와 숫자만 입력 가능 / 공백 및 특수문자 입력 불가'
                }
                state={isDuplicated ? 'error' : undefined}
              />
            </S.InputWrapper>
            <S.DomainText>.comket.com</S.DomainText>
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
          <Button variant="tealFilled" size="lg" disabled={!isFormValid}>
            다음
          </Button>
        </S.ButtonWrapper>
      </S.Container>
  );
};
