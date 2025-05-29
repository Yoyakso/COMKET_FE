import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import * as S from './InviteCodePage.Style';
import { InviteCode } from '@components/common/textInput/InviteCode';
import { Button } from '@components/common/button/Button';
import { Dropdown, DropdownOption } from '@/components/common/dropdown/Dropdown';
import styled, { keyframes } from 'styled-components';
import SpinnerIcon from '@assets/icons/InviteCodeSpinner.svg?react';
import ValidIcon from '@/assets/icons/InviteCodeValid.svg?react';
import ErrorIcon from '@assets/icons/InviteCodeError.svg?react';
import { fetchWorkspaceByInviteCode } from '@/api/Workspace';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { toast } from 'react-toastify';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled(SpinnerIcon)`
  animation: ${rotate} 1s linear infinite;
  width: 20px;
  height: 20px;
`;

export const InviteCodePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const codeFromUrl = searchParams.get('code');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) {
      toast.info('초대된 워크스페이스에 참가하려면 먼저 회원가입을 완료해주세요!');
    }
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to={`/signup?inviteCode=${codeFromUrl}`} replace />;
  }

  const [code, setCode] = useState<string>('');
  const [workspace, setWorkspace] = useState<DropdownOption | null>(null);

  const [codeStatus, setCodeStatus] = useState<{
    isLoading: boolean;
    isSuccess: boolean;
    errorType: 'none' | 'invalid' | 'expired';
  }>({
    isLoading: false,
    isSuccess: false,
    errorType: 'none',
  });

  useEffect(() => {
    if (codeFromUrl) {
      setCode(codeFromUrl);
      handleComplete(codeFromUrl);
    }
  }, [codeFromUrl]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (newCode.length < 6) {
      setWorkspace(null);
      setCodeStatus({
        isLoading: false,
        isSuccess: false,
        errorType: 'none',
      });
    }
  };

  const handleComplete = async (enteredCode: string) => {
    setCode(enteredCode);
    setCodeStatus({
      isLoading: true,
      isSuccess: false,
      errorType: 'none',
    });

    try {
      const data = await fetchWorkspaceByInviteCode(enteredCode);

      const workspaceData: DropdownOption = {
        label: data.name,
        value: data.slug,
      };

      setWorkspace(workspaceData);
      setCodeStatus({
        isLoading: false,
        isSuccess: true,
        errorType: 'none',
      });
    } catch (error: any) {
      console.error('초대 코드 조회 실패:', error);
      setWorkspace(null);
      setCodeStatus({
        isLoading: false,
        isSuccess: false,
        errorType: 'invalid',
      });
    }
  };

  const handleJoin = async () => {
    try {
      const data = await fetchWorkspaceByInviteCode(code);
      useWorkspaceStore.getState().setWorkspaceStore({
        workspaceName: data.name,
        workspaceSlug: data.slug,
        workspaceId: data.id,
        profileFileUrl: data.profileFileUrl ?? '',
      });
      navigate(`/${data.slug}/project`);
    } catch (error) {
      toast.error('해당 초대코드의 워크스페이스를 조회할 수 없습니다다.');
      console.error('조회 실패:', error);
    }
    // const { email } = useUserStore.getState();
    // if (!email) {
    //   alert('이메일이 없습니다.');
    //   return;
    // }

    //   await inviteWorkspaceMembers(data.id, {
    //     memberEmailList: [email],
    //     positionType: 'MEMBER',
    //     state: 'ACTIVE',
    //   });
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     console.error('응답 상태:', error.response?.status);
    //     console.error('응답 메시지:', error.response?.data);
    //   }
    //   toast.error('입장 실패되었습니다.');
    //   console.error('입장 실패:', error);
    // }
  };
  return (
    <S.Container>
      <S.Header>
        <S.Title>초대코드로 입장</S.Title>
      </S.Header>

      <S.FormSection>
        <S.InviteCodeGroup>
          <S.Label>초대 코드</S.Label>
          <S.InviteCodeWrapper>
            <InviteCode
              value={code}
              onComplete={handleComplete}
              size="md"
              onStatusChange={status => setCodeStatus(status)}
              onChangeCode={handleCodeChange}
              errorType={codeStatus.errorType}
            />
            {(codeStatus.isLoading || codeStatus.isSuccess || codeStatus.errorType !== 'none') && (
              <S.IconWrapper>
                {codeStatus.isLoading && <Spinner />}
                {!codeStatus.isLoading && codeStatus.isSuccess && <ValidIcon />}
                {!codeStatus.isLoading && codeStatus.errorType !== 'none' && <ErrorIcon />}
              </S.IconWrapper>
            )}
          </S.InviteCodeWrapper>
        </S.InviteCodeGroup>
        <div></div>

        <S.DropdownGroup>
          <S.Label>워크스페이스</S.Label>
          <S.DropdownWrapper>
            <Dropdown
              size="sm"
              $variant={workspace ? 'activated-disabled' : 'disabled'}
              options={workspace ? [workspace] : []}
              type="single-image"
              value={workspace?.value}
              onChange={() => {}}
              placeholder=""
            />
          </S.DropdownWrapper>
        </S.DropdownGroup>
      </S.FormSection>

      <S.ButtonWrapper>
        <Button size="lg" $variant="neutralOutlined" onClick={() => navigate(-1)}>
          이전
        </Button>
        <Button
          $variant="tealFilled"
          size="lg"
          disabled={!code || !workspace}
          onClick={() => {
            if (workspace && workspace.value) {
              handleJoin();
            }
          }}
        >
          입장
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  );
};
