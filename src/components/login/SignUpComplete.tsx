import * as S from "./SignUpComplete.Style"
import { COMKET2 } from "@/assets/icons"
import { useNavigate } from "react-router-dom"

export const SignUpComplete = () => {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate('/login');
  }

  const handleLoginButton = () => {
    navigate('/login')
  }

  return (
    <div>
      <S.Container>
        <S.Header>
          <COMKET2 />
          <S.Title>회원가입 완료</S.Title>
        </S.Header>

        <S.MessageContainer>
          <S.Message>계정 생성이 완료되었습니다.<br />
            로그인하여 워크스페이스를 생성하거나 기존 워크스페이스에 참여해 보세요.
          </S.Message>
        </S.MessageContainer>

        <S.ButtonContainer>
          <S.HomeButton onClick={handleHomeButton}>홈</S.HomeButton>
          <S.LoginButton onClick={handleLoginButton}> 로그인</S.LoginButton>
        </S.ButtonContainer>
      </S.Container>
    </div >
  )
}
