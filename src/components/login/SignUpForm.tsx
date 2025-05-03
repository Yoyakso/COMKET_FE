import { useState } from "react"
import * as S from "./SignUpForm.Style"
import { COMKET2 } from "@/assets/icons"
import { CheckBox } from "../common/checkbox/CheckBox"

export const SignUpForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreements, setAgreements] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
    information: false,
  })

  const handleAllAgreements = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setAgreements({
      all: checked,
      service: checked,
      privacy: checked,
      marketing: checked,
      information: checked,
    })
  }

  const handleAgreementChange = (key: keyof typeof agreements) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked

    // 개별 체크 반영
    const updated = {
      ...agreements,
      [key]: checked,
    }

    // 전체 동의 여부 다시 계산
    updated.all =
      updated.service && updated.privacy && updated.marketing && updated.information

    setAgreements(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

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
            onChange={(e) => setName(e.target.value)}
          />
        </S.FormRow>

        <S.FormRow>
          <S.Label>이메일 주소</S.Label>
          <S.EmailRow>
            <S.EmailInput
              type="email"
              placeholder="이메일 주소를 입력해 주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <S.VerificationButton type="button">인증번호 발송</S.VerificationButton>
          </S.EmailRow>
        </S.FormRow>

        <S.FormRow>
          <S.Label>인증번호</S.Label>
          <S.Input
            type="text"
            autoComplete="one-time-code"
            placeholder="인증번호를 입력해 주세요."
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </S.FormRow>

        <S.FormRow>
          <S.Label>비밀번호</S.Label>
          <S.Input
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 입력해 주세요. (영문, 숫자 포함 8자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </S.FormRow>

        <S.FormRow>
          <S.Label>비밀번호 확인</S.Label>
          <S.Input
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 다시 한번 더 입력해 주세요."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </S.FormRow>

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
              onChange={handleAgreementChange("service")}
            />
            <S.TermLink href="#">약관 보기</S.TermLink>
          </S.TermRow>

          <S.TermRow>
            <CheckBox
              label="[필수] COMKET 개인 정보 처리 방침"
              $variant="primary"
              size="md"
              checked={agreements.privacy}
              onChange={handleAgreementChange("privacy")}
            />
            <S.TermLink href="#">약관 보기</S.TermLink>
          </S.TermRow>

          <S.TermRow>
            <CheckBox
              label="[선택] 개인 정보 수집 및 이용 동의"
              $variant="primary"
              size="md"
              checked={agreements.marketing}
              onChange={handleAgreementChange("marketing")}
            />
            <S.TermLink href="#">약관 보기</S.TermLink>
          </S.TermRow>

          <S.TermRow>
            <CheckBox
              label="[선택] 마케팅 정보 활용 및 광고성 정보 수신 동의"
              $variant="primary"
              size="md"
              checked={agreements.information}
              onChange={handleAgreementChange("information")}
            />
            <S.TermLink href="#">약관 보기</S.TermLink>
          </S.TermRow>
        </S.CheckboxContainer>

        <S.SignupButton type="submit">회원가입</S.SignupButton>
      </S.Form>
    </S.Container>
  )
}
