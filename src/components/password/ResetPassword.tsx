import { useState } from 'react';
import * as S from './ResetPassword.Style';
import { COMKET2 } from '@/assets/icons';
import { TextInput } from '@/components/common/textInput/TextInput';
import { Button } from '@/components/common/button/Button';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // const token = searchParams.get('token');

  const isValidPassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const isPasswordMismatch = password && confirmPassword && password !== confirmPassword;
  const isFormValid = isValidPassword(password) && password === confirmPassword;

  const handleSubmit = async () => {
    // if (!token) {
    //   toast.error('잘못된 접근입니다.');
    //   return;
    // }
    if (!isValidPassword(password)) {
      setPasswordError('비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      toast.success('비밀번호가 성공적으로 변경되었습니다.');
      navigate('/resetpassword/complete');
    } catch (err) {
      toast.error('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <S.Modal>
      <S.LogoWrapper>
        <COMKET2 />
        <S.Title>비밀번호 재설정</S.Title>
      </S.LogoWrapper>

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
