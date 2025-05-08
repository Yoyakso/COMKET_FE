import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './workspaceCreatePage.Style';
import { Radio } from '@/components/common/radio/Radio';
import { Button } from '@/components/common/button/Button';
import { workspaceCreate } from '@/api/CreateWorkspace';

export const CreateWorkspacePage = () => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceURL, setWorkspaceURL] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const isNameValid = workspaceName.trim().length > 0;
  const isURLValid = /^[a-z0-9]+$/.test(workspaceURL);
  const isFormValid = isNameValid && isURLValid;

  const handleCreateWorkspace = async () => {
    setErrorMessage('');

    try {
      const data = await workspaceCreate({
        workspaceName: workspaceName,
        workspaceSlug: workspaceURL,
        is_public: visibility === 'public',
        description: `${workspaceName}의 워크스페이스입니다.`,
        profile_file_id: null,
      });

      const name = localStorage.setItem('workspaceName', data.name);
      const slug = localStorage.setItem('workspaceSlug', data.slug);
      navigate(`/workspace/${data.slug}`);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || '';

      if (
        message.includes('already exists') ||
        error.response?.status === 409
      ) {
        setErrorMessage('이미 사용 중인 이름 또는 주소입니다.');
      } else {
        setErrorMessage('워크스페이스 생성 중 오류가 발생했습니다.');
      }

      console.error('워크스페이스 생성 실패:', error);
    }
  };


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
            <S.CustomInputBox $isError={!!errorMessage}>
              <S.Prefix>https://comket.co.kr/</S.Prefix>
              <S.StyledInput
                placeholder="워크스페이스 주소 입력"
                value={workspaceURL}
                onChange={(e) => setWorkspaceURL(e.target.value)}
              />
            </S.CustomInputBox>

            {errorMessage && (
              <S.HelperText $isError>{errorMessage}</S.HelperText>
            )}
            <S.HelperText $isError={false}>
              · 영어 소문자와 숫자만 입력 가능 / 공백 및 특수문자 입력 불가
              {'\n'}· 생성된 워크스페이스 주소는 나중에 변경할 수 없으니 신중하게
              입력해 주세요.
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
        <Button size="lg" variant="neutralOutlined">
          이전
        </Button>
        <Button
          size="lg"
          variant="tealFilled"
          disabled={!isFormValid}
          onClick={handleCreateWorkspace}
        >
          생성
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  );
};
