import React, { useRef, useState, useEffect } from 'react'
import * as S from './InviteCode.Style'

export type InputState = 'enable' | 'activated' | 'error' | 'activated-disabled'
export type ErrorType = 'none' | 'invalid' | 'expired'

interface InviteCodeProps {
  onComplete?: (code: string) => void
  onStatusChange?: (status: {
    isLoading: boolean
    isSuccess: boolean
    errorType: ErrorType
  }) => void
  onChangeCode?: (code: string) => void
  disabled?: boolean
  validate?: (code: string) => 'valid' | ErrorType
  size?: 'sm' | 'md'
  errorType?: ErrorType
}

export const InviteCode = ({
  onComplete,
  onStatusChange,
  onChangeCode,
  disabled = false,
  validate,
  errorType: externalErrorType,
  size = 'md',
}: InviteCodeProps) => {
  const CODE_LENGTH = 6
  const [codes, setCodes] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const [errorType, setErrorType] = useState<ErrorType>('none')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (externalErrorType && externalErrorType !== 'none') {
      setErrorType(externalErrorType);
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [externalErrorType]);

  const errorMessage = {
    invalid: '잘못된 초대 코드입니다. 다시 확인 후 입력해 주세요.',
    expired: '만료된 초대 코드입니다. 다른 초대 코드를 입력해 주세요.',
  }[errorType]

  const getState = (code: string): InputState =>
    disabled
      ? 'activated-disabled'
      : errorType !== 'none'
        ? 'error'
        : 'enable'

  const emitStatus = (status: {
    isLoading: boolean
    isSuccess: boolean
    errorType: ErrorType
  }) => {
    onStatusChange?.(status)
  }

  const handleChange = async (index: number, value: string) => {
    if (disabled) return

    const updated = [...codes]
    updated[index] = value
    setCodes(updated)

    const joinedCode = updated.join('')
    onChangeCode?.(joinedCode)

    const nextInput = inputRefs.current[index + 1]
    if (value && nextInput) nextInput.focus()

    if (!updated.every((v) => v !== '')) {
      setErrorType('none')
      setIsSuccess(false)
      emitStatus({ isLoading: false, isSuccess: false, errorType: 'none' })
      return
    }

    setIsLoading(true)
    setErrorType('none')
    setIsSuccess(false)
    emitStatus({ isLoading: true, isSuccess: false, errorType: 'none' })

    const result = validate ? await Promise.resolve(validate(joinedCode)) : 'valid'

    setIsLoading(false)

    if (result === 'invalid' || result === 'expired') {
      setErrorType(result)
      setIsSuccess(false)
      emitStatus({ isLoading: false, isSuccess: false, errorType: result })
      return
    }

    setIsSuccess(true)
    setErrorType('none')
    emitStatus({ isLoading: false, isSuccess: true, errorType: 'none' })
    onComplete?.(joinedCode)
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (disabled) return
    const isBackspace = e.key === 'Backspace'
    const isPrev = index > 0 && !codes[index]
    if (isBackspace && isPrev) {
      inputRefs.current[index - 1]?.focus()
    }
  }
  console.log("🔥 errorType:", errorType)

  return (
    <S.Wrapper>
      <S.InputRowWithIcon>
        <S.InputRow>
          {codes.map((code, i) => (
            <S.InputBox
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code}
              onChange={(e) => handleChange(i, e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => handleKeyDown(i, e)}
              ref={(el) => {
                inputRefs.current[i] = el
              }}
              state={getState(code)}
              size={size}
              disabled={disabled}
              readOnly={disabled}
            />
          ))}
        </S.InputRow>
      </S.InputRowWithIcon>

      <S.HelperText $isError={errorType !== 'none'}>
        {errorType !== 'none'
          ? errorMessage
          : '이메일 또는 동료에게 받은 초대 코드를 입력해 주세요.'}
      </S.HelperText>
    </S.Wrapper>
  )
}
