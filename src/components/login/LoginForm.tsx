import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './LoginForm.Style';
import { OauthLoginButton } from './OauthLoginButton';
import { TextInput } from '@/components/common/textInput/TextInput';
import { CheckBox } from '../common/checkbox/CheckBox';
import { COMKET2 } from '@/assets/icons';
import { logIn } from '@api/Oauth';
import { toast } from 'react-toastify';
import { useUserStore } from '@/stores/userStore';

export const LoginForm = () => {
  const [rememberEmail, setRememberEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserState, clearUser, email: savedEmail } = useUserStore();
  const { search } = useLocation();
  const inviteCodeParam = new URLSearchParams(search).get('inviteCode');

  useEffect(() => {
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, [savedEmail]);

  const handleCheckboxChange = () => {
    setRememberEmail(!rememberEmail);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await logIn({ email, password });
      toast.success('로그인 성공!');
      localStorage.setItem('accessToken', data.accessToken);

      if (rememberEmail) {
        setUserState({
          email: data.email,
          name: data.name,
          memberId: data.memberId,
          loginPlatformInfo: data.loginPlatformInfo,
          profileFileUrl: data.profileFileUrl,
        });
      } else {
        clearUser();
      }

      if (inviteCodeParam) {
        navigate(`/workspaces/invite?code=${inviteCodeParam}`, { replace: true });
      } else {
        navigate('/workspace', { replace: true });
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      toast.error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  return (
    <S.Container>
      <S.Header>
        <COMKET2 />
        <S.Title>로그인</S.Title>
      </S.Header>

      <S.FormWrapper>
        <form onSubmit={handleSubmit}>
          <S.FormRow>
            <TextInput
              type="default"
              size="md"
              $state="enable"
              value={email}
              onChange={setEmail}
              placeholder="이메일"
            />
          </S.FormRow>

          <S.FormRow>
            <TextInput
              type="password"
              size="md"
              $state="enable"
              value={password}
              onChange={setPassword}
              placeholder="비밀번호"
            />
          </S.FormRow>

          <S.RememberSignupRow>
            <CheckBox
              label="이메일 기억하기"
              $variant="primary"
              visualState={rememberEmail ? 'checked' : 'unchecked'}
              onChange={handleCheckboxChange}
              size="md"
              interactionState="default"
              className="checkbox"
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <S.FindPasswordLink href="/findpassword">비밀번호 찾기</S.FindPasswordLink>
              <S.SignupLink
                href={inviteCodeParam ? `/signup?inviteCode=${inviteCodeParam}` : '/signup'}
              >
                회원가입
              </S.SignupLink>
            </div>
          </S.RememberSignupRow>

          <S.LoginButton type="submit" >로그인</S.LoginButton>

          <S.Divider>
            <S.DividerText>또는</S.DividerText>
          </S.Divider>

          <S.FormRow>
            <OauthLoginButton buttonStyle="Google" type="button">Google 계정으로 로그인</OauthLoginButton>
          </S.FormRow>
        </form>
      </S.FormWrapper>
    </S.Container>
  );
};
