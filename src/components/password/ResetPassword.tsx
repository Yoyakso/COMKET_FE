import { useState } from 'react';
import * as S from './ResetPassword.Style';
import { COMKET2 } from '@/assets/icons';
import { TextInput } from '@/components/common/textInput/TextInput';
import { Button } from '@/components/common/button/Button';
import { resetPassword } from '@/api/Oauth';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [codeDigits, setCodeDigits] = useState<string[]>(Array(6).fill(''));
  const [codeError, setCodeError] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get('email');
  const isPasswordMismatch = password && confirmPassword && password !== confirmPassword;

  const isValidPassword = (password: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const isValidCode = codeDigits.join('').length === 6 && /^\d{6}$/.test(codeDigits.join(''));
  const isFormValid = isValidPassword(password) && password === confirmPassword && isValidCode;

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...codeDigits];
    newCode[index] = value;
    setCodeDigits(newCode);

    if (value && index < 5) {
      const next = document.getElementById(`code-${index + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      const prev = document.getElementById(`code-${index - 1}`);
      if (prev) (prev as HTMLInputElement).focus();
    }
  };

  const handleSubmit = async () => {
    const code = codeDigits.join('');

    if (!email || !code) {
      toast.error('잘못된 접근입니다.');
      navigate('/');
      return;
    }

    if (!isValidCode) {
      setCodeError(true);
      toast.error('올바른 인증 코드를 입력해 주세요.');
      return;
    }

    if (!isValidPassword(password)) {
      setPasswordError('비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await resetPassword({ email, code, newPassword: password });
      toast.success('비밀번호가 성공적으로 변경되었습니다.');
      navigate('/password-reset/complete');
    } catch (err) {
      toast.error('비밀번호 변경에 실패했습니다.인증 코드가 잘못되었거나 만료되었습니다.');
    }
  };

  return (
    <S.Modal>
      <S.LogoWrapper>
        <COMKET2 />
        <S.Title>비밀번호 재설정</S.Title>
      </S.LogoWrapper>

      {/* 인증 코드 입력 */}
      <S.InputWrapper>
        <S.Label>인증 코드</S.Label>

        <S.CodeInputWrapper>
          {codeDigits.map((digit, i) => (
            <S.CodeInput
              key={i}
              id={`code-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              $error={codeError}
              onChange={e => handleCodeChange(i, e.target.value.replace(/\D/g, ''))}
              onKeyDown={e => handleCodeKeyDown(i, e)}
            />
          ))}
        </S.CodeInputWrapper>
        <S.HelperText $error={codeError}>
          {codeError ? '잘못된 인증 코드입니다. 다시 확인해 주세요.' : ''}
        </S.HelperText>
      </S.InputWrapper>

      {/* 비밀번호 입력 */}
      <S.InputWrapper>
        <S.Label>새 비밀번호</S.Label>
        <TextInput
          type="password"
          size="md"
          value={password}
          onChange={setPassword}
          placeholder="새 비밀번호를 입력해 주세요. (영문, 숫자 포함 8자 이상)"
          $state={password && !isValidPassword(password) ? 'error' : 'enable'}
          helperText={
            password && !isValidPassword(password)
              ? '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.'
              : ''
          }
        />
      </S.InputWrapper>

      {/* 비밀번호 확인 입력 */}
      <S.InputWrapper>
        <S.Label>새 비밀번호 확인</S.Label>
        <TextInput
          type="password"
          size="md"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="새 비밀번호를 다시 한번 입력해 주세요."
          $state={isPasswordMismatch ? 'error' : 'enable'}
          helperText={isPasswordMismatch ? '비밀번호가 일치하지 않습니다.' : ''}
        />
      </S.InputWrapper>

      <Button
        $variant="tealFilled"
        size="md"
        onClick={handleSubmit}
        disabled={!isFormValid}
        style={{ width: '100%', marginTop: '40px' }}
      >
        변경
      </Button>
    </S.Modal>
  );
};
