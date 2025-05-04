import { useState } from "react"
import * as S from "./LoginForm.Style"
import { OauthLoginButton } from "./OauthLoginButton"
import { TextInput } from "@/components/common/textInput/TextInput"
import { CheckBox } from "../common/checkbox/CheckBox"
import { COMKET2 } from "@/assets/icons"

export const LoginForm = () => {
  const [rememberEmail, setRememberEmail] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleCheckboxChange = () => {
    setRememberEmail(!rememberEmail)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("로그인 시도")
    console.log("이메일:", email)
    console.log("비밀번호:", password)
    console.log("이메일 기억하기:", rememberEmail)
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
            <TextInput type="default" size="md" state="enable" value={email} onChange={setEmail} placeholder="이메일" />
          </S.FormRow>

          <S.FormRow>
            <TextInput type="password" size="md" state="enable" value={password} onChange={setPassword} placeholder="비밀번호" />
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

