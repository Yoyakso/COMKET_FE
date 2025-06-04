import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './SignUpForm.Style';
import { COMKET2 } from '@/assets/icons';
import { CheckBox } from '../common/checkbox/CheckBox';
import { checkVerificationCode, registerUser, sendVerificationCode } from '@api/Oauth';
import { toast } from 'react-toastify';

export const SignUpForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(location.state?.email || '');
  // const isSocialUser = location.state?.provider === 'google';
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVerificationChecked, setIsVerificationChecked] = useState(false);
  const [agreements, setAgreements] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
    information: false,
  });
  const inviteCodeParam = new URLSearchParams(location.search).get('inviteCode') ?? '';

  const isValidPassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleAllAgreements = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAgreements({
      all: checked,
      service: checked,
      privacy: checked,
      marketing: checked,
      information: checked,
    });
  };

  const isFormValid =
    name.trim() !== '' &&
    email.trim() !== '' &&
    code.trim() !== '' &&
    isValidPassword(password) &&
    confirmPassword === password &&
    agreements.service &&
    agreements.privacy;

  const isPasswordMismatch =
    password !== '' && confirmPassword !== '' && password !== confirmPassword;

  const handleAgreementChange =
    (key: keyof typeof agreements) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      const updated = {
        ...agreements,
        [key]: checked,
      };
      updated.all = updated.service && updated.privacy && updated.marketing && updated.information;
      setAgreements(updated);
    };

  const handleSendVerification = async () => {
    if (!email) {
      toast.error('이메일을 입력해 주세요.');
      return;
    }

    try {
      const res = await sendVerificationCode(email);
      toast.info('인증번호가 발송되었습니다!');
      console.log('이메일 인증 응답:', res);
    } catch (err) {
      toast.error('인증번호 발송에 실패했습니다. 이메일 주소를 확인해주세요.');
    }
  };

  const handleCheckVerification = async () => {
    if (!code) {
      toast.error('인증번호를 입력해 주세요.');
    }

    try {
      await checkVerificationCode(email, String(code));
      toast.success('인증번호 검증에 성공했습니다.');
      setIsVerificationChecked(true);
    } catch (err) {
      toast.error('인증번호 검증에 실패했습니다. 인증번호를 확인해주세요.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      toast.error('비밀번호 형식이 올바르지 않습니다.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!agreements.service || !agreements.privacy) {
      toast.info('필수 약관에 동의해주세요.');
      return;
    }

    try {
      const res = await registerUser({
        email,
        password,
        real_name: name,
      });

      if (inviteCodeParam) {
        toast.success('회원가입이 완료되었습니다. 로그인 후 초대된 워크스페이스에 참가해 주세요!');
        navigate(`/signup/complete?inviteCode=${inviteCodeParam}`, { replace: true });
      } else {
        toast.success('회원가입이 완료되었습니다.');
        navigate('/signup/complete', { replace: true });
      }
      navigate('/signup/complete');
    } catch (err) {
      if (err.response) {
        console.error('회원가입 오류:', err.response);
        const status = err.response.data.code;
        if (status === "EMAIL_DUPLICATE") {
          toast.error('이미 가입된 이메일입니다.');
        }
      } else {
        toast.error('회원가입 요청에 실패했습니다. 네트워크 상태를 확인해주세요.');
      }
    }
  };

  return (
    <S.Container>
      <S.LogoWrapper>
        <COMKET2 />
      </S.LogoWrapper>

      <S.Title>이메일로 회원가입</S.Title>

      <S.Form onSubmit={handleSubmit}>
        <S.FormRow>
          <S.Label>이름</S.Label>
          <S.Input
            type="text"
            placeholder="이름을 입력해 주세요."
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </S.FormRow>

        <S.FormRow>
          <S.Label>이메일 주소</S.Label>
          <S.EmailRow>
            <S.EmailInput
              type="email"
              placeholder="이메일 주소를 입력해 주세요."
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <S.VerificationButton type="button" onClick={handleSendVerification}>
              인증번호 발송
            </S.VerificationButton>
          </S.EmailRow>
        </S.FormRow>

        <S.FormRow>
          <S.Label>인증번호</S.Label>
          <S.Input
            type="text"
            autoComplete="one-time-code"
            placeholder="인증번호를 입력해 주세요."
            value={code}
            onChange={e => {
              const onlyDigits = e.target.value.replace(/\D/g, '');
              setCode(onlyDigits);
            }}
          />
          <S.VerificationButton
            type="button"
            onClick={handleCheckVerification}
            disabled={isVerificationChecked}
          >
            인증번호 확인
          </S.VerificationButton>
        </S.FormRow>

        <S.FormGroup>
          <S.FormRow>
            <S.Label>비밀번호</S.Label>
            <S.Input
              type="password"
              autoComplete="new-password"
              placeholder="비밀번호를 입력해 주세요. (영문, 숫자 포함 8자 이상)"
              value={password}
              onChange={e => {
                const value = e.target.value;
                setPassword(value);
                if (value === '') {
                  setPasswordError('');
                } else if (!isValidPassword(value)) {
                  setPasswordError('비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.');
                } else {
                  setPasswordError('');
                }
              }}
            />
          </S.FormRow>
          <S.ErrorMessage $show={!!passwordError}>{passwordError}</S.ErrorMessage>
        </S.FormGroup>

        <S.FormGroup>
          <S.FormRow>
            <S.Label>비밀번호 확인</S.Label>
            <S.Input
              type="password"
              autoComplete="new-password"
              placeholder="비밀번호를 다시 한번 더 입력해 주세요."
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </S.FormRow>
          <S.ErrorMessage $show={isPasswordMismatch}>비밀번호가 일치하지 않습니다.</S.ErrorMessage>
        </S.FormGroup>

        <S.CheckboxContainer>
          <S.CheckboxRow>
            <CheckBox
              label="약관 전체 동의"
              $variant="primary"
              size="md"
              checked={agreements.all}
              onChange={handleAllAgreements}
            />
          </S.CheckboxRow>

          <S.TermRow>
            <CheckBox
              label="[필수] COMKET 서비스 이용 약관"
              $variant="primary"
              size="md"
              checked={agreements.service}
              onChange={handleAgreementChange('service')}
            />
            <S.TermLink href="#">약관 보기</S.TermLink>
          </S.TermRow>

          <S.TermRow>
            <CheckBox
              label="[필수] COMKET 개인 정보 처리 방침"
              $variant="primary"
              size="md"
              checked={agreements.privacy}
              onChange={handleAgreementChange('privacy')}
            />
            <S.TermLink href="#">약관 보기</S.TermLink>
          </S.TermRow>

          <S.TermRow>
            <CheckBox
              label="[선택] 개인 정보 수집 및 이용 동의"
              $variant="primary"
              size="md"
              checked={agreements.marketing}
              onChange={handleAgreementChange('marketing')}
            />
            <S.TermLink href="#">약관 보기</S.TermLink>
          </S.TermRow>

          <S.TermRow>
            <CheckBox
              label="[선택] 마케팅 정보 활용 및 광고성 정보 수신 동의"
              $variant="primary"
              size="md"
              checked={agreements.information}
              onChange={handleAgreementChange('information')}
            />
            <S.TermLink href="#">약관 보기</S.TermLink>
          </S.TermRow>
        </S.CheckboxContainer>

        <S.SignupButton type="submit" onClick={handleSubmit} disabled={!isFormValid}>
          회원가입
        </S.SignupButton>
      </S.Form>
    </S.Container>
  );
};
