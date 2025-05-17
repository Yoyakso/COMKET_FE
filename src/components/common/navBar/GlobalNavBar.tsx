import { ChevronDown, COMKET, InfoIcon, QuestionIcon } from "@assets/icons"
import { useNavigate } from "react-router-dom"
import * as S from "./GlobalNavBar.Style"
import { WorkspaceSelector } from "./WorkspaceSelector"
import { Search } from "@/components/common/search/Search"

type GNBVariant = "default" | "white" | "workspace"

interface GNBProps {
  variant?: GNBVariant
}

export const GlobalNavBar = ({ variant = 'default' }: GNBProps) => {
  const navigate = useNavigate();

  const handleLoginButton = () => {
    navigate('/login');
  }

  const handleStartButton = () => {
    navigate('/login')
  }

  return (
    <S.NavbarContainer>
      {variant !== "workspace" && (
        <S.LogoContainer>
          <COMKET />
          <S.LogoText>COMKET</S.LogoText>
        </S.LogoContainer>
      )}
      {variant === "workspace" && (
        <WorkspaceSelector />
      )}

      {variant === "default" && (
        <S.NavLinks>
          <S.NavLink href="#">서비스 소개</S.NavLink>
          <S.NavLink href="#">이용 요금</S.NavLink>
          <S.NavLink href="#">
            고객 지원
            <ChevronDown style={{ marginLeft: '8px' }} />
          </S.NavLink>
        </S.NavLinks>
      )}
      {variant === "default" && (
        <S.AuthContainer>
          <S.LoginButton onClick={handleLoginButton}>로그인</S.LoginButton>
          <S.StartButton onClick={handleStartButton}>시작하기</S.StartButton>
        </S.AuthContainer>
      )}

      {variant === "workspace" && (
        <S.SearchContainter>
          <Search $variant="filled" size="md" onSearch={(test) => console.log("검색키워드:", test)} ></Search>
        </S.SearchContainter>
      )}

      {variant !== "default" && (
        <S.IconContainer>
          <InfoIcon />
          <QuestionIcon />
        </S.IconContainer>
      )}

    </S.NavbarContainer>
  )
}
