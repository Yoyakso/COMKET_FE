import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./LoginForm.Style"
import { OauthLoginButton } from "./OauthLoginButton"
import { TextInput } from "@/components/common/textInput/TextInput"
import { CheckBox } from "../common/checkbox/CheckBox"
import { COMKET2 } from "@/assets/icons"
import { logIn } from "@api/Oauth"
import { toast } from "react-toastify"
import { useUserStore } from "@/stores/userStore";

export const LoginForm = () => {
  const [rememberEmail, setRememberEmail] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { setUserState } = useUserStore();

  const handleCheckboxChange = () => {
    setRememberEmail(!rememberEmail)
  }

  // 현재 구글 로그인 버튼을 누른 경우에도 logIn요청 감 수정 필요
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const data = await logIn({ email, password })
      console.log("로그인데이터", data);
      toast.success("로그인 성공!")
      localStorage.setItem("accessToken", data.accessToken)
      setUserState({
        email: data.email,
        name: data.name,
        memberId: data.memberId,
        loginPlatformInfo: data.loginPlatformInfo,
        profileFileUrl: "",
      });
      navigate('/workspace')

    } catch (error) {
      console.error("로그인 실패:", error)
      throw error
    }
  }

  return (
    <S.Container>
      <S.Header>
        <COMKET2 />
        <S.Title>로그인</S.Title>
      </S.Header>

      <S.FormWrapper>
        <form onSubmit={handleSubmit}>
          <S.FormRow>
            <TextInput type="default" size="md" $state="enable" value={email} onChange={setEmail} placeholder="이메일" />
          </S.FormRow>

          <S.FormRow>
            <TextInput type="password" size="md" $state="enable" value={password} onChange={setPassword} placeholder="비밀번호" />
          </S.FormRow>

          <S.RememberSignupRow>
            <CheckBox
              label="이메일 기억하기"
              $variant="primary"
              visualState={rememberEmail ? "checked" : "unchecked"}
              onChange={handleCheckboxChange}
              size="md"
              interactionState="default"
              className="checkbox"
            />
            <S.SignupLink href="/signup">회원가입</S.SignupLink>
          </S.RememberSignupRow>

          <S.LoginButton type="submit">로그인</S.LoginButton>

          <S.Divider>
            <S.DividerText>또는</S.DividerText>
          </S.Divider>

          <S.FormRow>
            <OauthLoginButton buttonStyle="Google">Google 계정으로 로그인</OauthLoginButton>
          </S.FormRow>
        </form>
      </S.FormWrapper>
    </S.Container>
  )
}

