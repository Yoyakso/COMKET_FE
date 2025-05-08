import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './InviteCodePage.Style'

import { InviteCode } from '@components/common/textInput/InviteCode'
import { Button } from '@components/common/button/Button'
import { Dropdown, DropdownOption } from '@/components/common/dropdown/Dropdown'

import styled, { keyframes } from 'styled-components'
import SpinnerIcon from '@assets/icons/InviteCodeSpinner.svg?react'
import ValidIcon from '@/assets/icons/InviteCodeValid.svg?react'
import ErrorIcon from '@assets/icons/InviteCodeError.svg?react'

import { fetchWorkspaceByInviteCode } from '@/api/InviteCode';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Spinner = styled(SpinnerIcon)`
  animation: ${rotate} 1s linear infinite;
  width: 20px;
  height: 20px;
`

export const InviteCodePage = () => {
  const navigate = useNavigate()
  const [code, setCode] = useState<string>('')
  const [workspace, setWorkspace] = useState<DropdownOption | null>(null)

  const [codeStatus, setCodeStatus] = useState<{
    isLoading: boolean
    isSuccess: boolean
    errorType: 'none' | 'invalid' | 'expired'
  }>({
    isLoading: false,
    isSuccess: false,
    errorType: 'none',
  })

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    if (newCode.length < 6) {
      setWorkspace(null)
      setCodeStatus({
        isLoading: false,
        isSuccess: false,
        errorType: 'none',
      })
    }
  }

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
              onComplete={handleComplete}
              size="md"
              onStatusChange={(status) => setCodeStatus(status)}
              onChangeCode={handleCodeChange}
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

        <S.DropdownGroup>
          <S.Label>워크스페이스</S.Label>
          <S.DropdownWrapper>
            <Dropdown
              size="sm"
              variant={workspace ? 'activated-disabled' : 'disabled'}
              options={workspace ? [workspace] : []}
              type='single-image'
              value={workspace?.value}
              onChange={() => { }}
              placeholder=""
            />
          </S.DropdownWrapper>
        </S.DropdownGroup>
      </S.FormSection>

      <S.ButtonWrapper>
        <Button variant="blackOutlined" size="lg">
          이전
        </Button>
        <Button
          variant="tealFilled"
          size="lg"
          disabled={!code || !workspace}
          onClick={() => {
            if (workspace && workspace.value) {
              navigate(`/workspace/${workspace?.value}`)
            }
          }}>
          입장
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  )
}
