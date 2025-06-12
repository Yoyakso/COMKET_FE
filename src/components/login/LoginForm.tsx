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
import { requestFcmPermission } from '@/hooks/useFcm';
import { registerFcmToken } from '@/api/notification';

export const LoginForm = () => {
  const [rememberEmail, setRememberEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserState, clearUser, email: savedEmail } = useUserStore();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/workspace';
  const search = location.search;
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
    console.log('🔥 handleSubmit 시작됨');
    try {
      const data = await logIn({ email, password });
      console.log('로그인 응답:', data);
      toast.success('로그인 성공!');
      // localStorage.setItem('accessToken', data.accessToken);

      if (inviteCodeParam) {
        navigate(`/workspaces/invite?code=${inviteCodeParam}`, { replace: true });
      } else {
        navigate(from, { replace: true });
      }

      setTimeout(async () => {
        try {
          if (rememberEmail) {
            setUserState({
              email: data.email,
              name: data.name,
              memberId: data.memberId,
              loginPlatformInfo: data.loginPlatformInfo,
              profileFileUrl: data.profileFileUrl,
              workspaceMemberId: data.workspaceMemberId,
            });
          } else {
            clearUser();
          }
          const token = await requestFcmPermission();
          if (token) {
            await registerFcmToken(token);
            console.log('FCM 토큰 서버에 등록 완료');
          }
        } catch (err) {
          console.warn('FCM 등록 실패:', err);
        }
      }, 0);
    } catch (error) {
      console.log('redirecting to from page...', from);
      navigate(from, { replace: true });
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

          <S.LoginButton type="submit">로그인</S.LoginButton>

          <S.Divider>
            <S.DividerText>또는</S.DividerText>
          </S.Divider>

          <S.FormRow>
            <OauthLoginButton buttonStyle="Google" type="button">
              Google 계정으로 로그인
            </OauthLoginButton>
          </S.FormRow>
        </form>
      </S.FormWrapper>
    </S.Container>
  );
};
