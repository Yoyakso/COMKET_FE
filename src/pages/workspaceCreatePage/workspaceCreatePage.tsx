import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './workspaceCreatePage.Style';
import { Radio } from '@/components/common/radio/Radio';
import { Button } from '@/components/common/button/Button';
import { workspaceCreate } from '@/api/CreateWorkspace';
import { toast } from 'react-toastify';

export const CreateWorkspacePage = () => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceURL, setWorkspaceURL] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');

  const [nameError, setNameError] = useState('');
  const [slugError, setSlugError] = useState('');

  const navigate = useNavigate();

  const isNameValid = workspaceName.trim().length >= 2;
  const isURLValid = /^[a-z0-9-]+$/.test(workspaceURL);
  const isFormValid = isNameValid && isURLValid;

  const handleCreateWorkspace = async () => {

    setNameError('');
    setSlugError('');

    try {
      const data = await workspaceCreate({
        name: workspaceName,
        slug: workspaceURL,
        is_public: visibility === 'public',
        description: `${workspaceName}의 워크스페이스입니다.`,
        profile_file_id: null,
      });

      localStorage.setItem('workspaceName', data.name);
      localStorage.setItem('workspaceSlug', data.slug);

      navigate(`/${data.slug}`);
    } catch (error: any) {
      const code = error.response?.data?.code;
      const message = error.response?.data?.message || '오류가 발생했습니다.';

      switch (code) {
        case 'WORKSPACE_NAME_DUPLICATE':
          setNameError('이미 사용 중인 워크스페이스 이름입니다.');
          break;
        case 'WORKSPACE_SLUG_DUPLICATE':
          setSlugError('이미 사용 중인 주소입니다.');
          break;
        case 'MEMBER_NOT_FOUND':
          toast.error('로그인 정보가 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('accessToken');
          navigate('/login');
          break;
        default:
          toast.error(message);
      }
    }
  };

  return (
    <S.Container>
      <S.Title>워크스페이스 생성</S.Title>

      <S.FormSection>
        {/* 워크스페이스 이름 */}
        <S.InputGroup>
          <S.Label>워크스페이스 이름</S.Label>
          <S.InputGroupWrapper>
            <S.InputBox $isError={!isNameValid && workspaceName.length > 0}>
              <S.CustomInput
                placeholder="워크스페이스 이름 입력"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
            </S.InputBox>
            {!isNameValid && workspaceName.length > 0 && (
              <S.HelperText $isError={true}>2글자 이상의 이름이어야 합니다.</S.HelperText>
            )}
            {nameError && <S.HelperText $isError={true}>{nameError}</S.HelperText>}
          </S.InputGroupWrapper>
        </S.InputGroup>

        {/* 워크스페이스 주소 */}
        <S.InputGroup>
          <S.Label>워크스페이스 주소</S.Label>
          <S.InputGroupWrapper>
            <S.InputBox $isError={!!slugError}>
              <S.Prefix>https://comket.co.kr/</S.Prefix>
              <S.CustomInput
                placeholder="워크스페이스 주소 입력"
                value={workspaceURL}
                onChange={(e) => setWorkspaceURL(e.target.value)}
              />
            </S.InputBox>
            {slugError && <S.HelperText $isError={true}>{slugError}</S.HelperText>}
            <S.HelperText $isError={false}>
              · 영어 소문자와 숫자만 입력 가능 / 공백 및 특수문자 입력 불가
              {'\n'}· 생성된 워크스페이스 주소는 나중에 변경할 수 없으니 신중하게 입력해 주세요.
            </S.HelperText>
          </S.InputGroupWrapper>
        </S.InputGroup>

        {/* 공개 여부 */}
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
        <Button size="lg" variant="neutralOutlined" onClick={() => navigate(-1)}>
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
